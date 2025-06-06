import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import RichSearchResultCard, { FlightDetails } from '@/components/RichSearchResultCard'; // Import FlightDetails type
import TravelSearchModule, { FlightSearchFormData } from '@/components/TravelSearchModule'; // Assuming this type is exported

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SearchX } from 'lucide-react';


const sampleFlights: FlightDetails[] = [
  { id: 'fl001', airline: 'IndiGo', airlineLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Indigo_logo.svg/200px-Indigo_logo.svg.png', flightNumber: '6E 204', origin: { code: 'DEL', city: 'New Delhi', time: '10:00', date: '2024-09-15' }, destination: { code: 'BOM', city: 'Mumbai', time: '12:05', date: '2024-09-15' }, duration: '2h 5m', stops: 0, price: 7500, currency: 'INR', features: ['Meal Included', 'Web Check-in'] },
  { id: 'fl002', airline: 'Air India', airlineLogoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Air_India_Logo.svg/200px-Air_India_Logo.svg.png', flightNumber: 'AI 805', origin: { code: 'DEL', city: 'New Delhi', time: '14:30', date: '2024-09-15' }, destination: { code: 'BOM', city: 'Mumbai', time: '16:40', date: '2024-09-15' }, duration: '2h 10m', stops: 0, price: 8200, currency: 'INR', features: ['Free Seat Selection'] },
  { id: 'fl003', airline: 'Vistara', airlineLogoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Vistara_logo.svg/200px-Vistara_logo.svg.png', flightNumber: 'UK 995', origin: { code: 'DEL', city: 'New Delhi', time: '08:00', date: '2024-09-15' }, destination: { code: 'BOM', city: 'Mumbai', time: '11:15', date: '2024-09-15' }, duration: '3h 15m', stops: 1, price: 6800, currency: 'INR', features: ['Refundable', 'Extra Legroom'] },
];

const SearchResultsPage = () => {
  console.log('SearchResultsPage loaded');
  const navigate = useNavigate();
  const location = useLocation();
  // In a real app, searchParams would come from URL or state management
  // const searchParams = new URLSearchParams(location.search);
  // const origin = searchParams.get('origin') || 'New Delhi';
  // const destination = searchParams.get('destination') || 'Mumbai';

  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState<FlightDetails[]>(sampleFlights); // Initialize with sample data
  const itemsPerPage = 5;

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const currentResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleSearch = (data: FlightSearchFormData) => {
    console.log('Search refined/re-initiated from results page:', data);
    // Update results based on new search data - for now, just re-log
    // This might involve an API call
    // setResults(new_results_from_api);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSelectFlight = (flightId: string) => {
    console.log('Selected flight:', flightId);
    navigate(`/item-detail/${flightId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Search Results</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Optional: Display refined search module */}
        <section className="mb-8">
            <TravelSearchModule 
                onSearch={handleSearch} 
                defaultValues={{ 
                    /* Pre-fill with current search criteria from state or URL */
                    origin: "New Delhi", 
                    destination: "Mumbai", 
                    passengers: 1 
                }} 
            />
        </section>

        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar className="md:sticky md:top-20 md:self-start" />
          <main className="flex-1 space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Flights from {/*origin*/} to {/*destination*/} ({results.length} found)
                </h2>
                <Select defaultValue="price_asc">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                        <SelectItem value="duration_asc">Duration: Shortest</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {currentResults.length > 0 ? (
              currentResults.map(flight => (
                <RichSearchResultCard key={flight.id} flight={flight} onSelectFlight={handleSelectFlight} />
              ))
            ) : (
                 <Alert variant="default" className="bg-yellow-50 border-yellow-300">
                    <SearchX className="h-5 w-5 text-yellow-700" />
                    <AlertTitle className="text-yellow-800">No Flights Found</AlertTitle>
                    <AlertDescription className="text-yellow-700">
                        We couldn't find any flights matching your criteria. Please try modifying your search or filters.
                    </AlertDescription>
                </Alert>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} aria-disabled={currentPage === 1} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }} isActive={currentPage === i + 1}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {/* Add PaginationEllipsis if many pages */}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} aria-disabled={currentPage === totalPages} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;