import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import ThemedImageGallery from '@/components/ThemedImageGallery';
import TravelSearchModule from '@/components/TravelSearchModule';
import InteractiveDestinationHighlight from '@/components/InteractiveDestinationHighlight';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FlightSearchFormData } from '@/components/TravelSearchModule'; // Assuming this type is exported

const HomepageSearchHub = () => {
  console.log('HomepageSearchHub loaded');

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWF8ZW58MHx8MHx8fDA%3D&w=1000&q=80', alt: 'Taj Mahal', caption: 'Iconic Taj Mahal, Agra' },
    { src: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2VyYWxhfGVufDB8fDB8fHww&w=1000&q=80', alt: 'Kerala Backwaters', caption: 'Serene Kerala Backwaters' },
    { src: 'https://images.unsplash.com/photo-1591318303098-243159964786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFqYXN0aGFuJTIwcGFsYWNlfGVufDB8fDB8fHww&w=1000&q=80', alt: 'Rajasthan Palace', caption: 'Majestic Palaces of Rajasthan' },
  ];

  const featuredDestination = {
    id: 'dest1',
    name: 'Jaipur - The Pink City',
    imageUrl: 'https://images.unsplash.com/photo-1557690756-62754e26c92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFpcHVyJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    description: 'Explore the vibrant culture, historic forts, and bustling bazaars of Jaipur. A city that beautifully blends tradition with modernity.',
    callToAction: 'Discover Jaipur',
    link: '/item-detail/jaipur', // Example link
  };

  const handleSearch = (data: FlightSearchFormData) => { // Use the correct type from TravelSearchModule
    console.log('Search initiated from homepage:', data);
    // Navigate to search results page with query params
    // For now, just logging
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow">
        <section className="relative">
          <ThemedImageGallery images={galleryImages} theme="custom-indian" aspectRatio={21/9} autoplayDelay={5000} />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-lg">Discover Incredible India</h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl shadow-md">Your journey to luxury and adventure starts here. Explore breathtaking destinations with TravelCo.</p>
          </div>
        </section>

        <section className="py-12 md:py-16 -mt-16 md:-mt-24 relative z-10 px-4">
          <TravelSearchModule onSearch={handleSearch} />
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Destination</h2>
            <div className="max-w-2xl mx-auto">
              <InteractiveDestinationHighlight
                destination={featuredDestination}
                onInteraction={(id) => console.log('Interacted with destination:', id)}
              />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-sky-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready for an Adventure?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Browse our curated travel packages or search for your perfect getaway.
            </p>
            <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white">
              Explore All Destinations
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomepageSearchHub;