import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar'; // Shadcn Calendar
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Shadcn Select
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Shadcn Tabs
import { CalendarIcon, Users, Plane, Hotel, Car } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils'; // For conditional classes

// Zod schema for validation
const flightSearchSchema = z.object({
  origin: z.string().min(3, 'Origin must be at least 3 characters'),
  destination: z.string().min(3, 'Destination must be at least 3 characters'),
  departureDate: z.date({ required_error: 'Departure date is required.' }),
  returnDate: z.date().optional(),
  passengers: z.coerce.number().int().min(1, 'At least 1 passenger').max(9, 'Max 9 passengers'),
  searchType: z.enum(['flights', 'hotels', 'cars']).default('flights')
}).refine(data => !data.returnDate || data.returnDate >= data.departureDate, {
  message: "Return date cannot be before departure date",
  path: ["returnDate"],
});

type FlightSearchFormData = z.infer<typeof flightSearchSchema>;

interface TravelSearchModuleProps {
  onSearch: (data: FlightSearchFormData) => void;
  defaultValues?: Partial<FlightSearchFormData>;
}

const TravelSearchModule: React.FC<TravelSearchModuleProps> = ({ onSearch, defaultValues }) => {
  console.log("Rendering TravelSearchModule");
  const { control, handleSubmit, register, formState: { errors, isSubmitting }, watch, setValue } = useForm<FlightSearchFormData>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: defaultValues || { passengers: 1, searchType: 'flights' },
  });

  const searchType = watch('searchType');

  const onSubmit = (data: FlightSearchFormData) => {
    console.log("Travel Search Submitted:", data);
    onSearch(data);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-sky-100">
      <Tabs defaultValue={defaultValues?.searchType || "flights"} 
            onValueChange={(value) => setValue('searchType', value as 'flights' | 'hotels' | 'cars')}
            className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-sky-50 rounded-t-lg rounded-b-none p-1 h-auto">
          <TabsTrigger value="flights" className="py-3 data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            <Plane className="mr-2 h-5 w-5" /> Flights
          </TabsTrigger>
          <TabsTrigger value="hotels" className="py-3 data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            <Hotel className="mr-2 h-5 w-5" /> Hotels (UI Placeholder)
          </TabsTrigger>
          <TabsTrigger value="cars" className="py-3 data-[state=active]:bg-sky-600 data-[state=active]:text-white">
            <Car className="mr-2 h-5 w-5" /> Cars (UI Placeholder)
          </TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="p-6 space-y-6">
          <TabsContent value="flights" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="origin">Origin</Label>
                <Input id="origin" placeholder="e.g., New Delhi" {...register('origin')} />
                {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin.message}</p>}
              </div>
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="e.g., Mumbai" {...register('destination')} />
                {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="departureDate">Departure Date</Label>
                <Controller
                    name="departureDate"
                    control={control}
                    render={({ field }) => (
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Disable past dates
                            />
                        </PopoverContent>
                        </Popover>
                    )}
                />
                {errors.departureDate && <p className="text-red-500 text-xs mt-1">{errors.departureDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="returnDate">Return Date (Optional)</Label>
                 <Controller
                    name="returnDate"
                    control={control}
                    render={({ field }) => (
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < (watch('departureDate') || new Date(new Date().setHours(0,0,0,0)))}
                            />
                        </PopoverContent>
                        </Popover>
                    )}
                />
                {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate.message}</p>}
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="passengers">Passengers</Label>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-gray-500" />
                <Controller
                    name="passengers"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={String(field.value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select passengers" />
                            </SelectTrigger>
                            <SelectContent>
                                {[...Array(9)].map((_, i) => (
                                <SelectItem key={i + 1} value={String(i + 1)}>{i + 1} Adult{i > 0 ? 's' : ''}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
              </div>
              {errors.passengers && <p className="text-red-500 text-xs mt-1">{errors.passengers.message}</p>}
            </div>
          </TabsContent>

          <TabsContent value="hotels" className="mt-0 text-center p-8 text-gray-500">
            <Hotel className="mx-auto h-12 w-12 mb-4 text-gray-400" />
            Hotel Search Interface Coming Soon!
          </TabsContent>
          <TabsContent value="cars" className="mt-0 text-center p-8 text-gray-500">
            <Car className="mx-auto h-12 w-12 mb-4 text-gray-400" />
            Car Rental Search Interface Coming Soon!
          </TabsContent>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6 rounded-b-lg">
             <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-lg py-3" disabled={isSubmitting}>
              {isSubmitting ? 'Searching...' : `Search ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`}
            </Button>
          </CardFooter>
        </form>
      </Tabs>
    </Card>
  );
};
// Temporary Card import until TravelSearchModule is wrapped in actual page
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default TravelSearchModule;