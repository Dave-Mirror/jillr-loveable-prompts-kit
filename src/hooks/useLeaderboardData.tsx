
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { calculateRankChange, determineBadgeTier, isInTopPercentage } from '@/components/wallet/WalletUtils';

type User = {
  id: string;
  username: string;
  avatarUrl: string;
  xp: number;
  coins: number;
  challenges: number;
  city: string;
  team: string;
  challengeType: string;
  level: number;
  badges: string[];
  previousRank?: number;
  rankChange?: number;
};

type BadgeType = {
  name: string;
  xp_required: number;
  challenges_required?: number;
  challenge_type?: string;
  special?: string;
  icon_url: string;
};

export const useLeaderboardData = (
  mockUsers: User[], 
  badgeSystem: BadgeType[]
) => {
  const [activeTab, setActiveTab] = useState('global');
  const [sortBy, setSortBy] = useState('xp');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState('all-time'); // 'all-time', 'weekly', 'monthly'
  const [badgeFilter, setBadgeFilter] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedChallengeType, setSelectedChallengeType] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Apply previous rank data for calculating change (in a real app, this would be stored)
        const usersWithRankChanges = mockUsers.map((user, index) => ({
          ...user,
          previousRank: user.previousRank || index + Math.floor(Math.random() * 5) - 2, 
        }));
        
        let sortedUsers = [...usersWithRankChanges];
        if (sortBy === 'xp') {
          sortedUsers.sort((a, b) => b.xp - a.xp);
        } else if (sortBy === 'coins') {
          sortedUsers.sort((a, b) => b.coins - a.coins);
        } else if (sortBy === 'challenges') {
          sortedUsers.sort((a, b) => b.challenges - a.challenges);
        }
        
        // Apply filters based on active tab
        if (activeTab === 'city' && selectedCity) {
          sortedUsers = sortedUsers.filter(user => user.city === selectedCity);
        } else if (activeTab === 'challenge-type' && selectedChallengeType) {
          sortedUsers = sortedUsers.filter(user => user.challengeType === selectedChallengeType);
        } else if (activeTab === 'team' && selectedTeam) {
          sortedUsers = sortedUsers.filter(user => user.team === selectedTeam);
        }
        
        // Apply badge filter if selected
        if (badgeFilter) {
          sortedUsers = sortedUsers.filter(user => user.badges.includes(badgeFilter));
        }
        
        // Calculate rank changes
        const finalUsers = sortedUsers.map((user, index) => {
          const currentRank = index + 1;
          return {
            ...user,
            rankChange: user.previousRank ? calculateRankChange(user.previousRank, currentRank) : 0
          };
        });
        
        setUsers(finalUsers);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        toast({
          title: "Error",
          description: "Fehler beim Laden des Leaderboards.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboardData();
  }, [activeTab, sortBy, badgeFilter, selectedTeam, selectedCity, selectedChallengeType, timeFrame, toast, mockUsers]);

  // Get unique values for filters
  const cities = Array.from(new Set(mockUsers.map(user => user.city)));
  const challengeTypes = Array.from(new Set(mockUsers.map(user => user.challengeType)));
  const teams = Array.from(new Set(mockUsers.map(user => user.team)));
  const badgeList = Array.from(new Set(mockUsers.flatMap(user => user.badges)));

  return {
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    users,
    isLoading,
    badgeSystem,
    timeFrame,
    setTimeFrame,
    badgeFilter,
    setBadgeFilter,
    selectedTeam,
    setSelectedTeam,
    selectedCity,
    setSelectedCity,
    selectedChallengeType,
    setSelectedChallengeType,
    cities,
    challengeTypes,
    teams,
    badgeList,
    // Helper functions
    determineBadgeTier,
    isInTopPercentage,
  };
};
