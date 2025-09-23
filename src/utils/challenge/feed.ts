
import { toast } from '@/hooks/use-toast';
import { FeedItem as FeedItemType } from '@/components/challenge-feed/types';
import { CityChallenge } from '@/hooks/useCityClashData';

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
  // City Clash specific demo challenges
  {
    id: "qr-code-scan-challenge",
    slug: "qr-code-scan-challenge",
    title: "QR-Code Scan Challenge",
    description: "Scanne versteckte QR-Codes in der Stadt und sammle Coins.",
    category: "city-clash",
    xp: 300,
    tags: ["city", "clash"],
    thumbnailUrl: "https://images.unsplash.com/photo-1558898499-98b1b19b1c36?auto=format&q=80&w=1600",
    thumbnailAlt: "Person scanning QR code in urban environment",
    status: "published"
  },
  {
    id: "city-checkin-challenge",
    slug: "city-checkin-challenge", 
    title: "City Check-in Challenge",
    description: "Checke an Partner-Locations ein und unlocke Belohnungen.",
    category: "city-clash",
    xp: 250,
    tags: ["city", "clash"],
    thumbnailUrl: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9b?auto=format&q=80&w=1600",
    thumbnailAlt: "City location check-in interface",
    status: "published"
  },
  {
    id: "selfie-spot-challenge",
    slug: "selfie-spot-challenge",
    title: "Selfie Spot Challenge", 
    description: "Mache ein Selfie an markanten Orten und teile es mit der Community.",
    category: "city-clash",
    xp: 200,
    tags: ["city", "clash"],
    thumbnailUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&q=80&w=1600",
    thumbnailAlt: "Person taking selfie at landmark",
    status: "published"
  },
  {
    id: "street-art-hunt",
    slug: "street-art-hunt",
    title: "Street Art Hunt",
    description: "Entdecke Graffiti oder Street Art und lade ein Foto hoch.",
    category: "city-clash",
    xp: 280,
    tags: ["city", "clash"],
    thumbnailUrl: "https://images.unsplash.com/photo-1508264165352-258859e62245?auto=format&q=80&w=1600",
    thumbnailAlt: "Street art graffiti on urban wall",
    status: "published"
  },
  {
    id: "hidden-easter-egg",
    slug: "hidden-easter-egg",
    title: "Hidden Easter Egg",
    description: "Finde versteckte Objekte oder Hinweise in der Stadt.",
    category: "city-clash", 
    xp: 320,
    tags: ["city", "clash"],
    thumbnailUrl: "https://images.unsplash.com/photo-1522206024047-9c9254216757?auto=format&q=80&w=1600",
    thumbnailAlt: "Hidden objects and clues in urban environment",
    status: "published"
  },
  // Other category challenges
  {
    id: "outfit-reel",
    slug: "outfit-reel",
    title: "Outfit Reel Challenge",
    description: "Teile dein Outfit-Video & sammle Likes für Coins & exklusive Drops.",
    category: "video",
    xp: 400,
    tags: ["UGC", "Fashion"],
    thumbnailUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600",
    thumbnailAlt: "Streetwear Portrait mit Smartphone",
    status: "published"
  },
  {
    id: "eco-hero",
    slug: "eco-hero",
    title: "Eco Hero",
    description: "Sammle Müll in deiner Zone & poste den Beweis.",
    category: "sustainability",
    xp: 350,
    tags: ["PhotoUpload", "CleanUp"],
    thumbnailUrl: "https://images.unsplash.com/photo-1520975682036-4a1c1b87d4e6?auto=format&q=80&w=1600",
    thumbnailAlt: "Person hebt Müll in der Nachtstadt auf",
    status: "published"
  },
  {
    id: "urban-detective",
    slug: "urban-detective",
    title: "Urban Detective",
    description: "Löse Rätsel & finde versteckte Orte in deiner Stadt.",
    category: "mystery",
    xp: 420,
    tags: ["Checkpoint", "Riddle"],
    thumbnailUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&q=80&w=1600",
    thumbnailAlt: "Neon-Lupe über Stadtkarte",
    status: "published"
  },
  {
    id: "beat-the-clock",
    slug: "beat-the-clock",
    title: "Beat the Clock",
    description: "Erledige Missionen gegen die Zeit & steig' im Level auf.",
    category: "fitness",
    xp: 300,
    tags: ["Timer", "SpeedRun"],
    thumbnailUrl: "https://images.unsplash.com/photo-1526403226897-1f30ed4c1b39?auto=format&q=80&w=1600",
    thumbnailAlt: "Neon Stoppuhr",
    status: "published"
  },
  {
    id: "check-in",
    slug: "check-in",
    title: "Check-in Challenge",
    description: "Checke bei Partnerstores ein, erhalte XP & Rabatte via Geofencing.",
    category: "geo",
    xp: 250,
    tags: ["Store", "GeoFence"],
    thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&q=80&w=1600",
    thumbnailAlt: "Städtischer Store mit Neonlicht",
    status: "published"
  },
  {
    id: "selfie-landmark",
    slug: "selfie-landmark",
    title: "Selfie @ Landmark",
    description: "Kreatives Selfie an einem Wahrzeichen & Hashtags posten.",
    category: "photo",
    xp: 280,
    tags: ["Tour", "UGC"],
    thumbnailUrl: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&q=80&w=1600",
    thumbnailAlt: "Selfie in Neon-Stadt",
    status: "published"
  },
  {
    id: "night-run",
    slug: "night-run",
    title: "Neon Night Run",
    description: "5 km Night-Run Track – teile dein Finish-Foto.",
    category: "fitness",
    xp: 380,
    tags: ["Run", "City"],
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&q=80&w=1600",
    thumbnailAlt: "Läufer bei Nacht",
    status: "published"
  },
  {
    id: "ar-treasure",
    slug: "ar-treasure",
    title: "AR Treasure Hunt",
    description: "Suche AR-Kisten auf der Map & sammle Tickets.",
    category: "ar",
    xp: 420,
    tags: ["AR", "Map"],
    thumbnailUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600",
    thumbnailAlt: "AR-Overlay in Stadt",
    status: "published"
  }
];

// Function to fetch City Clash challenges
const fetchCityChallenges = async (): Promise<CityChallenge[]> => {
  // Mock City Clash challenges data - in real app this would be an API call
  const mockCityChallenges: CityChallenge[] = [
    {
      id: 'challenge-city-1',
      title: 'Urban Sprint Challenge',
      description: 'Erreiche 5 Checkpoints in der Stadt so schnell wie möglich und gewinne exklusive Sneakers.',
      type: 'time_rush',
      category: 'team',
      difficulty: 'medium',
      reward: { xp: 500, products: [{ name: 'Limited Edition Urban Sneakers' }] },
      duration: '2 Stunden',
      districtId: 'district-1',
      districtName: 'Schwabing',
      brandId: 'brand-1',
      brandName: 'UrbanFootwear',
      brandLogo: '/placeholder.svg',
      participants: 143,
      startDate: '2025-05-15T10:00:00Z',
      endDate: '2025-05-15T18:00:00Z',
      imageUrl: '/placeholder.svg',
      thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop',
      thumbnailAlt: 'Person running through urban environment with sneakers'
    },
    {
      id: 'challenge-city-2',
      title: 'QR-Code Checkpoint Race',
      description: 'Scanne alle 5 QR-Codes in der Innenstadt so schnell wie möglich und gewinne attraktive Preise.',
      type: 'secret_society',
      category: 'mystery',
      difficulty: 'easy',
      reward: { xp: 300, coins: 100 },
      duration: '1 Stunde',
      districtId: 'district-2',
      districtName: 'Maxvorstadt',
      participants: 95,
      startDate: '2025-05-16T14:00:00Z',
      endDate: '2025-05-16T18:00:00Z',
      imageUrl: '/placeholder.svg',
      thumbnailUrl: 'https://images.unsplash.com/photo-1558898499-98b1b19b1c36?auto=format&q=80&w=1600',
      thumbnailAlt: 'QR code scanning in urban environment'
    },
    {
      id: 'challenge-city-3',
      title: 'City Check-in Challenge',
      description: 'Checke an Partner-Locations ein und unlocke Belohnungen durch Geofencing.',
      type: 'time_rush',
      category: 'location',
      difficulty: 'easy',
      reward: { xp: 250, coins: 75 },
      duration: '1 Tag',
      districtId: 'district-3',
      districtName: 'Glockenbach',
      participants: 67,
      startDate: '2025-05-17T09:00:00Z',
      endDate: '2025-05-17T21:00:00Z',
      imageUrl: '/placeholder.svg',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9b?auto=format&q=80&w=1600',
      thumbnailAlt: 'City location check-in interface'
    }
  ];
  
  return mockCityChallenges;
};

// Convert City Clash challenges to feed items
const convertCityChallengesToFeedItems = (cityChallenges: CityChallenge[]): FeedItemType[] => {
  return cityChallenges.map((challenge, index) => ({
    id: `city-feed-${challenge.id}`,
    userId: `city-user-${index + 1}`,
    username: `City Explorer ${index + 1}`,
    userAvatar: '/placeholder.svg',
    caption: challenge.description,
    mediaUrl: challenge.thumbnailUrl || challenge.imageUrl || '/placeholder.svg',
    mediaType: 'image' as const,
    liked: false,
    likes: challenge.participants + Math.floor(Math.random() * 100),
    views: challenge.participants * 3 + Math.floor(Math.random() * 500),
    commentCount: Math.floor(Math.random() * 30) + 5,
    comments: [],
    hashtags: ['CityClash', challenge.districtName, challenge.type],
    type: 'challenge' as const,
    // Add category field for City Clash challenges
    category: 'City Clash',
    challengeInfo: {
      title: challenge.title,
      reward: `${challenge.reward.xp} XP`,
      brandLogo: challenge.brandLogo,
    },
    postedAt: `${Math.floor(Math.random() * 12) + 1}h`,
    location: challenge.districtName,
    challengeId: challenge.id
  }));
};

// Sample feed data - convert seed challenges to feed items and include City Clash
export const fetchFeedData = async (): Promise<FeedItemType[]> => {
  // In a real application, this would be an API call
  // Here we'll return mock data based on seed challenges + City Clash challenges
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Fetch City Clash challenges
  const cityChallenges = await fetchCityChallenges();
  const cityFeedItems = convertCityChallengesToFeedItems(cityChallenges);
  
  // Convert seed challenges to feed items
  const seedFeedItems = seedChallenges.map((challenge, index) => ({
    id: `feed-${challenge.id}`,
    userId: `user-${index + 1}`,
    username: `Challenger ${index + 1}`,
    userAvatar: '/placeholder.svg',
    caption: challenge.description,
    mediaUrl: challenge.thumbnailUrl || '/placeholder.svg',
    mediaType: challenge.category === 'video' ? 'video' as const : 'image' as const,
    liked: false,
    likes: Math.floor(Math.random() * 500) + 100,
    views: Math.floor(Math.random() * 2000) + 500,
    commentCount: Math.floor(Math.random() * 50) + 10,
    comments: [],
    hashtags: challenge.tags || [],
    type: 'challenge' as const,
    // Map category properly
    category: challenge.category === 'city-clash' ? 'City Clash' : challenge.category,
    challengeInfo: {
      title: challenge.title,
      reward: `${challenge.xp} XP`,
    },
    postedAt: `${index + 1}h`,
    location: 'Berlin',
    challengeId: challenge.id
  }));
  
  // Combine all feed items and sort by updatedAt desc (simulated with random dates)
  const allFeedItems = [...cityFeedItems, ...seedFeedItems];
  
  return allFeedItems.sort((a, b) => {
    // Sort by most recent first (simulated)
    const timeA = parseInt(a.postedAt.replace('h', ''));
    const timeB = parseInt(b.postedAt.replace('h', ''));
    return timeA - timeB;
  });
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
