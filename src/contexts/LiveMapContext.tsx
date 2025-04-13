
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  LiveMapContextProps, 
  MapElement, 
  Event, 
  Notification, 
  NotificationSettings,
  MapFilters
} from '@/types/livemap';
import { 
  defaultFilters, 
  mockMapElements, 
  mockEvents, 
  mockNotifications 
} from '@/data/livemap-mock-data';

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
  const [filters, setFilters] = useState<MapFilters>(defaultFilters);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    newDrops: true,
    newChallenges: true,
    nearbyEasterEggs: true,
    teamEvents: true
  });

  useEffect(() => {
    const loadMapData = async () => {
      try {
        setTimeout(() => {
          setMapData({
            center: [13.404954, 52.520008], // Berlin coordinates
            zoom: 13
          });
          setLoadingMap(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading map data:', error);
        setLoadingMap(false);
      }
    };

    loadMapData();
  }, []);

  useEffect(() => {
    if (filters) {
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
