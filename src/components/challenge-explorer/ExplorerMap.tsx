
import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Camera, Shoe, Clock, Glasses, Egg } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChallengeCategory, BrandFilter, LocationFilter, TimeFilter, MapMode } from '@/pages/ChallengeExplorer';

// Map styling for dark cyberpunk theme
const mapStyles = [
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#ffffff"}]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#000000"}, {"lightness": 13}]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#000000"}]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#144b53"}, {"lightness": 14}, {"weight": 1.4}]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{"color": "#08304b"}]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#0c4152"}, {"lightness": 5}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#000000"}]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#0b434f"}, {"lightness": 25}]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#000000"}]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#0b3d51"}, {"lightness": 16}]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{"color": "#000000"}]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{"color": "#146474"}]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{"color": "#021019"}]
  }
];

// Leaderboard map style
const leaderboardMapStyles = [
  ...mapStyles,
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#9b87f5"}, {"weight": 0.3}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#0A1628"}]
  }
];

// Night mode map style
const nightMapStyles = [
  ...mapStyles,
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers": [{"saturation": -100}, {"lightness": -60}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#39FF14"}, {"weight": 0.3}]
  }
];

// Mock challenge data
const mockChallenges = [
  {
    id: 'c1',
    title: 'Street Style Photo Challenge',
    description: 'Capture your best street style look near Marienplatz',
    type: 'video',
    position: { lat: 48.137154, lng: 11.576124 },
    brand: 'Nike',
    xp: 500,
    coins: 200,
    expiresIn: '2 days'
  },
  {
    id: 'c2',
    title: '5K Morning Run',
    description: 'Complete a 5K run in the English Garden',
    type: 'fitness',
    position: { lat: 48.152580, lng: 11.586700 },
    brand: 'Adidas',
    xp: 750,
    coins: 300,
    expiresIn: '12 hours'
  },
  {
    id: 'c3',
    title: 'Coffee Art AR',
    description: 'Create AR art with your coffee at Cafe Glockenspiel',
    type: 'ar',
    position: { lat: 48.1366, lng: 11.5750 },
    brand: 'Starbucks',
    xp: 350,
    coins: 150,
    expiresIn: '3 days'
  },
  {
    id: 'c4',
    title: 'Hidden Easter Egg',
    description: 'Find the virtual treasure at Odeonsplatz',
    type: 'easter-egg',
    position: { lat: 48.1428, lng: 11.5775 },
    brand: 'Jillr',
    xp: 1000,
    coins: 500,
    expiresIn: '24 hours'
  },
  {
    id: 'c5',
    title: 'Time Trial Challenge',
    description: 'Complete the puzzle within 5 minutes',
    type: 'geofencing',
    position: { lat: 48.1300, lng: 11.5800 },
    brand: 'Under Armour',
    xp: 450,
    coins: 180,
    expiresIn: '5 hours'
  }
];

// Mock brand locations
const mockBrands = [
  {
    id: 'b1',
    name: 'Nike Store Munich',
    logo: '/assets/brands/nike-logo.png',
    position: { lat: 48.1385, lng: 11.5745 }
  },
  {
    id: 'b2',
    name: 'Adidas Flagship Store',
    logo: '/assets/brands/adidas-logo.png',
    position: { lat: 48.1355, lng: 11.5720 }
  },
  {
    id: 'b3',
    name: 'Starbucks Coffee',
    logo: '/assets/brands/starbucks-logo.png',
    position: { lat: 48.1366, lng: 11.5750 }
  }
];

// Mock users on map
const mockUsers = [
  {
    id: 'u1',
    name: 'JaneDoe',
    avatar: '/assets/avatars/user1.jpg',
    position: { lat: 48.1370, lng: 11.5730 },
    xp: 1200,
    level: 8
  },
  {
    id: 'u2',
    name: 'MaxPower',
    avatar: '/assets/avatars/user2.jpg',
    position: { lat: 48.1390, lng: 11.5780 },
    xp: 2500,
    level: 12
  }
];

interface ExplorerMapProps {
  mode: MapMode;
  categoryFilter: ChallengeCategory;
  brandFilter: BrandFilter;
  locationFilter: LocationFilter;
  timeFilter: TimeFilter;
  onMarkerClick: (challenge: any) => void;
}

const ExplorerMap: React.FC<ExplorerMapProps> = ({
  mode,
  categoryFilter,
  brandFilter,
  locationFilter,
  timeFilter,
  onMarkerClick
}) => {
  const { toast } = useToast();
  const [center, setCenter] = useState({ lat: 48.137154, lng: 11.576124 }); // Munich center
  const [zoom, setZoom] = useState(14);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [filteredChallenges, setFilteredChallenges] = useState(mockChallenges);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  // Apply filters to challenges
  useEffect(() => {
    let filtered = [...mockChallenges];
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(challenge => challenge.type === categoryFilter);
    }
    
    if (brandFilter !== 'all') {
      filtered = filtered.filter(challenge => challenge.brand === brandFilter);
    }
    
    // Just a mock implementation for time filter
    if (timeFilter === 'now') {
      filtered = filtered.filter(challenge => challenge.expiresIn.includes('hours'));
    } else if (timeFilter === 'today') {
      filtered = filtered.filter(challenge => 
        challenge.expiresIn.includes('hours') || challenge.expiresIn === '1 day'
      );
    }

    setFilteredChallenges(filtered);
  }, [categoryFilter, brandFilter, locationFilter, timeFilter]);

  // Get current location
  useEffect(() => {
    if (locationFilter === 'current') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setZoom(16);
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enable location services to use this feature",
            variant: "destructive"
          });
        }
      );
    } else if (locationFilter === 'city') {
      // Reset to Munich center
      setCenter({ lat: 48.137154, lng: 11.576124 });
      setZoom(14);
    } else if (locationFilter === 'global') {
      // Zoom out to show more area
      setCenter({ lat: 48.137154, lng: 11.576124 });
      setZoom(11);
    }
  }, [locationFilter, toast]);

  // Get marker icon based on challenge type
  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Camera className="text-jillr-neonPink" />;
      case 'fitness':
        return <Shoe className="text-jillr-neonGreen" />;
      case 'ar':
        return <Glasses className="text-jillr-neonBlue" />;
      case 'easter-egg':
        return <Egg className="text-jillr-neonPurple" />;
      case 'geofencing':
        return <Clock className="text-jillr-neonPink" />;
      default:
        return <MapPin className="text-jillr-neonPurple" />;
    }
  };

  // Get map style based on mode
  const getMapStyle = () => {
    switch (mode) {
      case 'night':
        return nightMapStyles;
      case 'leaderboard':
        return leaderboardMapStyles;
      case 'ar':
        return mapStyles; // Could be customized further for AR mode
      default:
        return mapStyles;
    }
  };

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-jillr-dark">
        <p className="text-white">Error loading map: {loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-jillr-dark">
        <div className="animate-spin h-10 w-10 border-4 border-jillr-neonPurple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName="h-full w-full"
      center={center}
      zoom={zoom}
      options={{
        styles: getMapStyle(),
        disableDefaultUI: true,
        clickableIcons: false
      }}
    >
      {/* Challenge markers */}
      {filteredChallenges.map(challenge => (
        <Marker
          key={challenge.id}
          position={challenge.position}
          onClick={() => {
            setSelectedMarker(challenge);
            onMarkerClick(challenge);
          }}
          icon={{
            url: `data:image/svg+xml,${encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="${
                  challenge.type === 'video' ? '#FF10F0' :
                  challenge.type === 'fitness' ? '#39FF14' :
                  challenge.type === 'ar' ? '#0AEFFF' :
                  challenge.type === 'easter-egg' ? '#9b87f5' :
                  '#FF10F0'
                }" fill-opacity="0.3" />
                <circle cx="20" cy="20" r="10" fill="${
                  challenge.type === 'video' ? '#FF10F0' :
                  challenge.type === 'fitness' ? '#39FF14' :
                  challenge.type === 'ar' ? '#0AEFFF' :
                  challenge.type === 'easter-egg' ? '#9b87f5' :
                  '#FF10F0'
                }" />
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
          }}
          animation={google.maps.Animation.BOUNCE}
        />
      ))}

      {/* Brand markers */}
      {brandFilter === 'all' && mockBrands.map(brand => (
        <Marker
          key={brand.id}
          position={brand.position}
          onClick={() => {
            toast({
              title: brand.name,
              description: "Click on a challenge to get started"
            });
          }}
          icon={{
            url: `data:image/svg+xml,${encodeURIComponent(`
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17.5" cy="17.5" r="16.5" fill="#1A1F2C" stroke="#9b87f5" stroke-width="2"/>
                <circle cx="17.5" cy="17.5" r="10.5" fill="#1A1F2C" stroke="#FFFFFF" stroke-width="1"/>
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(35, 35),
            anchor: new google.maps.Point(17.5, 17.5)
          }}
        />
      ))}

      {/* User markers */}
      {mode !== 'leaderboard' && mockUsers.map(user => (
        <Marker
          key={user.id}
          position={user.position}
          onClick={() => {
            toast({
              title: user.name,
              description: `Level ${user.level} • ${user.xp} XP`
            });
          }}
          icon={{
            url: `data:image/svg+xml,${encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#0A1628" stroke="#9b87f5" stroke-width="2" />
                <circle cx="20" cy="20" r="8" fill="#9b87f5" />
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default ExplorerMap;
