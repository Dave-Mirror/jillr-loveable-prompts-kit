import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Plus, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { ChallengeLocation, LocationData, RADIUS_LIMITS } from '@/types/location';

interface LocationSectionProps {
  data: LocationData;
  onChange: (data: LocationData) => void;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBv7DcTYmXv8u_l6pI7oPq4BXzR5tF8nGk';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px'
};

const defaultCenter = {
  lat: 52.520008,
  lng: 13.404954 // Berlin
};

const LocationSection: React.FC<LocationSectionProps> = ({ data, onChange }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  useEffect(() => {
    if (isLoaded && !geocoder) {
      setGeocoder(new google.maps.Geocoder());
      setAutocompleteService(new google.maps.places.AutocompleteService());
    }
  }, [isLoaded, geocoder]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    if (!geocoder) return '';
    
    try {
      const response = await geocoder.geocode({ location: { lat, lng } });
      if (response.results[0]) {
        return response.results[0].formatted_address;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return '';
  };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const address = await reverseGeocode(lat, lng);
    
    const newLocation: ChallengeLocation = {
      id: `location-${Date.now()}`,
      name: `Location ${data.locations.length + 1}`,
      latitude: lat,
      longitude: lng,
      address,
      radius: RADIUS_LIMITS.default
    };

    if (data.allowMultipleLocations) {
      onChange({
        ...data,
        locations: [...data.locations, newLocation]
      });
    } else {
      onChange({
        ...data,
        locations: [newLocation]
      });
    }

    toast.success('Location added!');
  };

  const handleMarkerDragEnd = async (locationId: string, event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const address = await reverseGeocode(lat, lng);
    
    const updatedLocations = data.locations.map(loc => 
      loc.id === locationId 
        ? { ...loc, latitude: lat, longitude: lng, address }
        : loc
    );
    
    onChange({
      ...data,
      locations: updatedLocations
    });
  };

  const updateLocation = (locationId: string, updates: Partial<ChallengeLocation>) => {
    const updatedLocations = data.locations.map(loc =>
      loc.id === locationId ? { ...loc, ...updates } : loc
    );
    
    onChange({
      ...data,
      locations: updatedLocations
    });
  };

  const removeLocation = (locationId: string) => {
    const updatedLocations = data.locations.filter(loc => loc.id !== locationId);
    onChange({
      ...data,
      locations: updatedLocations
    });
    toast.success('Location removed');
  };

  const handleSearch = async (query: string) => {
    if (!autocompleteService || !query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await autocompleteService.getPlacePredictions({
        input: query,
        types: ['establishment', 'geocode']
      });
      setSuggestions(response.predictions || []);
    } catch (error) {
      console.error('Autocomplete error:', error);
      setSuggestions([]);
    }
  };

  const selectSuggestion = async (placeId: string, description: string) => {
    if (!geocoder) return;
    
    try {
      const response = await geocoder.geocode({ placeId });
      if (response.results[0]) {
        const location = response.results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        
        const newLocation: ChallengeLocation = {
          id: `location-${Date.now()}`,
          name: description.split(',')[0],
          latitude: lat,
          longitude: lng,
          address: description,
          radius: RADIUS_LIMITS.default
        };

        if (data.allowMultipleLocations) {
          onChange({
            ...data,
            locations: [...data.locations, newLocation]
          });
        } else {
          onChange({
            ...data,
            locations: [newLocation]
          });
        }

        if (map) {
          map.panTo({ lat, lng });
          map.setZoom(15);
        }

        setSearchValue('');
        setSuggestions([]);
        toast.success('Location added from search!');
      }
    } catch (error) {
      console.error('Place details error:', error);
    }
  };

  if (!isLoaded) {
    return <div className="text-center p-8">Loading map...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Location Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure location-based requirements for your challenge
          </p>
        </div>
        <Switch
          checked={data.enabled}
          onCheckedChange={(enabled) => onChange({ ...data, enabled })}
        />
      </div>

      {data.enabled && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="multiple-locations"
                  checked={data.allowMultipleLocations}
                  onCheckedChange={(allowMultipleLocations) => 
                    onChange({ ...data, allowMultipleLocations })
                  }
                />
                <Label htmlFor="multiple-locations">Allow Multiple Locations</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="location-required"
                  checked={data.required}
                  onCheckedChange={(required) => onChange({ ...data, required })}
                />
                <Label htmlFor="location-required">Location Required</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for a place..."
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        handleSearch(e.target.value);
                      }}
                      className="pl-10"
                    />
                    {suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion) => (
                          <button
                            key={suggestion.place_id}
                            className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                            onClick={() => selectSuggestion(suggestion.place_id!, suggestion.description)}
                          >
                            {suggestion.description}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={data.locations.length > 0 
                ? { lat: data.locations[0].latitude, lng: data.locations[0].longitude }
                : defaultCenter
              }
              zoom={data.locations.length > 0 ? 15 : 10}
              onLoad={onMapLoad}
              onUnmount={onMapUnmount}
              onClick={handleMapClick}
              options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
              }}
            >
              {data.locations.map((location) => (
                <React.Fragment key={location.id}>
                  <Marker
                    position={{ lat: location.latitude, lng: location.longitude }}
                    draggable
                    onDragEnd={(event) => handleMarkerDragEnd(location.id, event)}
                  />
                  <Circle
                    center={{ lat: location.latitude, lng: location.longitude }}
                    radius={location.radius}
                    options={{
                      fillColor: 'hsl(var(--primary))',
                      fillOpacity: 0.2,
                      strokeColor: 'hsl(var(--primary))',
                      strokeOpacity: 0.8,
                      strokeWeight: 2
                    }}
                  />
                </React.Fragment>
              ))}
            </GoogleMap>

            <div className="text-xs text-muted-foreground text-center">
              Click on the map to drop a pin, or use the search above
            </div>
          </div>

          {data.locations.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Locations ({data.locations.length})</h4>
              {data.locations.map((location) => (
                <Card key={location.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <Input
                          value={location.name}
                          onChange={(e) => updateLocation(location.id, { name: e.target.value })}
                          className="font-medium"
                          placeholder="Location name"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLocation(location.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Latitude (read-only)</Label>
                        <Input
                          value={location.latitude.toFixed(6)}
                          readOnly
                          className="text-xs bg-muted"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Longitude (read-only)</Label>
                        <Input
                          value={location.longitude.toFixed(6)}
                          readOnly
                          className="text-xs bg-muted"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Address</Label>
                      <Input
                        value={location.address}
                        onChange={(e) => updateLocation(location.id, { address: e.target.value })}
                        placeholder="Enter address"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label className="text-xs">Radius: {location.radius}m</Label>
                        <Input
                          type="number"
                          value={location.radius}
                          onChange={(e) => {
                            const value = Math.max(RADIUS_LIMITS.min, Math.min(RADIUS_LIMITS.max, parseInt(e.target.value) || RADIUS_LIMITS.default));
                            updateLocation(location.id, { radius: value });
                          }}
                          className="w-20 h-6 text-xs"
                          min={RADIUS_LIMITS.min}
                          max={RADIUS_LIMITS.max}
                        />
                      </div>
                      <Slider
                        value={[location.radius]}
                        onValueChange={([value]) => updateLocation(location.id, { radius: value })}
                        max={RADIUS_LIMITS.max}
                        min={RADIUS_LIMITS.min}
                        step={25}
                        className="w-full"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {data.enabled && (
            <div className="bg-muted/50 border border-muted rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <strong>Location Requirements:</strong> Participants must be within the highlighted area to complete location-based tasks. 
                  Location verification will be performed when users submit their content.
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSection;