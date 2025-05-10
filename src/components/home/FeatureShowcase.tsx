
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { VideoModal } from './VideoModal';
import { toast } from 'sonner';
import FeatureCarousel from './features/FeatureCarousel';
import { Feature, getInitialFeatures } from './features/featureData';
import { handleImageUpload, handleVideoUpload } from './features/mediaUtils';

const FeatureShowcase = () => {
  const navigate = useNavigate();
  const [activeVideoModal, setActiveVideoModal] = useState<{
    isOpen: boolean;
    title: string;
    videoUrl: string;
  }>({
    isOpen: false,
    title: '',
    videoUrl: '',
  });
  
  const [features, setFeatures] = useState<Feature[]>(getInitialFeatures(navigate));

  const openVideoModal = (title: string, videoUrl: string) => {
    if (!videoUrl) {
      toast.error("Kein Video für dieses Feature verfügbar");
      return;
    }
    setActiveVideoModal({
      isOpen: true,
      title,
      videoUrl
    });
  };

  const closeVideoModal = () => {
    setActiveVideoModal({
      ...activeVideoModal,
      isOpen: false
    });
  };

  const onImageUpload = (index: number) => {
    handleImageUpload(index, features, setFeatures);
  };

  const onVideoUpload = (index: number) => {
    handleVideoUpload(index, features, setFeatures);
  };
  
  return (
    <div className="py-12 px-4 bg-gradient-to-b from-jillr-dark to-jillr-darkBlue">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Entdecke Jillr</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tauche ein in die Welt von Jillr und entdecke, wie du durch kreative Challenges Belohnungen verdienen kannst.
          </p>
        </div>
        
        <FeatureCarousel 
          features={features}
          onVideoPlay={openVideoModal}
          onImageUpload={onImageUpload}
          onVideoUpload={onVideoUpload}
        />
        
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
      
      <VideoModal
        isOpen={activeVideoModal.isOpen}
        onClose={closeVideoModal}
        title={activeVideoModal.title}
        videoUrl={activeVideoModal.videoUrl}
      />
    </div>
  );
};

export default FeatureShowcase;
