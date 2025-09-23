
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
    id: "qr-code-scan",
    slug: "qr-code-scan",
    title: "QR-Code Scan Challenge",
    subtitle: "CITY CLASH",
    description: "Scanne einen QR-Code an markierten Spots und lade dein Selfie hoch.",
    category: "city-clash",
    xp: 250,
    tags: ["CityClash", "QR", "Scan"],
    thumbnailUrl: "https://images.unsplash.com/photo-1617196033578-6e0a2f8f6b32?auto=format&q=80&w=1600",
    thumbnailAlt: "Smartphone scannt QR-Code im urbanen Umfeld.",
    status: "published",
    templateCategory: "City Clash"
  },
  {
    id: "check-in",
    slug: "check-in",
    title: "Check-in Challenge",
    subtitle: "CITY CLASH",
    description: "Checke an einem markierten Ort ein und poste ein Foto.",
    category: "city-clash",
    xp: 200,
    tags: ["CityClash", "Checkin", "Location"],
    thumbnailUrl: "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&q=80&w=1600",
    thumbnailAlt: "Person checkt per Smartphone an einem Standort ein.",
    status: "published",
    templateCategory: "City Clash"
  },
  {
    id: "selfie",
    slug: "selfie",
    title: "Selfie Challenge",
    subtitle: "CITY CLASH",
    description: "Poste ein kreatives Selfie an einem bekannten Spot deiner Stadt.",
    category: "city-clash",
    xp: 300,
    tags: ["CityClash", "Selfie", "UGC"],
    thumbnailUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&q=80&w=1600",
    thumbnailAlt: "Junge Person macht Selfie vor Neonlichtern.",
    status: "published",
    templateCategory: "City Clash"
  },
  {
    id: "public-transport",
    slug: "public-transport",
    title: "Public Transport Challenge",
    subtitle: "CITY CLASH",
    description: "Nutze Bus, Bahn oder E-Scooter und poste ein Foto/Video von deinem Ride.",
    category: "city-clash",
    xp: 350,
    tags: ["CityClash", "Transport", "Eco", "Mobility"],
    thumbnailUrl: "https://images.unsplash.com/photo-1605732445886-3baf2d9f13c5?auto=format&q=80&w=1600",
    thumbnailAlt: "Person mit Wearable auf E-Scooter in der Stadt.",
    status: "published",
    templateCategory: "City Clash"
  },
  {
    id: "easter-egg",
    slug: "easter-egg",
    title: "Easter Egg Hunt",
    subtitle: "CITY CLASH",
    description: "Finde versteckte Easter Eggs in der Stadt und lade ein Foto hoch.",
    category: "city-clash",
    xp: 400,
    tags: ["CityClash", "Hunt", "Game"],
    thumbnailUrl: "https://images.unsplash.com/photo-1587691592099-230de206b7a3?auto=format&q=80&w=1600",
    thumbnailAlt: "Bunte versteckte Easter Eggs im urbanen Park.",
    status: "published",
    templateCategory: "City Clash"
  },
  {
    id: "street-art-bingo",
    slug: "street-art-bingo",
    title: "Street Art Bingo",
    subtitle: "CITY CLASH",
    description: "Sammle Fotos von Street-Art-Motiven in deiner Stadt.",
    category: "city-clash",
    xp: 300,
    tags: ["CityClash", "Art", "Bingo"],
    thumbnailUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&q=80&w=1600",
    thumbnailAlt: "Street Art Wand mit Neon Graffiti.",
    status: "published",
    templateCategory: "City Clash"
  },
  {
    id: "clan-battle",
    slug: "clan-battle",
    title: "Clan Battle",
    subtitle: "MULTI-PLAYER",
    description: "Trete mit deinem Clan gegen andere an. Mehr Abschlüsse = mehr Punkte.",
    category: "city-clash",
    xp: 500,
    tags: ["CityClash", "Battle", "Clan"],
    thumbnailUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600",
    thumbnailAlt: "Gruppe von Leuten jubelt im Neonlicht.",
    status: "published",
    templateCategory: "City Clash"
  },
  {
    id: "influencer-battle",
    slug: "influencer-battle", 
    title: "Influencer Battle",
    subtitle: "UGC • REELS • CLAN BATTLE",
    description: "Creator treten mit Reels gegeneinander an. Community-Voting entscheidet.",
    category: "video",
    xp: 400,
    tags: ["UGC", "Video", "Battle", "Influencer"],
    thumbnailUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600",
    thumbnailAlt: "Creator Portrait mit Neon-Look.",
    status: "published",
    templateCategory: "UGC / Video"
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
    // Normalize category to lowercase kebab-case
    category: 'city-clash',
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
    // Auto-generate poster URLs for video challenges
    posterUrl: challenge.category === 'video' ? challenge.thumbnailUrl : undefined,
    thumbnailUrl: challenge.thumbnailUrl,
    liked: false,
    likes: Math.floor(Math.random() * 500) + 100,
    views: Math.floor(Math.random() * 2000) + 500,
    commentCount: Math.floor(Math.random() * 50) + 10,
    comments: [],
    hashtags: challenge.tags || [],
    type: 'challenge' as const,
    // Normalize category to lowercase kebab-case
    category: challenge.category,
    challengeInfo: {
      title: challenge.title,
      subtitle: challenge.subtitle || '',
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
