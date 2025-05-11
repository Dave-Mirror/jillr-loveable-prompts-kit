
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Define types for City Clash data
export interface CityChallenge {
  id: string;
  title: string;
  description: string;
  type: 'time_rush' | 'team_battle' | 'digital_heist' | 'mystery_card' | 'shadow_quest' | 'secret_society' | 'urban_legend';
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
        
        // Mock data for challenges
        const mockChallenges: CityChallenge[] = [
          {
            id: 'challenge-city-1',
            title: 'Urban Sprint Challenge',
            description: 'Erreiche 5 Checkpoints in der Stadt so schnell wie möglich und gewinne exklusive Sneakers.',
            type: 'time_rush',
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
            imageUrl: '/placeholder.svg'
          },
          {
            id: 'challenge-city-2',
            title: 'The Vault - Codeknacker Challenge',
            description: 'Finde alle Hinweise in der Stadt und knacke den Code des digitalen Tresors für exklusive Rewards.',
            type: 'digital_heist',
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
            imageUrl: '/placeholder.svg'
          },
          {
            id: 'challenge-city-3',
            title: 'Nightlife XP - Club Expedition',
            description: 'Besuche 3 teilnehmende Clubs und sammle Punkte für Freigetränke und VIP-Zugang.',
            type: 'shadow_quest',
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
            imageUrl: '/placeholder.svg'
          },
          {
            id: 'challenge-city-4',
            title: 'Mystery Card Collection',
            description: 'Sammle alle 5 Kartenteile in verschiedenen Stores der Stadt und gewinne limitierte Trading Cards.',
            type: 'mystery_card',
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
            imageUrl: '/placeholder.svg'
          },
          {
            id: 'challenge-city-5',
            title: 'Team Territory Battle',
            description: 'Kämpfe mit deinem Team um die Kontrolle über Westend und gewinne exklusive Team-Rewards.',
            type: 'team_battle',
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
            imageUrl: '/placeholder.svg'
          },
          {
            id: 'challenge-city-6',
            title: 'Secret Society Initiation',
            description: 'Finde die geheimen QR-Codes in der Stadt und erhalte Zugang zur exklusiven Secret Society.',
            type: 'secret_society',
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
            imageUrl: '/placeholder.svg'
          },
          {
            id: 'challenge-city-7',
            title: 'Urban Legends Tour',
            description: 'Entdecke die versteckten Geschichten und Legenden der Stadt durch interaktive Storytelling-Punkte.',
            type: 'urban_legend',
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
            imageUrl: '/placeholder.svg'
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
      (challenge.brandName && challenge.brandName.toLowerCase().includes(lowercaseQuery)) ||
      (challenge.teamName && challenge.teamName.toLowerCase().includes(lowercaseQuery))
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
    filterChallenges
  };
};
