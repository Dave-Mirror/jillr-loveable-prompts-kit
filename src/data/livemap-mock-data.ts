
import { MapElement, Event, Notification, MapFilters } from '@/types/livemap';

export const defaultFilters: MapFilters = {
  mapElements: ['easteregg', 'drop', 'challenge', 'teamevent'],
  easterEggTypes: [],
  radius: 5,
  locationFilters: ['nearby'],
  rewardFilters: []
};

export const mockMapElements: MapElement[] = [
  { 
    id: '1', 
    type: 'easteregg', 
    title: 'Hidden Nike Logo', 
    description: 'Find the AR Nike logo to unlock a 15% discount code!',
    position: { x: 25, y: 30 },
    reward: '15% discount code for Nike',
    coordinates: undefined,
    expiresIn: undefined,
    challengeId: undefined
  },
  { 
    id: '2', 
    type: 'drop', 
    title: 'Adidas Limited Sneakers', 
    description: 'Limited edition Adidas sneakers available for the next 24 hours. Reserve now!',
    position: { x: 65, y: 40 },
    reward: 'Limited edition sneakers',
    expiresIn: '23 hours 45 minutes',
    coordinates: undefined,
    challengeId: undefined
  },
  { 
    id: '3', 
    type: 'challenge', 
    title: 'Red Bull Photo Challenge', 
    description: 'Take a photo with 3 hidden Red Bull AR cans to win VIP concert tickets!',
    position: { x: 45, y: 60 },
    reward: 'VIP concert tickets',
    challengeId: '1',
    coordinates: undefined,
    expiresIn: undefined
  },
  { 
    id: '4', 
    type: 'teamevent', 
    title: 'Community Clean-up', 
    description: 'Join forces with other players to complete this environmental challenge!',
    position: { x: 80, y: 70 },
    reward: '500 XP and special team badge',
    coordinates: undefined,
    expiresIn: undefined,
    challengeId: undefined
  }
];

export const mockEvents: Event[] = [
  {
    id: 'event1',
    title: 'Nike Sneaker Drop',
    description: 'Limited edition Air Max release',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    location: 'Nike Store Downtown',
    type: 'drop',
    challengeId: undefined
  },
  {
    id: 'event2',
    title: 'AR Photo Challenge',
    description: 'Find and photograph hidden AR objects',
    date: new Date().toISOString(), // Today
    challengeId: '2',
    type: 'challenge',
    location: undefined
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

export const mockNotifications: Notification[] = [
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
