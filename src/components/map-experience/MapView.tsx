
import React, { useState } from 'react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useMapInteractions } from '@/hooks/useMapInteractions';
import MapLoadError from '@/components/livemap/map/MapLoadError';
import ItemDetailsDialog from '@/components/livemap/map/ItemDetailsDialog';
import MapLegend from '@/components/livemap/map/MapLegend';
import { 
  containerStyle, 
  defaultCenter, 
  getMarkerIcon, 
  mapStyles, 
  getMapMarkers 
} from '@/utils/mapUtils';
import { Camera, Video, Users, Gift, Target, MapPin } from 'lucide-react';

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

type MapMode = 'all' | 'challenges' | 'eastereggs' | 'ugc' | 'cityclash';

interface MapViewProps {
  mode: MapMode;
  showUGCOverlay?: boolean;
  showCityClashOverlay?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ mode, showUGCOverlay = false, showCityClashOverlay = false }) => {
  const { activeMapElements, loadingMap } = useLiveMap();
  const [isApiKeyMissing, setIsApiKeyMissing] = useState(!GOOGLE_MAPS_API_KEY);
  
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

  // Filtern der Map-Elemente nach aktuellem Modus
  const getFilteredMapElements = () => {
    switch (mode) {
      case 'challenges':
        return activeMapElements.filter(element => element.type === 'challenge');
      case 'eastereggs':
        return activeMapElements.filter(element => element.type === 'easteregg');
      case 'ugc':
        // Foto & Video Challenges und Brand-Standorte
        return activeMapElements.filter(element => 
          element.type === 'challenge' || element.type === 'brand' || element.type === 'ugc'
        );
      case 'cityclash':
        return activeMapElements.filter(element => 
          element.type === 'teamevent' || element.challengeId?.startsWith('challenge-city-')
        );
      default:
        return activeMapElements;
    }
  };

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  if (loadError || isApiKeyMissing) {
    return <MapLoadError isApiKeyMissing={isApiKeyMissing} loadError={loadError} />;
  }

  return (
    <div className="w-full h-full relative">
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
              styles: mapStyles,
              // Anpassen des Map-Stils basierend auf dem Modus
              ...(mode === 'cityclash' ? { 
                styles: mapStyles.map(style => ({
                  ...style,
                  stylers: [...(style.stylers || []), { hue: '#9C4DF4' }]
                }))
              } : {})
            }}
          >
            {getMapMarkers(getFilteredMapElements(), defaultCenter).map((item) => (
              <Marker
                key={item.id}
                position={item.position}
                icon={{
                  url: getMarkerIcon(item.type),
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
                onClick={() => handleMarkerClick(item)}
                animation={
                  item.type === 'easteregg' ? 
                    google.maps.Animation.BOUNCE : 
                    mode === 'cityclash' && item.type === 'teamevent' ?
                      google.maps.Animation.DROP :
                      undefined
                }
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
                  
                  {/* Zusätzliche Informationen je nach Typ des Map-Elements */}
                  {infoWindow.type === 'easteregg' && (
                    <div className="flex items-center gap-1 mt-1 text-xs font-semibold">
                      <Gift className="h-4 w-4 text-yellow-400" />
                      <span>+25 XP</span>
                    </div>
                  )}
                  
                  {infoWindow.type === 'challenge' && (
                    <div className="flex items-center gap-1 mt-1 text-xs font-semibold">
                      <Target className="h-4 w-4 text-blue-400" />
                      <span>+100 XP</span>
                    </div>
                  )}
                  
                  {infoWindow.type === 'teamevent' && (
                    <div className="flex items-center gap-1 mt-1 text-xs font-semibold">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span>City Clash Event</span>
                    </div>
                  )}
                  
                  {/* Aktionsbuttons im InfoWindow */}
                  <div className="flex gap-2 mt-2">
                    <button 
                      className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs"
                      onClick={() => handleItemClick({
                        id: infoWindow.id,
                        type: infoWindow.type,
                        title: infoWindow.title,
                        description: infoWindow.description,
                        position: { x: 0, y: 0 },
                        challengeId: infoWindow.challengeId
                      })}
                    >
                      Details
                    </button>
                    
                    {infoWindow.type === 'easteregg' && (
                      <button 
                        className="px-2 py-1 bg-jillr-neonPurple text-white rounded text-xs"
                        onClick={() => handleCollectEasterEgg(infoWindow.id)}
                      >
                        Sammeln
                      </button>
                    )}
                    
                    {infoWindow.type === 'challenge' && (
                      <button 
                        className="px-2 py-1 bg-jillr-neonPurple text-white rounded text-xs"
                        onClick={() => handleJoinChallenge(infoWindow.challengeId)}
                      >
                        Teilnehmen
                      </button>
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}

            {/* Spezielles Overlay für City Clash wenn aktiv */}
            {showCityClashOverlay && (
              <>
                {/* Hier würden City-Clash-spezifische Overlays wie Gebietsmarkierung etc. gerendert */}
              </>
            )}
          </GoogleMap>
          
          <MapLegend mode={mode} />
        </>
      )}

      {/* Item-Details-Dialog */}
      <ItemDetailsDialog 
        selectedItem={selectedItem} 
        onClose={handleCloseDialog}
        onAction={selectedItem?.challengeId ? () => handleJoinChallenge(selectedItem.challengeId) : () => {}}
      />
    </div>
  );
};

export default MapView;
