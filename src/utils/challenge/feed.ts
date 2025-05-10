
import { toast } from '@/hooks/use-toast';

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface FeedItem {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: {
    type: 'video' | 'image';
    url: string;
  };
  caption: string;
  hashtags: string[];
  timestamp: string;
  likes: number;
  comments: number;
  commentsList?: Comment[];  // Add commentsList to store actual comments
  shares: number;
  impactPoints: number;
  liked: boolean;
  challenge: {
    id: string;
    title: string;
    icon: string;
  };
  location?: string;
  achievements?: {
    id: string;
    name: string;
    icon: string;
    description: string;
  }[];
}

// Sample feed data
export const fetchFeedData = async (): Promise<FeedItem[]> => {
  // In a real application, this would be an API call
  // Here we'll return mock data
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 'feed-1',
      user: {
        id: 'user-1',
        name: 'Sarah M.',
        username: '@sarahmcreates',
        avatar: '/placeholder.svg',
        verified: true
      },
      content: {
        type: 'video',
        url: '/placeholder.svg'
      },
      caption: '✨ Meine Entdeckung dieses Cafés war super! #BaristaArt #CoffeeTime',
      hashtags: ['BaristaArt', 'CoffeeTime', 'Berlin'],
      timestamp: '2h',
      likes: 423,
      comments: 57,
      commentsList: [
        {
          id: 'comment-1',
          userId: 'user-2',
          username: 'Kaffeeliebhaber',
          userAvatar: '/placeholder.svg',
          text: 'Wow, das sieht toll aus! In welchem Café war das?',
          timestamp: '1h',
          likes: 5
        },
        {
          id: 'comment-2',
          userId: 'user-3',
          username: 'BerlinFoodie',
          userAvatar: '/placeholder.svg',
          text: 'Ich muss das unbedingt ausprobieren!',
          timestamp: '30m',
          likes: 2
        }
      ],
      shares: 12,
      impactPoints: 120,
      liked: false,
      challenge: {
        id: 'challenge-coffee',
        title: 'Coffee Culture',
        icon: '☕'
      },
      location: 'Kreuzberg, Berlin',
      achievements: [
        {
          id: 'achieve-1',
          name: 'Coffee Explorer',
          icon: '🥇',
          description: 'Besuche 5 verschiedene Cafés'
        }
      ]
    },
    {
      id: 'feed-2',
      user: {
        id: 'user-2',
        name: 'Max T.',
        username: '@max_travel',
        avatar: '/placeholder.svg',
        verified: false
      },
      content: {
        type: 'image',
        url: '/placeholder.svg'
      },
      caption: 'Mein Besuch im neuen Tech Museum war absolut inspirierend! Danke @TechWorldBerlin für die Einladung. #TechInnovation #MuseumsTag',
      hashtags: ['TechInnovation', 'MuseumsTag', 'Berlin', 'Digital'],
      timestamp: '5h',
      likes: 256,
      comments: 34,
      commentsList: [
        {
          id: 'comment-3',
          userId: 'user-5',
          username: 'TechFan',
          userAvatar: '/placeholder.svg',
          text: 'Ich war letzte Woche dort! Die VR-Ausstellung ist fantastisch!',
          timestamp: '4h',
          likes: 8
        }
      ],
      shares: 8,
      impactPoints: 75,
      liked: false,
      challenge: {
        id: 'challenge-museum',
        title: 'Museum Challenge',
        icon: '🏛️'
      }
    },
    {
      id: 'feed-3',
      user: {
        id: 'user-3',
        name: 'Laura K.',
        username: '@laurasustainable',
        avatar: '/placeholder.svg',
        verified: true
      },
      content: {
        type: 'video',
        url: '/placeholder.svg'
      },
      caption: 'Ich nehme an der Sustainability Challenge teil! Hier ist mein erster Tag mit Zero Waste Einkauf 🌱 #Nachhaltigkeit #ZeroWaste',
      hashtags: ['Nachhaltigkeit', 'ZeroWaste', 'EcoFriendly'],
      timestamp: '1d',
      likes: 892,
      comments: 103,
      commentsList: [
        {
          id: 'comment-4',
          userId: 'user-6',
          username: 'EcoWarrior',
          userAvatar: '/placeholder.svg',
          text: 'Du inspirierst mich! Welchen Laden kannst du empfehlen?',
          timestamp: '23h',
          likes: 12
        },
        {
          id: 'comment-5',
          userId: 'user-7',
          username: 'GreenLife',
          userAvatar: '/placeholder.svg',
          text: 'Tolle Initiative! Machst du mit bei der Clean-Up Aktion nächste Woche?',
          timestamp: '20h',
          likes: 6
        }
      ],
      shares: 45,
      impactPoints: 210,
      liked: false,
      challenge: {
        id: 'challenge-sustainability',
        title: 'Sustainability Challenge',
        icon: '♻️'
      },
      achievements: [
        {
          id: 'achieve-2',
          name: 'Eco Warrior',
          icon: '🌱',
          description: 'Nimm an 3 Umweltschutz-Challenges teil'
        },
        {
          id: 'achieve-3',
          name: 'Influencer',
          icon: '🌟',
          description: 'Erreiche 500+ Likes auf einem Nachhaltigkeits-Post'
        }
      ]
    },
    {
      id: 'feed-4',
      user: {
        id: 'user-4',
        name: 'Kai Z.',
        username: '@kaithefoodie',
        avatar: '/placeholder.svg',
        verified: false
      },
      content: {
        type: 'image',
        url: '/placeholder.svg'
      },
      caption: 'Habe heute das neue Restaurant in der Kastanienallee ausprobiert. Die veganen Optionen sind fantastisch! 🍽️ #FoodLover #VeganFood',
      hashtags: ['FoodLover', 'VeganFood', 'BerlinFood'],
      timestamp: '2d',
      likes: 341,
      comments: 29,
      commentsList: [],
      shares: 6,
      impactPoints: 65,
      liked: false,
      challenge: {
        id: 'challenge-food',
        title: 'Food Explorer Challenge',
        icon: '🍔'
      },
      location: 'Kastanienallee, Berlin'
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
