
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

// Curated seed challenges data
const seedChallenges = [
  {
    id: "scan-and-win",
    title: "Scan & Win",
    description: "Scanne QR-Codes bei Partner-Locations & unlocke Belohnungen.",
    category: "city-clash",
    xp: 500,
    tags: ["QR", "Retail", "CityClash"],
    thumbnailUrl: "https://images.unsplash.com/photo-1558898499-98b1b19b1c36?auto=format&q=80&w=1600",
    thumbnailAlt: "Person scannt QR-Code an einer Location"
  },
  {
    id: "outfit-reel",
    title: "Outfit Reel Challenge",
    description: "Teile dein Outfit-Video & sammle Likes für Coins & exklusive Drops.",
    category: "video",
    xp: 400,
    tags: ["UGC", "Fashion"],
    thumbnailUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600",
    thumbnailAlt: "Streetwear Portrait mit Smartphone"
  },
  {
    id: "capture-the-flag",
    title: "Capture the Flag",
    description: "Finde digitale Flaggen in deiner Zone & poste den Beweis.",
    category: "city-clash",
    xp: 450,
    tags: ["Clan", "Battle"],
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&q=80&w=1600",
    thumbnailAlt: "Neon Flagge in der Stadt"
  },
  {
    id: "eco-hero",
    title: "Eco Hero",
    description: "Sammle Müll in deiner Zone & poste den Beweis.",
    category: "sustainability",
    xp: 350,
    tags: ["PhotoUpload", "CleanUp"],
    thumbnailUrl: "https://images.unsplash.com/photo-1520975682036-4a1c1b87d4e6?auto=format&q=80&w=1600",
    thumbnailAlt: "Person hebt Müll in der Nachtstadt auf"
  },
  {
    id: "urban-detective",
    title: "Urban Detective",
    description: "Löse Rätsel & finde versteckte Orte in deiner Stadt.",
    category: "mystery",
    xp: 420,
    tags: ["Checkpoint", "Riddle"],
    thumbnailUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&q=80&w=1600",
    thumbnailAlt: "Neon-Lupe über Stadtkarte"
  },
  {
    id: "beat-the-clock",
    title: "Beat the Clock",
    description: "Erledige Missionen gegen die Zeit & steig' im Level auf.",
    category: "fitness",
    xp: 300,
    tags: ["Timer", "SpeedRun"],
    thumbnailUrl: "https://images.unsplash.com/photo-1526403226897-1f30ed4c1b39?auto=format&q=80&w=1600",
    thumbnailAlt: "Neon Stoppuhr"
  },
  {
    id: "check-in",
    title: "Check-in Challenge",
    description: "Checke bei Partnerstores ein, erhalte XP & Rabatte via Geofencing.",
    category: "geo",
    xp: 250,
    tags: ["Store", "GeoFence"],
    thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&q=80&w=1600",
    thumbnailAlt: "Städtischer Store mit Neonlicht"
  },
  {
    id: "selfie-landmark",
    title: "Selfie @ Landmark",
    description: "Kreatives Selfie an einem Wahrzeichen & Hashtags posten.",
    category: "photo",
    xp: 280,
    tags: ["Tour", "UGC"],
    thumbnailUrl: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&q=80&w=1600",
    thumbnailAlt: "Selfie in Neon-Stadt"
  },
  {
    id: "food-quest",
    title: "Mystery Menu Hunt",
    description: "Finde das versteckte Pop-Up & poste dein Lieblingsgericht.",
    category: "city-clash",
    xp: 320,
    tags: ["Food", "Rally"],
    thumbnailUrl: "https://images.unsplash.com/photo-1526312426976-593c2b999a20?auto=format&q=80&w=1600",
    thumbnailAlt: "Neon Food Szene"
  },
  {
    id: "night-run",
    title: "Neon Night Run",
    description: "5 km Night-Run Track – teile dein Finish-Foto.",
    category: "fitness",
    xp: 380,
    tags: ["Run", "City"],
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&q=80&w=1600",
    thumbnailAlt: "Läufer bei Nacht"
  },
  {
    id: "street-art",
    title: "Street Art Bingo",
    description: "Finde 5 Murals, fotografiere & poste ein Collage-Reel.",
    category: "photo",
    xp: 360,
    tags: ["Art", "Hunt"],
    thumbnailUrl: "https://images.unsplash.com/photo-1508182311256-e3f9f49427b1?auto=format&q=80&w=1600",
    thumbnailAlt: "Neon Street Art"
  },
  {
    id: "ar-treasure",
    title: "AR Treasure Hunt",
    description: "Suche AR-Kisten auf der Map & sammle Tickets.",
    category: "ar",
    xp: 420,
    tags: ["AR", "Map"],
    thumbnailUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600",
    thumbnailAlt: "AR-Overlay in Stadt"
  }
];

// Sample feed data - convert seed challenges to feed items
export const fetchFeedData = async (): Promise<FeedItemType[]> => {
  // In a real application, this would be an API call
  // Here we'll return mock data based on seed challenges
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return seedChallenges.map((challenge, index) => ({
    id: `feed-${challenge.id}`,
    userId: `user-${index + 1}`,
    username: `Challenger ${index + 1}`,
    userAvatar: '/placeholder.svg',
    caption: challenge.description,
    mediaUrl: challenge.thumbnailUrl || '/placeholder.svg',
    mediaType: challenge.category === 'video' ? 'video' : 'image',
    liked: false,
    likes: Math.floor(Math.random() * 500) + 100,
    views: Math.floor(Math.random() * 2000) + 500,
    commentCount: Math.floor(Math.random() * 50) + 10,
    comments: [],
    hashtags: challenge.tags || [],
    type: 'challenge',
    challengeInfo: {
      title: challenge.title,
      reward: `${challenge.xp} XP`,
    },
    postedAt: `${index + 1}h`,
    location: 'Berlin',
    challengeId: challenge.id
  }));
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
