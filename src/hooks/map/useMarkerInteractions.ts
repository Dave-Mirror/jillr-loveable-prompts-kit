
import { useState, useCallback } from 'react';
import { LiveMapMarker } from '@/types/livemap';

export function useMarkerInteractions() {
  const [selectedMarker, setSelectedMarker] = useState<LiveMapMarker | null>(null);
  const [infoWindow, setInfoWindow] = useState<{ 
    position: google.maps.LatLng, 
    title: string, 
    description: string, 
    id: string, 
    type: string,
    challengeId?: string  // Added the challengeId property as optional
  } | null>(null);

  const handleMarkerClick = useCallback((marker: LiveMapMarker) => {
    setSelectedMarker(marker);
    setInfoWindow({
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
      title: marker.title,
      description: marker.description,
      id: marker.id,
      type: marker.type,
      challengeId: marker.challengeId // Include the challengeId from marker
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setInfoWindow(null);
  }, []);

  return {
    selectedMarker,
    infoWindow,
    handleMarkerClick,
    handleInfoWindowClose
  };
}
