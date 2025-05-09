
import { useState, useCallback, useRef } from 'react';

export function useMapBase() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 52.520008, lng: 13.404954 }); // Berlin center

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const panToLocation = useCallback((location: { lat: number, lng: number }) => {
    if (mapRef.current) {
      mapRef.current.panTo(location);
    }
  }, []);

  return {
    mapRef,
    mapCenter,
    setMapCenter,
    onMapLoad,
    onMapUnmount,
    panToLocation
  };
}
