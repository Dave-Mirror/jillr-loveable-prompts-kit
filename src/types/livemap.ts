
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapElement {
  id: string;
  type: 'easteregg' | 'drop' | 'challenge' | 'teamevent' | 'brand' | 'ugc' | 'user';
  title: string;
  description: string;
  position: { x: number; y: number };
  coordinates?: Coordinates;
  reward?: string;
  expiresIn?: string;
  challengeId?: string;
  imageUrl?: string;
  brandId?: string;
  userId?: string;
  videoUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  type: 'easteregg' | 'drop' | 'challenge' | 'teamevent' | 'brand' | 'ugc';
  challengeId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: string;
  actionText: string;
  navigateTo?: string;
  challengeId?: string;
}

export interface NotificationSettings {
  newDrops: boolean;
  newChallenges: boolean;
  nearbyEasterEggs: boolean;
  teamEvents: boolean;
}

export interface MapFilters {
  mapElements: ('easteregg' | 'drop' | 'challenge' | 'teamevent' | 'brand' | 'ugc' | 'user')[];
  easterEggTypes: string[];
  radius: number;
  locationFilters: string[];
  rewardFilters: string[];
}

// Updated LiveMapMarker interface that is compatible with MapElement
export interface LiveMapMarker {
  id: string;
  type: 'easteregg' | 'drop' | 'challenge' | 'teamevent' | 'brand' | 'ugc' | 'user';
  title: string;
  description: string;
  position: Coordinates; // Using Coordinates instead of {x,y}
  coordinates?: Coordinates;
  reward?: string;
  expiresIn?: string;
  challengeId?: string;
  imageUrl?: string;
  brandId?: string;
  userId?: string;
  videoUrl?: string;
}

export interface CityClashDistrict {
  id: string;
  name: string;
  controlledBy: string | null;
  controlledByName?: string;
  points: number;
  challenges: number;
}

export interface LiveMapContextProps {
  mapData: any;
  activeMapElements: MapElement[];
  loadingMap: boolean;
  filters: MapFilters;
  setFilters: React.Dispatch<React.SetStateAction<MapFilters>>;
  resetFilters: () => void;
  events: Event[];
  notifications: Notification[];
  clearNotification: (id: string) => void;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (key: string, value: boolean) => void;
}
