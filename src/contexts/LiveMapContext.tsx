
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapElement {
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

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  type: 'easteregg' | 'drop' | 'challenge' | 'teamevent';
  challengeId?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: string;
  actionText: string;
  navigateTo?: string;
  challengeId?: string;
}

interface LiveMapContextProps {
  mapData: any;
  activeMapElements: MapElement[];
  loadingMap: boolean;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  resetFilters: () => void;
  events: Event[];
  notifications: Notification[];
  clearNotification: (id: string) => void;
  notificationSettings: {
    newDrops: boolean;
    newChallenges: boolean;
    nearbyEasterEggs: boolean;
    teamEvents: boolean;
  };
  updateNotificationSettings: (key: string, value: boolean) => void;
}

const defaultFilters = {
  mapElements: ['easteregg', 'drop', 'challenge', 'teamevent'],
  easterEggTypes: [],
  radius: 5,
  locationFilters: ['nearby'],
  rewardFilters: []
};

// Sample data for demonstration
const mockMapElements = [
  { 
    id: '1', 
    type: 'easteregg', 
    title: 'Hidden Nike Logo', 
    description: 'Find the AR Nike logo to unlock a 15% discount code!',
    position: { x: 25, y: 30 },
    reward: '15% discount code for Nike'
  },
  { 
    id: '2', 
    type: 'drop', 
    title: 'Adidas Limited Sneakers', 
    description: 'Limited edition Adidas sneakers available for the next 24 hours. Reserve now!',
    position: { x: 65, y: 40 },
    expiresIn: '23 hours 45 minutes'
  },
  { 
    id: '3', 
    type: 'challenge', 
    title: 'Red Bull Photo Challenge', 
    description: 'Take a photo with 3 hidden Red Bull AR cans to win VIP concert tickets!',
    position: { x: 45, y: 60 },
    reward: 'VIP concert tickets',
    challengeId: '1'
  },
  { 
    id: '4', 
    type: 'teamevent', 
    title: 'Community Clean-up', 
    description: 'Join forces with other players to complete this environmental challenge!',
    position: { x: 80, y: 70 },
    reward: '500 XP and special team badge'
  }
];

const mockEvents = [
  {
    id: 'event1',
    title: 'Nike Sneaker Drop',
    description: 'Limited edition Air Max release',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    location: 'Nike Store Downtown',
    type: 'drop'
  },
  {
    id: 'event2',
    title: 'AR Photo Challenge',
    description: 'Find and photograph hidden AR objects',
    date: new Date().toISOString(), // Today
    challengeId: '2',
    type: 'challenge'
  },
  {
    id: 'event3',
    title: 'Team Battle: City Center',
    description: 'Compete with other teams for control of the city center',
    date: new Date().toISOString(), // Today
    location: 'Central Park',
    type: 'teamevent'
  },
  {
    id: 'event4',
    title: 'McDonald\'s Secret Menu Hunt',
    description: 'Find the hidden AR menu items throughout the city',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    location: 'Various McDonald\'s locations',
    type: 'easteregg'
  }
];

const mockNotifications = [
  {
    id: 'notif1',
    title: 'New Drop Nearby!',
    message: 'Adidas Limited Sneakers are now available just 0.5km from you!',
    time: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    type: 'drop',
    actionText: 'View Drop',
    navigateTo: '/livemap'
  },
  {
    id: 'notif2',
    title: 'Challenge Completed!',
    message: 'Congratulations! You\'ve completed the Red Bull Photo Challenge.',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    type: 'challenge',
    actionText: 'Claim Reward',
    challengeId: '1'
  }
];

export const LiveMapContext = createContext<LiveMapContextProps>({
  mapData: null,
  activeMapElements: [],
  loadingMap: true,
  filters: defaultFilters,
  setFilters: () => {},
  resetFilters: () => {},
  events: [],
  notifications: [],
  clearNotification: () => {},
  notificationSettings: {
    newDrops: true,
    newChallenges: true,
    nearbyEasterEggs: true,
    teamEvents: true
  },
  updateNotificationSettings: () => {}
});

export const LiveMapProvider = ({ children }: { children: ReactNode }) => {
  const [mapData, setMapData] = useState<any>(null);
  const [activeMapElements, setActiveMapElements] = useState<MapElement[]>(mockMapElements);
  const [loadingMap, setLoadingMap] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);
  const [events, setEvents] = useState(mockEvents);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [notificationSettings, setNotificationSettings] = useState({
    newDrops: true,
    newChallenges: true,
    nearbyEasterEggs: true,
    teamEvents: true
  });

  useEffect(() => {
    // Load map data
    const loadMapData = async () => {
      try {
        // In a real implementation, fetch data from Supabase
        setTimeout(() => {
          setMapData({
            center: [13.404954, 52.520008], // Berlin coordinates
            zoom: 13
          });
          setLoadingMap(false);
        }, 1000);
        
        // Fetch map elements from Supabase (commented out for now)
        // const { data, error } = await supabase
        //   .from('map_elements')
        //   .select('*');
        // 
        // if (error) throw error;
        // if (data) setActiveMapElements(data);
      } catch (error) {
        console.error('Error loading map data:', error);
        setLoadingMap(false);
      }
    };

    loadMapData();
  }, []);

  // Filter map elements based on user filters
  useEffect(() => {
    if (filters) {
      // Apply filters to map elements (simplified implementation)
      const filteredElements = mockMapElements.filter(element => 
        filters.mapElements.includes(element.type)
      );
      
      setActiveMapElements(filteredElements);
    }
  }, [filters]);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const updateNotificationSettings = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <LiveMapContext.Provider
      value={{
        mapData,
        activeMapElements,
        loadingMap,
        filters,
        setFilters,
        resetFilters,
        events,
        notifications,
        clearNotification,
        notificationSettings,
        updateNotificationSettings
      }}
    >
      {children}
    </LiveMapContext.Provider>
  );
};
