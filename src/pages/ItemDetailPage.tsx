import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import ThemedImageGallery from '@/components/ThemedImageGallery';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // For potential review submission
import { AlertCircle, CheckCircle2, Plane, IndianRupee, Star, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample flight data - in a real app, this would be fetched based on itemId
const sampleFlightDetails = {
  id: 'fl001',
  airline: 'IndiGo',
  airlineLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Indigo_logo.svg/200px-Indigo_logo.svg.png',
  flightNumber: '6E 204',
  origin: { name: 'Indira Gandhi International Airport', code: 'DEL', city: 'New Delhi', terminal: 'T3' },
  destination: { name: 'Chhatrapati Shivaji Maharaj International Airport', code: 'BOM', city: 'Mumbai', terminal: 'T2' },
  departure: { time: '10:00 AM', date: '2024-09-15' },
  arrival: { time: '12:05 PM', date: '2024-09-15' },
  duration: '2h 5m',
  stops: 'Non-stop',
  price: 7500,
  currency: 'INR',
  aircraft: 'Airbus A320neo',
  amenities: ['In-flight Meal (Pre-book)', 'Web Check-in', 'Cabin Baggage: 7kg', 'Checked Baggage: 15kg'],
  fareRules: [
    { title: 'Cancellation Fee', description: '₹3,500 up to 2 hours before departure.' },
    { title: 'Reschedule Fee', description: '₹3,000 up to 2 hours before departure + fare difference.' },
  ],
  reviews: [
    { user: 'TravelerX', rating: 4, comment: 'Comfortable flight, on time. Food was decent.', date: '2024-08-01' },
    { user: 'FlyerGal', rating: 5, comment: 'Smooth check-in and journey. Crew was helpful!', date: '2024-07-22' },
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1569050173500-b9d914b34e65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWlybGluZSUyMGNhYmlufGVufDB8fDB8fHww&w=1000&q=80', alt: 'Airline Cabin Interior' },
    { src: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpcmxpbmUlMjBjcmV3fGVufDB8fDB8fHww&w=1000&q=80', alt: 'Airline Crew' },
    { src: 'https://images.unsplash.com/photo-1609020828989-986536901393?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmUlMjB3aW5kfGVufDB8fDB8fHww&w=1000&q=80', alt: 'View from Airplane Window' },
  ]
};

const ItemDetailPage = () => {
  const { itemId } = useParams(); // Get itemId from URL
  const navigate = useNavigate();
  console.log('ItemDetailPage loaded for item:', itemId);

  // Fetch item details based on itemId. Using sample data for now.
  const item = sampleFlightDetails; // Assuming itemId matches 'fl001' for this sample

  if (!item) {
    return (
        <>
            <NavigationMenu />
            <div className="container mx-auto px-4 py-12 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-semibold">Flight Not Found</h1>
                <p className="text-gray-600 mt-2">The flight details you are looking for could not be found.</p>
                <Button onClick={() => navigate('/search-results')} className="mt-6">Back to Search</Button>
            </div>
            <Footer />
        </>
    );
  }

  const handleBooking = () => {
    console.log('Proceeding to book flight:', item.id);
    navigate('/booking', { state: { itemDetails: item } }); // Pass item details to booking page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink onClick={() => navigate('/search-results')}>Search Results</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{item.airline} {item.flightNumber}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Image Gallery & Key Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="p-0">
                 <ThemedImageGallery images={item.gallery} aspectRatio={16/9} />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <CardTitle className="text-3xl font-bold text-sky-700">{item.airline} {item.flightNumber}</CardTitle>
                        <CardDescription className="text-lg">{item.origin.city} to {item.destination.city}</CardDescription>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-sky-800 flex items-center justify-end"><IndianRupee className="h-7 w-7 mr-1"/>{item.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Total Price</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center my-6 py-4 border-y">
                    <div>
                        <p className="text-xl font-semibold">{item.departure.time}</p>
                        <p className="text-sm text-gray-600">{item.origin.code} ({item.origin.city})</p>
                        <p className="text-xs text-gray-500">{item.departure.date}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Plane className="h-6 w-6 text-sky-600 mb-1" />
                        <p className="text-sm text-gray-600">{item.duration}</p>
                        <p className="text-xs text-sky-600 font-medium">{item.stops}</p>
                    </div>
                     <div>
                        <p className="text-xl font-semibold">{item.arrival.time}</p>
                        <p className="text-sm text-gray-600">{item.destination.code} ({item.destination.city})</p>
                        <p className="text-xs text-gray-500">{item.arrival.date}</p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">Flight Details</h3>
                <p className="text-gray-700 mb-1"><span className="font-medium">Aircraft:</span> {item.aircraft}</p>
                <p className="text-gray-700 mb-1"><span className="font-medium">Origin:</span> {item.origin.name} (Terminal {item.origin.terminal})</p>
                <p className="text-gray-700 mb-4"><span className="font-medium">Destination:</span> {item.destination.name} (Terminal {item.destination.terminal})</p>
                
              </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Amenities & Services</CardTitle></CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {item.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center"><CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />{amenity}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader><CardTitle>Fare Rules</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                    {item.fareRules.map((rule, index) => (
                        <AccordionItem value={`rule-${index}`} key={index}>
                        <AccordionTrigger>{rule.title}</AccordionTrigger>
                        <AccordionContent>{rule.description}</AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </CardContent>
            </Card>
          </div>

          {/* Right Column: Booking CTA & Reviews */}
          <div className="md:col-span-1 space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">Book Your Flight</CardTitle>
                <CardDescription>Confirm your selection and proceed to payment.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700 mb-4 flex items-center">
                    <IndianRupee className="h-7 w-7 mr-1"/>{item.price.toLocaleString()}
                </div>
                <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700" onClick={handleBooking}>
                  Select Flight & Continue
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Passenger Reviews ({item.reviews.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {item.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-2 text-sm font-semibold">{review.user}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                ))}
                {item.reviews.length === 0 && <p className="text-sm text-gray-500">No reviews yet for this flight.</p>}
                
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Leave a Review</h4>
                    <Textarea placeholder="Share your experience..." className="mb-2" />
                    <Button variant="outline">Submit Review</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetailPage;