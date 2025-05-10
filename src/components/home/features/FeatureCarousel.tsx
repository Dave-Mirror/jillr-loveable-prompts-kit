
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import FeatureCard from './FeatureCard';
import { Feature } from './featureData';

interface FeatureCarouselProps {
  features: Feature[];
  onVideoPlay: (title: string, videoUrl: string) => void;
  onImageUpload: (index: number) => void;
  onVideoUpload: (index: number) => void;
}

const FeatureCarousel: React.FC<FeatureCarouselProps> = ({
  features,
  onVideoPlay,
  onImageUpload,
  onVideoUpload
}) => {
  return (
    <Carousel
      opts={{ 
        align: "start",
        loop: true
      }}
      className="w-full"
    >
      <CarouselContent className="py-4">
        {features.map((feature, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
            <FeatureCard 
              feature={feature}
              index={index}
              onVideoPlay={onVideoPlay}
              onImageUpload={onImageUpload}
              onVideoUpload={onVideoUpload}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex left-0" />
      <CarouselNext className="hidden md:flex right-0" />
    </Carousel>
  );
};

export default FeatureCarousel;
