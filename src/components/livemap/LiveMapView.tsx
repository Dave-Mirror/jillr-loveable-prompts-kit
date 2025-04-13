
import React, { useState, useEffect } from 'react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useToast } from '@/hooks/use-toast';
import { useMapInteractions } from '@/hooks/useMapInteractions';
import MapLoadError from './MapLoadError';
import ItemDetailsDialog from './ItemDetailsDialog';
import MapLegend from './MapLegend';
import { 
  containerStyle, 
  defaultCenter, 
  getMarkerIcon, 
  mapStyles, 
  getMapMarkers 
} from '@/utils/mapUtils';

// Use Vite's environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const LiveMapView = () => {
  const { activeMapElements, loadingMap } = useLiveMap();
  const [isApiKeyMissing, setIsApiKeyMissing] = useState(!GOOGLE_MAPS_API_KEY);
  const { toast } = useToast();
  
  const {
    selectedItem,
    mapCenter,
    infoWindow,
    onMapLoad,
    onMapUnmount,
    handleItemClick,
    handleCloseDialog,
    handleJoinChallenge,
    handleMarkerClick,
    handleInfoWindowClose
  } = useMapInteractions();

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  // Show a toast if API key is missing
  useEffect(() => {
    if (isApiKeyMissing) {
      toast({
        title: "Google Maps API Key Missing",
        description: "Please add your Google Maps API key in the .env file",
        variant: "destructive",
      });
    }
  }, [isApiKeyMissing, toast]);

  if (loadError || isApiKeyMissing) {
    return <MapLoadError isApiKeyMissing={isApiKeyMissing} loadError={loadError} />;
  }

  return (
    <div className="w-full h-[70vh] relative rounded-lg glassmorphism overflow-hidden">
      {loadingMap || !isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={14}
            onLoad={onMapLoad}
            onUnmount={onMapUnmount}
            options={{
              styles: mapStyles
            }}
          >
            {getMapMarkers(activeMapElements, defaultCenter).map((item) => (
              <Marker
                key={item.id}
                position={item.position}
                icon={{
                  url: getMarkerIcon(item.type),
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
                onClick={() => handleMarkerClick(item)}
              />
            ))}

            {infoWindow && (
              <InfoWindow
                position={infoWindow.position}
                onCloseClick={handleInfoWindowClose}
              >
                <div className="p-2">
                  <h3 className="font-bold text-gray-900">{infoWindow.title}</h3>
                  <p className="text-sm text-gray-700">{infoWindow.description}</p>
                  <button 
                    className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                    onClick={() => handleItemClick(infoWindow)}
                  >
                    View Details
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
          
          <MapLegend />
        </>
      )}

      <ItemDetailsDialog 
        selectedItem={selectedItem} 
        onClose={handleCloseDialog}
        onAction={handleJoinChallenge}
      />
    </div>
  );
};

export default LiveMapView;
