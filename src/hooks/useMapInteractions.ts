
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { type LiveMapMarker } from '@/types/livemap';

export function useMapInteractions() {
  const [selectedMarker, setSelectedMarker] = useState<LiveMapMarker | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleMarkerClick = useCallback((marker: LiveMapMarker) => {
    setSelectedMarker(marker);
    setIsDetailsOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsDetailsOpen(false);
    // Optional: Add a small delay before clearing the selected marker
    // so the closing animation can complete
    setTimeout(() => setSelectedMarker(null), 300);
  }, []);

  const handleClaimReward = useCallback((markerId: string) => {
    toast({
      title: "Reward Claimed!",
      description: `You've successfully claimed the reward at location ${markerId}.`,
    });
    // Here you would typically call an API to mark this reward as claimed
  }, []);

  const handleJoinEvent = useCallback((eventId: string) => {
    toast({
      title: "Event Joined!",
      description: `You've successfully registered for the event.`,
    });
    // Here you would typically call an API to register for the event
  }, []);

  const handleTrackChallenge = useCallback((challengeId: string) => {
    toast({
      title: "Challenge Tracked",
      description: "This challenge has been added to your tracking list.",
    });
    // Here you would typically call an API to track the challenge
  }, []);

  const handleScanQrCode = useCallback(() => {
    toast({
      title: "Camera Access Required",
      description: "Please allow camera access to scan QR codes.",
    });
    // Implement QR code scanning logic here
  }, []);

  const handleCollectEasterEgg = useCallback((eggId: string) => {
    toast({
      title: "Easter Egg Found!",
      description: "You've discovered a hidden treasure!",
    });
    // Here you would typically call an API to mark this easter egg as found
  }, []);

  return {
    selectedMarker,
    isDetailsOpen,
    handleMarkerClick,
    handleCloseDetails,
    handleClaimReward,
    handleJoinEvent,
    handleTrackChallenge,
    handleScanQrCode,
    handleCollectEasterEgg,
  };
}
