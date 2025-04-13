
// Map container style
export const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

export const defaultCenter = {
  lat: 52.520008, // Berlin coordinates as default
  lng: 13.404954
};

// Get marker icon URL based on type
export const getMarkerIcon = (type: string) => {
  switch (type) {
    case 'easteregg': return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    case 'drop': return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    case 'challenge': return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
    case 'teamevent': return 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png';
    default: return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
  }
};

// Map styling
export const mapStyles = [
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
];

// Convert map elements to actual coordinates
export const getMapMarkers = (elements: any[], defaultCenter: { lat: number; lng: number }) => {
  return elements.map(item => ({
    ...item,
    position: {
      lat: defaultCenter.lat + (item.position.y - 50) / 500,
      lng: defaultCenter.lng + (item.position.x - 50) / 500
    }
  }));
};
