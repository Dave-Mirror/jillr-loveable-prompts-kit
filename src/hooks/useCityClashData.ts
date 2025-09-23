import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Define types for City Clash data
export interface CityChallenge {
  id: string;
  slug?: string; // Added for thumbnail resolution
  title: string;
  description: string;
  type: 'time_rush' | 'team_battle' | 'digital_heist' | 'mystery_card' | 'shadow_quest' | 'secret_society' | 'urban_legend';
  category?: 'location' | 'social' | 'team' | 'eco' | 'mystery';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  reward: {
    xp: number;
    coins?: number;
    products?: {
      name: string;
      image?: string;
    }[];
    tickets?: {
      name: string;
      event: string;
      date: string;
    }[];
  };
  duration: string;
  districtId: string;
  districtName: string;
  teamId?: string;
  teamName?: string;
  brandId?: string;
  brandName?: string;
  brandLogo?: string;
  participants: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
}

export interface CityDistrict {
  id: string;
  name: string;
  controlledBy: string | null;
  controlledByName: string | null;
  challenges: number;
  points: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface CityTeam {
  id: string;
  name: string;
  members: number;
  points: number;
  controlledDistricts: number;
  color: string;
  logo?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  rank: number;
  points: number;
  controlledDistricts: number;
  teamId?: string;
  teamName?: string;
  avatar: string;
}

export const useCityClashData = () => {
  const [challenges, setChallenges] = useState<CityChallenge[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<CityChallenge[]>([]);
  const [districts, setDistricts] = useState<CityDistrict[]>([]);
  const [teams, setTeams] = useState<CityTeam[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCityClashData = async () => {
      setIsLoading(true);
      try {
        // Mock data for districts
        const mockDistricts: CityDistrict[] = [
          {
            id: 'district-1',
            name: 'Schwabing',
            controlledBy: 'team-2',
            controlledByName: 'Urban Dragons',
            challenges: 8,
            points: 1250,
            coordinates: { lat: 48.158, lng: 11.582 }
          },
          {
            id: 'district-2',
            name: 'Maxvorstadt',
            controlledBy: 'team-1',
            controlledByName: 'City Hunters',
            challenges: 5,
            points: 980,
            coordinates: { lat: 48.148, lng: 11.565 }
          },
          {
            id: 'district-3',
            name: 'Glockenbach',
            controlledBy: null,
            controlledByName: null,
            challenges: 6,
            points: 750,
            coordinates: { lat: 48.129, lng: 11.575 }
          },
          {
            id: 'district-4',
            name: 'Haidhausen',
            controlledBy: 'team-3',
            controlledByName: 'Night Owls',
            challenges: 7,
            points: 1050,
            coordinates: { lat: 48.133, lng: 11.595 }
          },
          {
            id: 'district-5',
            name: 'Westend',
            controlledBy: null,
            controlledByName: null,
            challenges: 4,
            points: 620,
            coordinates: { lat: 48.136, lng: 11.537 }
          }
        ];
        
        // Mock data for teams
        const mockTeams: CityTeam[] = [
          {
            id: 'team-1',
            name: 'City Hunters',
            members: 158,
            points: 3240,
            controlledDistricts: 2,
            color: '#FF4D6D',
            logo: '/placeholder.svg'
          },
          {
            id: 'team-2',
            name: 'Urban Dragons',
            members: 204,
            points: 4120,
            controlledDistricts: 3,
            color: '#7209B7',
            logo: '/placeholder.svg'
          },
          {
            id: 'team-3',
            name: 'Night Owls',
            members: 109,
            points: 2780,
            controlledDistricts: 1,
            color: '#4CC9F0',
            logo: '/placeholder.svg'
          },
          {
            id: 'team-4',
            name: 'Street Legends',
            members: 87,
            points: 1950,
            controlledDistricts: 0,
            color: '#F72585',
            logo: '/placeholder.svg'
          },
          {
            id: 'team-5',
            name: 'Metro Rebels',
            members: 132,
            points: 2420,
            controlledDistricts: 0,
            color: '#4361EE',
            logo: '/placeholder.svg'
          }
        ];
        
        // Mock data for leaderboard
        const mockLeaderboard: LeaderboardEntry[] = [
          {
            id: 'user-1',
            name: 'MaxRunner',
            rank: 1,
            points: 1540,
            controlledDistricts: 2,
            teamId: 'team-2',
            teamName: 'Urban Dragons',
            avatar: '/placeholder.svg'
          },
          {
            id: 'user-2',
            name: 'JennyTravels',
            rank: 2,
            points: 1320,
            controlledDistricts: 1,
            teamId: 'team-1',
            teamName: 'City Hunters',
            avatar: '/placeholder.svg'
          },
          {
            id: 'user-3',
            name: 'StreetMaster',
            rank: 3,
            points: 1290,
            controlledDistricts: 1,
            teamId: 'team-3',
            teamName: 'Night Owls',
            avatar: '/placeholder.svg'
          },
          {
            id: 'user-4',
            name: 'UrbanExplorer',
            rank: 4,
            points: 1180,
            controlledDistricts: 0,
            teamId: 'team-2',
            teamName: 'Urban Dragons',
            avatar: '/placeholder.svg'
          },
          {
            id: 'user-5',
            name: 'NightHunter',
            rank: 5,
            points: 1050,
            controlledDistricts: 0,
            teamId: 'team-4',
            teamName: 'Street Legends',
            avatar: '/placeholder.svg'
          }
        ];
        
        // Enhanced mock data for challenges with categories
        const mockChallenges: CityChallenge[] = [
          {
            id: 'challenge-city-1',
            title: 'Urban Sprint Challenge',
            description: 'Erreiche 5 Checkpoints in der Stadt so schnell wie möglich und gewinne exklusive Sneakers.',
            type: 'time_rush',
            category: 'team',
            difficulty: 'medium',
            reward: {
              xp: 500,
              products: [{ name: 'Limited Edition Urban Sneakers', image: '/placeholder.svg' }]
            },
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
            title: 'The Vault - Codeknacker Challenge',
            description: 'Finde alle Hinweise in der Stadt und knacke den Code des digitalen Tresors für exklusive Rewards.',
            type: 'digital_heist',
            category: 'mystery',
            difficulty: 'hard',
            reward: {
              xp: 750,
              coins: 250
            },
            duration: '3 Tage',
            districtId: 'district-2',
            districtName: 'Maxvorstadt',
            participants: 287,
            startDate: '2025-05-14T08:00:00Z',
            endDate: '2025-05-17T23:59:59Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop',
            thumbnailAlt: 'Digital lock and security code interface'
          },
          {
            id: 'challenge-city-3',
            title: 'Nightlife XP - Club Expedition',
            description: 'Besuche 3 teilnehmende Clubs und sammle Punkte für Freigetränke und VIP-Zugang.',
            type: 'shadow_quest',
            category: 'location',
            difficulty: 'easy',
            reward: {
              xp: 350,
              tickets: [{ name: 'VIP Club Pass', event: 'Weekend Party', date: '2025-05-18' }]
            },
            duration: 'Weekend',
            districtId: 'district-3',
            districtName: 'Glockenbach',
            brandId: 'brand-3',
            brandName: 'ClubCulture',
            brandLogo: '/placeholder.svg',
            participants: 412,
            startDate: '2025-05-17T20:00:00Z',
            endDate: '2025-05-19T04:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=225&fit=crop',
            thumbnailAlt: 'Night club with neon lights and party atmosphere'
          },
          {
            id: 'challenge-city-4',
            title: 'Mystery Card Collection',
            description: 'Sammle alle 5 Kartenteile in verschiedenen Stores der Stadt und gewinne limitierte Trading Cards.',
            type: 'mystery_card',
            category: 'mystery',
            difficulty: 'medium',
            reward: {
              xp: 450,
              products: [{ name: 'Rare Mystery Card Set', image: '/placeholder.svg' }]
            },
            duration: '1 Woche',
            districtId: 'district-4',
            districtName: 'Haidhausen',
            brandId: 'brand-4',
            brandName: 'CardMasters',
            brandLogo: '/placeholder.svg',
            teamId: 'team-2',
            teamName: 'Urban Dragons',
            participants: 189,
            startDate: '2025-05-10T10:00:00Z',
            endDate: '2025-05-17T22:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
            thumbnailAlt: 'Mystery trading cards spread on dark surface'
          },
          {
            id: 'challenge-city-5',
            title: 'Team Territory Battle',
            description: 'Kämpfe mit deinem Team um die Kontrolle über Westend und gewinne exklusive Team-Rewards.',
            type: 'team_battle',
            category: 'team',
            difficulty: 'expert',
            reward: {
              xp: 1000,
              coins: 500
            },
            duration: '5 Tage',
            districtId: 'district-5',
            districtName: 'Westend',
            participants: 352,
            startDate: '2025-05-13T12:00:00Z',
            endDate: '2025-05-18T12:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=225&fit=crop',
            thumbnailAlt: 'Team battle scene with neon city background'
          },
          {
            id: 'challenge-city-6',
            title: 'Secret Society Initiation',
            description: 'Finde die geheimen QR-Codes in der Stadt und erhalte Zugang zur exklusiven Secret Society.',
            type: 'secret_society',
            category: 'mystery',
            difficulty: 'expert',
            reward: {
              xp: 1200,
              products: [{ name: 'Secret Society Membership Card', image: '/placeholder.svg' }]
            },
            duration: 'Permanent',
            districtId: 'district-1',
            districtName: 'Schwabing',
            participants: 78,
            startDate: '2025-05-01T00:00:00Z',
            endDate: '2025-06-01T23:59:59Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1580712647692-2230e826d76d?w=400&h=225&fit=crop',
            thumbnailAlt: 'Secret society symbols and QR codes'
          },
          {
            id: 'challenge-city-7',
            title: 'Urban Legends Tour',
            description: 'Entdecke die versteckten Geschichten und Legenden der Stadt durch interaktive Storytelling-Punkte.',
            type: 'urban_legend',
            category: 'location',
            difficulty: 'easy',
            reward: {
              xp: 300,
              tickets: [{ name: 'Museum Pass', event: 'City History Exhibition', date: '2025-05-20' }]
            },
            duration: 'Unbegrenzt',
            districtId: 'district-2',
            districtName: 'Maxvorstadt',
            brandId: 'brand-7',
            brandName: 'CityMuseum',
            brandLogo: '/placeholder.svg',
            participants: 231,
            startDate: '2025-05-05T09:00:00Z',
            endDate: '2025-06-05T18:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1528892677828-8862216dc4c4?w=400&h=225&fit=crop',
            thumbnailAlt: 'Urban legends and historical city architecture'
          },
          // New challenges based on the document
          {
            id: 'challenge-city-8',
            title: 'Eco-Hero Müllsammelaktion',
            description: 'Sammle Müll in deinem Stadtteil und dokumentiere deinen Beitrag zur Stadtsäuberung.',
            type: 'shadow_quest',
            category: 'eco',
            difficulty: 'easy',
            reward: {
              xp: 400,
              coins: 150
            },
            duration: '1 Tag',
            districtId: 'district-3',
            districtName: 'Glockenbach',
            participants: 98,
            startDate: '2025-05-20T09:00:00Z',
            endDate: '2025-05-20T18:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=225&fit=crop',
            thumbnailAlt: 'Eco-friendly waste collection and recycling'
          },
          {
            id: 'challenge-city-9',
            title: 'TikTok Viral Challenge',
            description: 'Erstelle ein virales TikTok Video mit dem Jillr Filter und erreiche mindestens 1000 Views.',
            type: 'shadow_quest',
            category: 'social',
            difficulty: 'medium',
            reward: {
              xp: 600,
              coins: 200
            },
            duration: '1 Woche',
            districtId: 'district-1',
            districtName: 'Schwabing',
            brandId: 'brand-5',
            brandName: 'TrendyMedia',
            brandLogo: '/placeholder.svg',
            participants: 256,
            startDate: '2025-05-10T00:00:00Z',
            endDate: '2025-05-17T23:59:59Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=225&fit=crop',
            thumbnailAlt: 'TikTok video creation with neon effects'
          },
          {
            id: 'challenge-city-10',
            title: 'Street Art Digital Battle',
            description: 'Hinterlasse digitale Graffiti an bestimmten Orten und überdecke die Tags anderer Teams.',
            type: 'team_battle',
            category: 'team',
            difficulty: 'medium',
            reward: {
              xp: 500,
              coins: 180
            },
            duration: '3 Tage',
            districtId: 'district-2',
            districtName: 'Maxvorstadt',
            teamId: 'team-3',
            teamName: 'Night Owls',
            participants: 147,
            startDate: '2025-05-18T12:00:00Z',
            endDate: '2025-05-21T12:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
            thumbnailAlt: 'Digital street art and graffiti with neon colors'
          },
          {
            id: 'challenge-city-11',
            title: 'CO₂-Tracker Challenge',
            description: 'Sammle 50 emissionsfreie Kilometer zu Fuß oder mit dem Rad innerhalb einer Woche.',
            type: 'shadow_quest',
            category: 'eco',
            difficulty: 'medium',
            reward: {
              xp: 450,
              products: [{ name: 'Eco-Friendly Water Bottle', image: '/placeholder.svg' }]
            },
            duration: '1 Woche',
            districtId: 'district-5',
            districtName: 'Westend',
            brandId: 'brand-6',
            brandName: 'GreenMobility',
            brandLogo: '/placeholder.svg',
            participants: 183,
            startDate: '2025-05-15T00:00:00Z',
            endDate: '2025-05-22T23:59:59Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
            thumbnailAlt: 'Eco-friendly cycling through green city environment'
          },
          {
            id: 'challenge-city-12',
            title: 'QR-Code Checkpoint Race',
            description: 'Scanne alle 5 QR-Codes in der Innenstadt so schnell wie möglich und gewinne attraktive Preise.',
            type: 'time_rush',
            category: 'location',
            difficulty: 'easy',
            reward: {
              xp: 300,
              coins: 120
            },
            duration: '2 Stunden',
            districtId: 'district-4',
            districtName: 'Haidhausen',
            participants: 201,
            startDate: '2025-05-16T14:00:00Z',
            endDate: '2025-05-16T20:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=400&h=225&fit=crop',
            thumbnailAlt: 'Person scanning QR code at urban checkpoint'
          },
          // Standortbasierte Missionen & Geofencing Challenges
          {
            id: 'challenge-city-13',
            title: 'Geofencing Arena Battle',
            description: 'Kontrolliere strategische Punkte in der Stadt und verteidige sie gegen andere Teams.',
            type: 'team_battle',
            category: 'location',
            difficulty: 'hard',
            reward: {
              xp: 800,
              coins: 300
            },
            duration: '4 Stunden',
            districtId: 'district-1',
            districtName: 'Schwabing',
            participants: 89,
            startDate: '2025-05-22T16:00:00Z',
            endDate: '2025-05-22T20:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=225&fit=crop',
            thumbnailAlt: 'GPS location tracking with city map overlay'
          },
          {
            id: 'challenge-city-14',
            title: 'Hidden Spot Discovery',
            description: 'Entdecke geheime Locations in München mit Hilfe von GPS-Koordinaten und Rätseln.',
            type: 'mystery_card',
            category: 'location',
            difficulty: 'medium',
            reward: {
              xp: 550,
              coins: 200
            },
            duration: '1 Tag',
            districtId: 'district-3',
            districtName: 'Glockenbach',
            participants: 134,
            startDate: '2025-05-25T10:00:00Z',
            endDate: '2025-05-25T22:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=225&fit=crop',
            thumbnailAlt: 'Hidden urban location with compass and map'
          },
          // Social Media & UGC Challenges
          {
            id: 'challenge-city-15',
            title: 'Instagram Story Challenge',
            description: 'Erstelle 5 kreative Instagram Stories mit München Hotspots und sammle Likes.',
            type: 'shadow_quest',
            category: 'social',
            difficulty: 'easy',
            reward: {
              xp: 400,
              coins: 150
            },
            duration: '3 Tage',
            districtId: 'district-2',
            districtName: 'Maxvorstadt',
            participants: 298,
            startDate: '2025-05-20T08:00:00Z',
            endDate: '2025-05-23T20:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=225&fit=crop',
            thumbnailAlt: 'Person creating Instagram content with smartphone'
          },
          {
            id: 'challenge-city-16',
            title: 'User Generated Content Battle',
            description: 'Teile deine besten München Moments und lass die Community darüber abstimmen.',
            type: 'team_battle',
            category: 'social',
            difficulty: 'medium',
            reward: {
              xp: 650,
              coins: 250,
              products: [{ name: 'Content Creator Kit', image: '/placeholder.svg' }]
            },
            duration: '1 Woche',
            districtId: 'district-4',
            districtName: 'Haidhausen',
            participants: 156,
            startDate: '2025-05-18T00:00:00Z',
            endDate: '2025-05-25T23:59:59Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=225&fit=crop',
            thumbnailAlt: 'User-generated content creation with social media interface'
          },
          // Team-Challenges & City Takeover Battles
          {
            id: 'challenge-city-17',
            title: 'District Domination War',
            description: 'Erobere mit deinem Team ganze Stadtteile und verteidige sie gegen Angreifer.',
            type: 'team_battle',
            category: 'team',
            difficulty: 'expert',
            reward: {
              xp: 1200,
              coins: 500,
              tickets: [{ name: 'Victory Celebration Pass', event: 'Team Championship', date: '2025-06-01' }]
            },
            duration: '7 Tage',
            districtId: 'district-5',
            districtName: 'Westend',
            participants: 78,
            startDate: '2025-05-26T12:00:00Z',
            endDate: '2025-06-02T12:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
            thumbnailAlt: 'Team battle with city skyline and strategic planning'
          },
          {
            id: 'challenge-city-18',
            title: 'Alliance Formation Quest',
            description: 'Bilde Allianzen mit anderen Teams und plant gemeinsame Strategien für die Stadtübernahme.',
            type: 'secret_society',
            category: 'team',
            difficulty: 'hard',
            reward: {
              xp: 900,
              coins: 350
            },
            duration: '5 Tage',
            districtId: 'district-1',
            districtName: 'Schwabing',
            participants: 45,
            startDate: '2025-05-28T15:00:00Z',
            endDate: '2025-06-02T15:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=225&fit=crop',
            thumbnailAlt: 'Team alliance meeting with city tactics and strategy'
          },
          // Nachhaltigkeits- & Umwelt-Challenges
          {
            id: 'challenge-city-19',
            title: 'Zero Waste Week Challenge',
            description: 'Lebe eine Woche komplett plastikfrei und dokumentiere deine nachhaltigen Alternativen.',
            type: 'shadow_quest',
            category: 'eco',
            difficulty: 'hard',
            reward: {
              xp: 750,
              coins: 300,
              products: [{ name: 'Sustainable Living Starter Kit', image: '/placeholder.svg' }]
            },
            duration: '1 Woche',
            districtId: 'district-3',
            districtName: 'Glockenbach',
            participants: 67,
            startDate: '2025-05-24T00:00:00Z',
            endDate: '2025-05-31T23:59:59Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=225&fit=crop',
            thumbnailAlt: 'Zero waste lifestyle with reusable containers and eco-friendly products'
          },
          {
            id: 'challenge-city-20',
            title: 'Urban Gardening Mission',
            description: 'Pflanze Samen in städtischen Grünflächen und verfolge ihr Wachstum über die App.',
            type: 'mystery_card',
            category: 'eco',
            difficulty: 'medium',
            reward: {
              xp: 500,
              coins: 180,
              products: [{ name: 'Organic Seed Collection', image: '/placeholder.svg' }]
            },
            duration: '2 Wochen',
            districtId: 'district-2',
            districtName: 'Maxvorstadt',
            participants: 112,
            startDate: '2025-05-15T09:00:00Z',
            endDate: '2025-05-29T18:00:00Z',
            imageUrl: '/placeholder.svg',
            thumbnailUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=225&fit=crop',
            thumbnailAlt: 'Urban gardening with plants growing in city environment'
          }
        ];

        setDistricts(mockDistricts);
        setTeams(mockTeams);
        setLeaderboard(mockLeaderboard);
        setChallenges(mockChallenges);
        setActiveChallenges(mockChallenges);
      } catch (error) {
        console.error('Failed to fetch City Clash data:', error);
        toast({
          title: "Fehler beim Laden",
          description: "City Clash Daten konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCityClashData();
  }, []);

  const filterChallenges = (query: string) => {
    if (!query.trim()) {
      setActiveChallenges(challenges);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = challenges.filter(challenge => 
      challenge.title.toLowerCase().includes(lowercaseQuery) ||
      challenge.description.toLowerCase().includes(lowercaseQuery) ||
      challenge.districtName.toLowerCase().includes(lowercaseQuery) ||
      challenge.type.toLowerCase().includes(lowercaseQuery) ||
      (challenge.category && challenge.category.toLowerCase().includes(lowercaseQuery)) ||
      (challenge.brandName && challenge.brandName.toLowerCase().includes(lowercaseQuery)) ||
      (challenge.teamName && challenge.teamName.toLowerCase().includes(lowercaseQuery))
    );
    
    setActiveChallenges(filtered);
  };

  const filterChallengesByCategory = (category: string) => {
    if (category === 'all') {
      setActiveChallenges(challenges);
      return;
    }
    
    const filtered = challenges.filter(challenge => 
      challenge.category === category
    );
    
    setActiveChallenges(filtered);
  };

  return {
    challenges,
    activeChallenges,
    districts,
    teams,
    leaderboard,
    isLoading,
    filterChallenges,
    filterChallengesByCategory
  };
};
