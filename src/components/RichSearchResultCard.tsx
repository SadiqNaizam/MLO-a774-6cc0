import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, PlaneTakeoff, PlaneLanding, Users, IndianRupee } from 'lucide-react'; // Example icons

export interface FlightDetails {
  id: string;
  airline: string;
  airlineLogoUrl?: string;
  flightNumber: string;
  origin: { code: string; city: string; time: string; date: string };
  destination: { code: string; city: string; time: string; date: string };
  duration: string;
  stops: number;
  price: number;
  currency?: string; // e.g., "INR"
  features?: string[]; // e.g., "Refundable", "Meal Included"
}

interface RichSearchResultCardProps {
  flight: FlightDetails;
  onSelectFlight: (flightId: string) => void;
}

const RichSearchResultCard: React.FC<RichSearchResultCardProps> = ({ flight, onSelectFlight }) => {
  console.log("Rendering RichSearchResultCard for flight:", flight.flightNumber);
  const currencySymbol = flight.currency === "INR" ? <IndianRupee className="inline h-5 w-5" /> : '$';

  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <CardContent className="p-0 md:p-0"> {/* Adjusted padding for better layout control */}
        <div className="md:flex">
            {/* Airline Info & Price (Left/Top on mobile) */}
            <div className="md:w-1/3 lg:w-1/4 bg-sky-50 p-4 flex flex-col justify-between items-center md:items-start text-center md:text-left">
                <div>
                    {flight.airlineLogoUrl ? (
                        <img src={flight.airlineLogoUrl} alt={`${flight.airline} logo`} className="h-10 mb-2 mx-auto md:mx-0" />
                    ) : (
                        <h3 className="text-lg font-semibold text-sky-700 mb-1">{flight.airline}</h3>
                    )}
                    <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                </div>
                 <div className="mt-4 md:mt-0">
                    <p className="text-2xl font-bold text-sky-800 flex items-center justify-center md:justify-start">
                        {currencySymbol}{flight.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">per adult</p>
                </div>
            </div>

            {/* Flight Details (Center/Right on mobile) */}
            <div className="flex-1 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center">
                        <PlaneTakeoff className="h-5 w-5 text-sky-600 mr-2" />
                        <div>
                            <p className="text-xl font-semibold">{flight.origin.time}</p>
                            <p className="text-sm text-gray-600">{flight.origin.code} - {flight.origin.city}</p>
                            <p className="text-xs text-gray-500">{flight.origin.date}</p>
                        </div>
                    </div>
                    <div className="text-center my-2 sm:my-0">
                        <Clock className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">{flight.duration}</p>
                        <p className="text-xs text-sky-600 font-medium">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}</p>
                    </div>
                    <div className="flex items-center text-right sm:text-left">
                        <PlaneLanding className="h-5 w-5 text-sky-600 mr-2 sm:ml-2 sm:order-last" />
                        <div>
                            <p className="text-xl font-semibold">{flight.destination.time}</p>
                            <p className="text-sm text-gray-600">{flight.destination.code} - {flight.destination.city}</p>
                            <p className="text-xs text-gray-500">{flight.destination.date}</p>
                        </div>
                    </div>
                </div>

                {flight.features && flight.features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 mt-2">
                    {flight.features.map(feature => (
                    <Badge key={feature} variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">{feature}</Badge>
                    ))}
                </div>
                )}
            </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 flex justify-end">
        <Button onClick={() => onSelectFlight(flight.id)} size="lg" className="bg-sky-600 hover:bg-sky-700">
          Select Flight <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RichSearchResultCard;