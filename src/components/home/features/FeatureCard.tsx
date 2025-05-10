
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Image, Video } from "lucide-react";
import { Feature, getIconComponent } from './featureData';

interface FeatureCardProps {
  feature: Feature;
  index: number;
  onVideoPlay: (title: string, videoUrl: string) => void;
  onImageUpload: (index: number) => void;
  onVideoUpload: (index: number) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  index,
  onVideoPlay,
  onImageUpload,
  onVideoUpload
}) => {
  return (
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
            
            {/* Media controls overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-2">
                {feature.videoUrl && (
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-black/50 hover:bg-black/70"
                    onClick={() => onVideoPlay(feature.title, feature.videoUrl)}
                  >
                    <Play className="h-5 w-5 text-white" />
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="bg-black/50 hover:bg-black/70"
                  onClick={() => onImageUpload(index)}
                >
                  <Image className="h-5 w-5 text-white" />
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="bg-black/50 hover:bg-black/70"
                  onClick={() => onVideoUpload(index)}
                >
                  <Video className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="mb-2 flex items-center gap-2">
              {getIconComponent(feature.iconType)}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </div>
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
  );
};

export default FeatureCard;
