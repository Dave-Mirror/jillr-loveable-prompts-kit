
import { useState, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { LiveMapMarker, MapElement } from '@/types/livemap';

export function useMapInteractions() {
  const [selectedMarker, setSelectedMarker] = useState<LiveMapMarker | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MapElement | null>(null);
  const [infoWindow, setInfoWindow] = useState<{ position: google.maps.LatLng, title: string, description: string } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapCenter = { lat: 52.520008, lng: 13.404954 }; // Berlin center

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleMarkerClick = useCallback((marker: LiveMapMarker) => {
    setSelectedMarker(marker);
    setInfoWindow({
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
      title: marker.title,
      description: marker.description
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setInfoWindow(null);
  }, []);

  const handleItemClick = useCallback((item: MapElement) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
    if (infoWindow) {
      setInfoWindow(null);
    }
  }, [infoWindow]);

  const handleCloseDialog = useCallback(() => {
    setIsDetailsOpen(false);
    // Optional: Add a small delay before clearing the selected marker
    // so the closing animation can complete
    setTimeout(() => setSelectedItem(null), 300);
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

  const handleJoinChallenge = useCallback((challengeId: string) => {
    toast({
      title: "Challenge Joined",
      description: "You've successfully joined this challenge.",
    });
    handleCloseDialog();
  }, [handleCloseDialog]);

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
    selectedItem,
    mapCenter,
    infoWindow,
    onMapLoad,
    onMapUnmount,
    handleItemClick,
    handleCloseDialog,
    handleMarkerClick,
    handleInfoWindowClose,
    handleClaimReward,
    handleJoinEvent,
    handleTrackChallenge,
    handleScanQrCode,
    handleCollectEasterEgg,
    handleJoinChallenge,
  };
}
