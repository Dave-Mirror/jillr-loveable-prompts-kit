
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapElement {
  id: string;
  type: 'easteregg' | 'drop' | 'challenge' | 'teamevent';
  title: string;
  description: string;
  position: { x: number; y: number };
  coordinates?: Coordinates;
  reward?: string;
  expiresIn?: string;
  challengeId?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  type: 'easteregg' | 'drop' | 'challenge' | 'teamevent';
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
  mapElements: ('easteregg' | 'drop' | 'challenge' | 'teamevent')[];
  easterEggTypes: string[];
  radius: number;
  locationFilters: string[];
  rewardFilters: string[];
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
