
import { MapFilters, MapElement, Event, Notification } from '@/types/livemap';

export const defaultFilters: MapFilters = {
  mapElements: ['easteregg', 'drop', 'challenge', 'teamevent', 'brand'],
  easterEggTypes: ['ar', 'qr', 'geofencing', 'nfc'],
  radius: 5,
  locationFilters: ['nearby', 'popular'],
  rewardFilters: ['xp', 'coins', 'items', 'discounts']
};

export const mockMapElements: MapElement[] = [
  {
    id: 'easter-egg-1',
    type: 'easteregg',
    title: 'Hidden Easter Egg',
    description: 'You found a hidden Easter egg! Collect for XP rewards.',
    position: { x: 60, y: 40 },
    reward: '25 XP'
  },
  {
    id: 'drop-1',
    type: 'drop',
    title: 'Exclusive Sneaker Drop',
    description: 'Limited sneaker drop happening now! Visit store to claim.',
    position: { x: 45, y: 55 },
    reward: '50 Coins',
    expiresIn: '2 hours'
  },
  {
    id: 'challenge-1',
    type: 'challenge',
    title: 'Photo Challenge',
    description: 'Take a creative photo at this location to earn rewards!',
    position: { x: 55, y: 45 },
    reward: '100 XP',
    challengeId: 'challenge-photo-1'
  },
  {
    id: 'challenge-2',
    type: 'challenge',
    title: 'Dance Challenge',
    description: 'Show your best moves at this hotspot!',
    position: { x: 40, y: 50 },
    reward: '150 XP',
    challengeId: 'challenge-dance-1'
  },
  {
    id: 'teamevent-1',
    type: 'teamevent',
    title: 'Team Cleanup Challenge',
    description: 'Join with friends to clean up this area and earn team rewards!',
    position: { x: 50, y: 60 },
    reward: 'Team Badge + 200 XP',
    challengeId: 'challenge-team-1'
  },
  {
    id: 'challenge-city-1',
    type: 'challenge',
    title: 'City Clash: Kreuzberg District',
    description: 'Claim this district for your team by completing challenges!',
    position: { x: 65, y: 45 },
    reward: 'District Control + 300 XP',
    challengeId: 'challenge-city-kreuzberg'
  },
  {
    id: 'ugc-marker-1',
    type: 'ugc',
    title: 'Fashion Contest',
    description: 'User submitted content for the fashion challenge',
    position: { x: 48, y: 52 },
    imageUrl: '/assets/challenges/fashion-1.jpg',
    challengeId: 'challenge-fashion-1'
  },
  {
    id: 'brand-1',
    type: 'brand',
    title: 'Starbucks',
    description: 'Check in at Starbucks for a special challenge',
    position: { x: 53, y: 48 },
    brandId: 'brand-starbucks'
  },
  {
    id: 'user-1',
    type: 'user',
    title: 'MaxMustermann',
    description: 'Level 8 Explorer',
    position: { x: 51, y: 49 },
    userId: 'user-12345'
  }
];

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Weekend Flash Challenge',
    description: 'Complete 3 tasks during the weekend for bonus rewards',
    date: '2023-09-23T15:00:00',
    type: 'challenge'
  },
  {
    id: 'event-2',
    title: 'Exclusive Merch Drop',
    description: 'Limited edition merch available at the city center',
    date: '2023-09-25T10:00:00',
    location: 'City Center',
    type: 'drop'
  },
  {
    id: 'event-3',
    title: 'Easter Egg Hunt',
    description: 'Find all hidden easter eggs around the main park',
    date: '2023-09-26T14:00:00',
    location: 'Central Park',
    type: 'easteregg'
  },
  {
    id: 'event-4',
    title: 'City Clash Tournament',
    description: 'Teams battle for district control in a weekend event',
    date: '2023-09-30T12:00:00',
    type: 'teamevent',
    challengeId: 'city-clash-weekend'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notification-1',
    title: 'New Challenge Available',
    message: 'A new photo challenge has been added nearby!',
    time: '5 min ago',
    type: 'challenge',
    actionText: 'View Challenge'
  },
  {
    id: 'notification-2',
    title: 'Easter Egg Found',
    message: 'You discovered a hidden easter egg! +25 XP awarded',
    time: '1 hour ago',
    type: 'easteregg',
    actionText: 'View Rewards'
  },
  {
    id: 'notification-3',
    title: 'Team Event Starting',
    message: 'Your team event "Beach Cleanup" starts in 30 minutes',
    time: '2 hours ago',
    type: 'teamevent',
    actionText: 'View Details'
  }
];
