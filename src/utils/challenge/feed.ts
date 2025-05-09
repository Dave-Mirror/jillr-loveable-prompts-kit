import { toast } from '@/hooks/use-toast';

// Types
export interface FeedItem {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  challenge: {
    id: string;
    title: string;
    brand?: string;
    brandLogo?: string;
  };
  content: {
    type: 'video' | 'image';
    url: string;
    aspectRatio: number;
  };
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  impactPoints: number;
  liked: boolean;
  tags: string[];
  achievements?: { 
    id: string; 
    name: string; 
    icon: string;
    points: number;
  }[];
}

// Fetch feed data - would be replaced with actual API call
export const fetchFeedData = async (): Promise<FeedItem[]> => {
  // In a real app, this would be an API call
  // return await api.get('/feed');
  
  // For now, return mock data
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(mockFeedItems);
    }, 1000);
  });
};

// Handle like action
export const likeContent = async (id: string, liked: boolean): Promise<boolean> => {
  // In a real app, this would be an API call
  // await api.post('/feed/like', { id, liked });
  
  // Simulate API call
  return await new Promise(resolve => {
    setTimeout(() => {
      // Return opposite of current state to toggle
      resolve(!liked);
    }, 300);
  });
};

// Handle share action
export const shareContent = async (id: string): Promise<number> => {
  // In a real app, this would call a sharing API
  
  // Show sharing options toast - without JSX
  toast({
    title: "Share Options",
    description: "Choose a platform to share this content.",
  });
  
  // Simulate API response with new share count
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(1); // Increment by 1
    }, 300);
  });
};

// Support a cause / boost impact points
export const supportCause = async (id: string): Promise<number> => {
  // In a real app, this would call an API to support the cause
  
  // Show confirmation toast
  toast({
    title: "Impact Made!",
    description: "Thank you for supporting this cause! +25 impact points awarded.",
    className: "bg-jillr-neonGreen/20",
  });
  
  // Simulate API response with new impact points
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(25); // Add 25 impact points
    }, 300);
  });
};

// Join challenge function
export const joinChallenge = async (challengeId: string): Promise<void> => {
  // In a real app, this would call an API to join the challenge
  
  // Show confirmation toast
  toast({
    title: "Challenge beigetreten!",
    description: "Du nimmst jetzt an dieser Challenge teil. Viel Erfolg!",
    className: "bg-jillr-neonPurple/20",
  });
  
  // Simulate API response
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

// Mock data
const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Sarah Meyer',
      username: 'sarahcreates',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256'
    },
    challenge: {
      id: 'c1',
      title: 'Summer Beach Cleanups',
      brand: 'OceanGuard',
      brandLogo: 'https://via.placeholder.com/40'
    },
    content: {
      type: 'video',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-happily-1228-large.mp4',
      aspectRatio: 9/16
    },
    caption: 'Just finished my beach cleanup challenge! Collected over 5kg of plastic! 🌊 #OceanGuard #SaveTheOcean',
    likes: 1243,
    comments: 89,
    shares: 32,
    impactPoints: 120,
    liked: false,
    tags: ['beachcleanup', 'environment', 'sustainability'],
    achievements: [
      { 
        id: 'a1', 
        name: 'Beach Hero', 
        icon: '🏆',
        points: 50
      },
      { 
        id: 'a2', 
        name: 'Influencer', 
        icon: '⭐',
        points: 25
      }
    ]
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Marco Wirtz',
      username: 'marcowirtz',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=256&h=256'
    },
    challenge: {
      id: 'c2',
      title: 'Urban Photography',
      brand: 'CityLens',
      brandLogo: 'https://via.placeholder.com/40'
    },
    content: {
      type: 'video',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-urban-trendy-people-dancing-near-a-house-4814-large.mp4',
      aspectRatio: 9/16
    },
    caption: 'Exploring the hidden corners of Berlin with my new CityLens camera! #UrbanExploration',
    likes: 876,
    comments: 45,
    shares: 21,
    impactPoints: 75,
    liked: false,
    tags: ['photography', 'urban', 'berlin'],
    achievements: [
      { 
        id: 'a3', 
        name: 'Urban Explorer', 
        icon: '🏙️',
        points: 35
      }
    ]
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Leila Khan',
      username: 'leilakfitness',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=256&h=256'
    },
    challenge: {
      id: 'c3',
      title: 'Green Smoothie Week',
      brand: 'GreenBlend',
      brandLogo: 'https://via.placeholder.com/40'
    },
    content: {
      type: 'video',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-taking-a-selfie-with-her-smartphone-standing-47069-large.mp4',
      aspectRatio: 9/16
    },
    caption: 'Day 5 of the @GreenBlend challenge! This kale and mango smoothie is 🔥 #SmoothieWeek',
    likes: 1012,
    comments: 67,
    shares: 15,
    impactPoints: 90,
    liked: false,
    tags: ['fitness', 'health', 'smoothie'],
    achievements: [
      { 
        id: 'a4', 
        name: 'Health Guru', 
        icon: '🥑',
        points: 40
      }
    ]
  }
];
