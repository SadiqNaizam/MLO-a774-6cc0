import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
// Example filter components (you'd import actual shadcn components like Checkbox, Slider, Select)
// For now, these are placeholders
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterOption {
  id: string;
  label: string;
}

interface SidebarProps {
  // Props to control filters, e.g., selectedAirlines, priceRange, onFilterChange
  // For this example, we'll use placeholder content.
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  console.log("Rendering Sidebar");

  const airlineOptions: FilterOption[] = [
    { id: 'airline1', label: 'IndiGo' },
    { id: 'airline2', label: 'Air India' },
    { id: 'airline3', label: 'SpiceJet' },
    { id: 'airline4', label: 'Vistara' },
  ];
  
  const stopOptions: FilterOption[] = [
    { id: '0', label: 'Non-stop' },
    { id: '1', label: '1 Stop' },
    { id: '2', label: '2+ Stops' },
  ];

  return (
    <aside className={`w-full md:w-72 lg:w-80 p-6 bg-white border-r border-gray-200 ${className}`}>
      <ScrollArea className="h-[calc(100vh-8rem)] pr-4"> {/* Adjust height based on surrounding layout */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Filter by Airline</h3>
            <div className="space-y-2">
              {airlineOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox id={`filter-${option.id}`} />
                  <Label htmlFor={`filter-${option.id}`} className="text-sm font-normal text-gray-600">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Price Range</h3>
            {/* Placeholder for price values */}
            <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>₹5,000</span>
                <span>₹50,000</span>
            </div>
            <Slider
              defaultValue={[15000]}
              max={50000}
              min={5000}
              step={1000}
              className="[&>span:first-child]:h-1 [&>span:first-child]:bg-sky-600 [&_[role=slider]]:bg-sky-700 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white"
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Stops</h3>
             <Select defaultValue="any">
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any number of stops" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="any">Any Stops</SelectItem>
                    {stopOptions.map(option => (
                        <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          
          {/* Add more filter sections as needed (e.g., departure time, trip duration) */}
           <Separator />
            <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Departure Time</h3>
            {/* Placeholder for time range slider or checkboxes */}
            <p className="text-sm text-gray-500">Morning, Afternoon, Evening</p>
          </div>

        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;