export interface ChallengeLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  radius: number; // in meters
}

export interface LocationData {
  enabled: boolean;
  allowMultipleLocations: boolean;
  locations: ChallengeLocation[];
  required: boolean;
}

export const DEFAULT_LOCATION_DATA: LocationData = {
  enabled: false,
  allowMultipleLocations: false,
  locations: [],
  required: false
};

export const RADIUS_LIMITS = {
  min: 25,
  max: 10000,
  default: 250
};