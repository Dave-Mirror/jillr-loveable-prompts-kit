
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { joinChallenge } from '@/utils/challenge';
import { defaultCenter } from '@/utils/mapUtils';

export const useMapInteractions = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setInfoWindow(null);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const handleJoinChallenge = () => {
    if (selectedItem?.type === 'challenge') {
      joinChallenge(selectedItem.id, user, navigate);
    } else if (selectedItem?.type === 'drop') {
      toast({
        title: "Product Reserved!",
        description: `You've reserved ${selectedItem.title}. Pick it up within the next 24 hours!`,
      });
    } else if (selectedItem?.type === 'easteregg') {
      toast({
        title: "Easter Egg Found!",
        description: `You've unlocked ${selectedItem.reward}!`,
      });
    }
    setSelectedItem(null);
  };

  const handleMarkerClick = (item: any) => {
    setInfoWindow(item);
  };

  const handleInfoWindowClose = () => {
    setInfoWindow(null);
  };

  return {
    selectedItem,
    mapCenter,
    map,
    infoWindow,
    onMapLoad,
    onMapUnmount,
    handleItemClick,
    handleCloseDialog,
    handleJoinChallenge,
    handleMarkerClick,
    handleInfoWindowClose
  };
};
