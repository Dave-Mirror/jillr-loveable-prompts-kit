
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { Button } from '@/components/ui/button';
import { Gift, Package, Target, Users, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { joinChallenge } from '@/utils/challenge';
import { useAuth } from '@/hooks/useAuth';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// Map container style
const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

const defaultCenter = {
  lat: 52.520008, // Berlin coordinates as default
  lng: 13.404954
};

// Use Vite's environment variables instead of process.env
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_FALLBACK_API_KEY';

const LiveMapView = () => {
  const { mapData, activeMapElements, loadingMap } = useLiveMap();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY // Use variable instead of process.env
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

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

  const getIconForItemType = (type: string) => {
    switch (type) {
      case 'easteregg': return <Gift className="text-yellow-500" />;
      case 'drop': return <Package className="text-blue-500" />;
      case 'challenge': return <Target className="text-red-500" />;
      case 'teamevent': return <Users className="text-purple-500" />;
      default: return <Info />;
    }
  };

  // Convert map elements to actual coordinates
  const getMapMarkers = () => {
    return activeMapElements.map(item => ({
      ...item,
      position: {
        lat: defaultCenter.lat + (item.position.y - 50) / 500,
        lng: defaultCenter.lng + (item.position.x - 50) / 500
      }
    }));
  };

  // Get marker icon URL based on type
  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'easteregg': return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      case 'drop': return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      case 'challenge': return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
      case 'teamevent': return 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png';
      default: return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
    }
  };

  if (loadError) {
    return <div className="w-full h-[70vh] flex items-center justify-center">Error loading maps</div>;
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
              styles: [
                { 
                  featureType: "all", 
                  elementType: "labels.text.fill", 
                  stylers: [{ color: "#ffffff" }] 
                },
                {
                  featureType: "all",
                  elementType: "labels.text.stroke",
                  stylers: [{ visibility: "on" }, { color: "#3e606f" }, { weight: 2 }, { gamma: 0.84 }]
                },
                {
                  featureType: "all",
                  elementType: "labels.icon",
                  stylers: [{ visibility: "off" }]
                },
                {
                  featureType: "administrative",
                  elementType: "geometry.fill",
                  stylers: [{ color: "#111827" }]
                },
                {
                  featureType: "administrative",
                  elementType: "geometry.stroke",
                  stylers: [{ color: "#c9b2a6" }, { weight: 1.2 }]
                },
                {
                  featureType: "landscape",
                  elementType: "geometry",
                  stylers: [{ color: "#1f2937" }]
                },
                {
                  featureType: "poi",
                  elementType: "geometry",
                  stylers: [{ color: "#283548" }]
                },
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [{ color: "#2d3748" }, { lightness: -20 }]
                },
                {
                  featureType: "transit",
                  elementType: "geometry",
                  stylers: [{ color: "#406d80" }]
                },
                {
                  featureType: "water",
                  elementType: "geometry",
                  stylers: [{ color: "#0c4a6e" }]
                }
              ]
            }}
          >
            {getMapMarkers().map((item) => (
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
          
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button size="sm" variant="secondary" className="bg-yellow-500/20 text-yellow-400 border border-yellow-500">
              <Gift className="mr-1 h-4 w-4" /> Easter Eggs
            </Button>
            <Button size="sm" variant="secondary" className="bg-blue-500/20 text-blue-400 border border-blue-500">
              <Package className="mr-1 h-4 w-4" /> Product Drops
            </Button>
            <Button size="sm" variant="secondary" className="bg-red-500/20 text-red-400 border border-red-500">
              <Target className="mr-1 h-4 w-4" /> Challenges
            </Button>
            <Button size="sm" variant="secondary" className="bg-purple-500/20 text-purple-400 border border-purple-500">
              <Users className="mr-1 h-4 w-4" /> Team Events
            </Button>
          </div>
        </>
      )}

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedItem && getIconForItemType(selectedItem.type)}
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.description}
              
              {selectedItem?.expiresIn && (
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <p className="text-sm font-medium">Expires in: {selectedItem.expiresIn}</p>
                </div>
              )}
              
              {selectedItem?.reward && (
                <div className="mt-2 p-2 bg-amber-500/10 text-amber-400 rounded-md">
                  <p className="text-sm font-medium">Reward: {selectedItem.reward}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleJoinChallenge} className="neon-button">
              {selectedItem?.type === 'challenge' ? 'Join Challenge' : 
               selectedItem?.type === 'drop' ? 'Reserve Product' : 
               selectedItem?.type === 'easteregg' ? 'Claim Reward' : 'Participate'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveMapView;
