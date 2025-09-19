export interface ChallengeLocation {
  id: string;
  label: string;
  address: string;
  lat: number;
  lng: number;
  radius_m: number;
}

export interface LocationState {
  location_required: boolean;
  locations: ChallengeLocation[];
}

export const DEFAULT_LOCATION_STATE: LocationState = {
  location_required: false,
  locations: []
};

export const RADIUS_LIMITS = {
  min: 25,
  max: 10000,
  default: 250
};