
import React from 'react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
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
import { PartyPopper, Trophy, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Use Vite's environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const RewardIndicator = ({ type, amount }: { type: string, amount: number }) => {
  const getIcon = () => {
    switch(type) {
      case 'xp': return <Trophy className="h-4 w-4 text-yellow-400" />;
      case 'coins': return <PartyPopper className="h-4 w-4 text-blue-400" />;
      default: return <Gift className="h-4 w-4 text-purple-400" />;
    }
  };
  
  return (
    <div className="flex items-center gap-1 mt-1 text-xs font-semibold">
      {getIcon()}
      <span>+{amount} {type.toUpperCase()}</span>
    </div>
  );
};

const LiveMapView = () => {
  const { activeMapElements, loadingMap } = useLiveMap();
  const [isApiKeyMissing, setIsApiKeyMissing] = React.useState(!GOOGLE_MAPS_API_KEY);
  
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
    handleInfoWindowClose,
    handleCollectEasterEgg
  } = useMapInteractions();

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

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
                animation={item.type === 'easteregg' ? google.maps.Animation.BOUNCE : undefined}
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
                  
                  {infoWindow.type === 'easteregg' && (
                    <RewardIndicator type="xp" amount={25} />
                  )}
                  
                  {infoWindow.type === 'challenge' && (
                    <RewardIndicator type="xp" amount={100} />
                  )}
                  
                  {infoWindow.type === 'drop' && (
                    <RewardIndicator type="coins" amount={50} />
                  )}
                  
                  <div className="flex gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => handleItemClick({
                        id: infoWindow.id,
                        type: infoWindow.type,
                        title: infoWindow.title,
                        description: infoWindow.description,
                        challengeId: infoWindow.challengeId // Now this is properly typed
                      })}
                    >
                      View Details
                    </Button>
                    
                    {infoWindow.type === 'easteregg' && (
                      <Button 
                        variant="default" 
                        size="sm"
                        className="text-xs"
                        onClick={() => handleCollectEasterEgg(infoWindow.id)}
                      >
                        Collect
                      </Button>
                    )}
                  </div>
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
        onAction={selectedItem?.challengeId ? () => handleJoinChallenge(selectedItem.challengeId) : () => {}}
      />
    </div>
  );
};

export default LiveMapView;
