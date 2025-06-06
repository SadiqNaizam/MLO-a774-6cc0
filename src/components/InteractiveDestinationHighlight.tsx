import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  callToAction: string;
  link: string;
}

interface InteractiveDestinationHighlightProps {
  destination: Destination;
  onInteraction?: (destinationId: string) => void; // Callback for interaction
}

const InteractiveDestinationHighlight: React.FC<InteractiveDestinationHighlightProps> = ({
  destination,
  onInteraction,
}) => {
  console.log("Rendering InteractiveDestinationHighlight for:", destination.name);

  const handleCTAClick = () => {
    if (onInteraction) {
      onInteraction(destination.id);
    }
    // Navigation would typically be handled by Link from react-router-dom if 'link' is an internal path
    // For external links, window.location.href = destination.link;
    console.log(`CTA clicked for ${destination.name}, navigating to ${destination.link}`);
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={destination.imageUrl || '/placeholder.svg'}
            alt={`Image of ${destination.name}`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <CardTitle className="text-2xl font-bold text-white">{destination.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{destination.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button onClick={handleCTAClick} className="w-full bg-sky-600 hover:bg-sky-700">
          {destination.callToAction}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InteractiveDestinationHighlight;