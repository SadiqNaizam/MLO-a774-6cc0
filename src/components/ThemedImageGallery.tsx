import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card"; // Optional: to frame images

interface ImageItem {
  src: string;
  alt: string;
  caption?: string; // Optional caption for each image
}

interface ThemedImageGalleryProps {
  images: ImageItem[];
  theme?: 'light' | 'dark' | 'custom-indian'; // Example themes
  autoplayDelay?: number;
  aspectRatio?: number; // e.g. 16/9
}

const ThemedImageGallery: React.FC<ThemedImageGalleryProps> = ({
  images,
  theme = 'light',
  autoplayDelay = 4000,
  aspectRatio = 16 / 9,
}) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: autoplayDelay })]);

  console.log(`Rendering ThemedImageGallery with ${images.length} images. Theme: ${theme}`);

  if (!images || images.length === 0) {
    return <div className="text-center p-4">No images to display.</div>;
  }

  // Example of how theme could influence styling
  const themeClasses = {
    light: "bg-gray-100 border-gray-200",
    dark: "bg-gray-800 border-gray-700 text-white",
    'custom-indian': "bg-orange-50 border-orange-200", // Placeholder for custom theme
  };

  return (
    <div className={`themed-image-gallery p-2 rounded-lg ${themeClasses[theme] || themeClasses.light}`}>
      <div className="embla overflow-hidden rounded-md" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((image, index) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 relative" key={index}>
              <AspectRatio ratio={aspectRatio}>
                <img
                  src={image.src || '/placeholder.svg'}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                />
              </AspectRatio>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white text-center text-sm">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Optional: Add navigation dots or arrows here */}
    </div>
  );
};

export default ThemedImageGallery;