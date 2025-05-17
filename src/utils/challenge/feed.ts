
import { toast } from '@/hooks/use-toast';
import { FeedItem as FeedItemType } from '@/components/challenge-feed/types';

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

// Using the type from challenge-feed/types.ts to avoid duplicates
export type { FeedItemType as FeedItem };

// Sample feed data
export const fetchFeedData = async (): Promise<FeedItemType[]> => {
  // In a real application, this would be an API call
  // Here we'll return mock data
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 'feed-1',
      userId: 'user-1',
      username: 'Sarah M.',
      userAvatar: '/placeholder.svg',
      caption: '✨ Meine Entdeckung dieses Cafés war super! #BaristaArt #CoffeeTime',
      mediaUrl: '/placeholder.svg',
      mediaType: 'video',
      liked: false,
      likes: 423,
      views: 1200,
      commentCount: 57,
      comments: [
        {
          id: 'comment-1',
          username: 'Kaffeeliebhaber',
          text: 'Wow, das sieht toll aus! In welchem Café war das?',
          timestamp: '1h'
        },
        {
          id: 'comment-2',
          username: 'BerlinFoodie',
          text: 'Ich muss das unbedingt ausprobieren!',
          timestamp: '30m'
        }
      ],
      hashtags: ['BaristaArt', 'CoffeeTime', 'Berlin'],
      type: 'challenge',
      challengeInfo: {
        title: 'Coffee Culture',
        reward: '120 XP',
      },
      postedAt: '2h',
      location: 'Kreuzberg, Berlin',
      challengeId: 'challenge-coffee'
    },
    {
      id: 'feed-2',
      userId: 'user-2',
      username: 'Max T.',
      userAvatar: '/placeholder.svg',
      caption: 'Mein Besuch im neuen Tech Museum war absolut inspirierend! Danke @TechWorldBerlin für die Einladung. #TechInnovation #MuseumsTag',
      mediaUrl: '/placeholder.svg',
      mediaType: 'image',
      liked: false,
      likes: 256,
      views: 800,
      commentCount: 34,
      comments: [
        {
          id: 'comment-3',
          username: 'TechFan',
          text: 'Ich war letzte Woche dort! Die VR-Ausstellung ist fantastisch!',
          timestamp: '4h'
        }
      ],
      hashtags: ['TechInnovation', 'MuseumsTag', 'Berlin', 'Digital'],
      type: 'challenge',
      challengeInfo: {
        title: 'Museum Challenge',
        reward: '75 XP',
      },
      postedAt: '5h',
      challengeId: 'challenge-museum'
    },
    {
      id: 'feed-3',
      userId: 'user-3',
      username: 'Laura K.',
      userAvatar: '/placeholder.svg',
      caption: 'Ich nehme an der Sustainability Challenge teil! Hier ist mein erster Tag mit Zero Waste Einkauf 🌱 #Nachhaltigkeit #ZeroWaste',
      mediaUrl: '/placeholder.svg',
      mediaType: 'video',
      liked: false,
      likes: 892,
      views: 2500,
      commentCount: 103,
      comments: [
        {
          id: 'comment-4',
          username: 'EcoWarrior',
          text: 'Du inspirierst mich! Welchen Laden kannst du empfehlen?',
          timestamp: '23h'
        },
        {
          id: 'comment-5',
          username: 'GreenLife',
          text: 'Tolle Initiative! Machst du mit bei der Clean-Up Aktion nächste Woche?',
          timestamp: '20h'
        }
      ],
      hashtags: ['Nachhaltigkeit', 'ZeroWaste', 'EcoFriendly'],
      type: 'challenge',
      challengeInfo: {
        title: 'Sustainability Challenge',
        reward: '210 XP',
      },
      postedAt: '1d',
      challengeId: 'challenge-sustainability'
    },
    {
      id: 'feed-4',
      userId: 'user-4',
      username: 'Kai Z.',
      userAvatar: '/placeholder.svg',
      caption: 'Habe heute das neue Restaurant in der Kastanienallee ausprobiert. Die veganen Optionen sind fantastisch! 🍽️ #FoodLover #VeganFood',
      mediaUrl: '/placeholder.svg',
      mediaType: 'image',
      liked: false,
      likes: 341,
      views: 950,
      commentCount: 29,
      comments: [],
      hashtags: ['FoodLover', 'VeganFood', 'BerlinFood'],
      type: 'challenge',
      challengeInfo: {
        title: 'Food Explorer Challenge',
        reward: '65 XP',
      },
      postedAt: '2d',
      location: 'Kastanienallee, Berlin',
      challengeId: 'challenge-food'
    }
  ];
};

// Function to join a challenge
export const joinChallenge = async (challengeId: string): Promise<void> => {
  // In a real app, this would be an API call to join a challenge
  console.log(`Joining challenge: ${challengeId}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate success
  return Promise.resolve();
};
