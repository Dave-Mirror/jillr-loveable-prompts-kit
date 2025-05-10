
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Star, Map, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const FeatureShowcase = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Kreative Challenges",
      description: "Nimm an spannenden Challenges teil und zeige deine Kreativität.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      videoUrl: "https://www.example.com/challenge-preview.mp4", // Beispiel-URL
      icon: <Play className="h-10 w-10 text-jillr-neonPurple" />,
      action: () => navigate('/explore')
    },
    {
      title: "Community Features",
      description: "Verbinde dich mit anderen kreativen Köpfen und teile deine Ideen.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      videoUrl: "https://www.example.com/community-preview.mp4", // Beispiel-URL
      icon: <Users className="h-10 w-10 text-jillr-neonPurple" />,
      action: () => navigate('/challenge-feed')
    },
    {
      title: "Easter Eggs entdecken",
      description: "Finde versteckte Überraschungen und sammle besondere Belohnungen.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      videoUrl: "https://www.example.com/easteregg-preview.mp4", // Beispiel-URL
      icon: <Star className="h-10 w-10 text-jillr-neonPurple" />,
      action: () => navigate('/livemap')
    },
    {
      title: "Lokale Aktivitäten",
      description: "Entdecke Challenges und Events in deiner Nähe.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      videoUrl: "https://www.example.com/location-preview.mp4", // Beispiel-URL
      icon: <Map className="h-10 w-10 text-jillr-neonPurple" />,
      action: () => navigate('/livemap')
    }
  ];
  
  return (
    <div className="py-12 px-4 bg-gradient-to-b from-jillr-dark to-jillr-darkBlue">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Entdecke Jillr</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tauche ein in die Welt von Jillr und entdecke, wie du durch kreative Challenges Belohnungen verdienen kannst.
          </p>
        </div>
        
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
                <div className="p-1">
                  <Card className="border-jillr-neonPurple/20 hover:border-jillr-neonPurple/50 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative group overflow-hidden rounded-t-xl">
                        {/* Image with play button overlay */}
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={feature.image} 
                            alt={feature.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {feature.icon}
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={feature.action}
                          className="w-full border-jillr-neonPurple/30 text-jillr-neonPurple hover:bg-jillr-neonPurple hover:text-white"
                        >
                          Mehr erfahren
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-0" />
          <CarouselNext className="hidden md:flex right-0" />
        </Carousel>
        
        <div className="mt-8 text-center">
          <Button
            className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/90"
            onClick={() => navigate('/auth')}
            size="lg"
          >
            Jetzt mit Jillr starten
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
