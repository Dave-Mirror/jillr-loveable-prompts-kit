
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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
};

type BadgeType = {
  name: string;
  xp_required: number;
  challenges_required?: number;
  challenge_type?: string;
  special?: string;
  icon_url: string;
};

export const useLeaderboard = (mockUsers: User[], badgeSystem: BadgeType[]) => {
  const [activeTab, setActiveTab] = useState('global');
  const [sortBy, setSortBy] = useState('xp');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch data from Supabase here
        // For now, we'll just simulate a delay and use our mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let sortedUsers = [...mockUsers];
        if (sortBy === 'xp') {
          sortedUsers.sort((a, b) => b.xp - a.xp);
        } else if (sortBy === 'coins') {
          sortedUsers.sort((a, b) => b.coins - a.coins);
        } else if (sortBy === 'challenges') {
          sortedUsers.sort((a, b) => b.challenges - a.challenges);
        }
        
        if (activeTab === 'city') {
          // Filter by city (simplified for demo, in a real app this would be dynamic)
          sortedUsers = sortedUsers.filter(user => ['Berlin', 'New York', 'London'].includes(user.city));
        } else if (activeTab === 'challenge-type') {
          // Filter by challenge type (simplified for demo)
          sortedUsers = sortedUsers.filter(user => ['Dance', 'Lifestyle', 'Comedy'].includes(user.challengeType));
        } else if (activeTab === 'team') {
          // Filter by team (simplified for demo)
          sortedUsers = sortedUsers.filter(user => ['Dance Crew', 'Comedy Club', 'Fitness Heroes'].includes(user.team));
        }
        
        setUsers(sortedUsers);
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
  }, [activeTab, sortBy, toast, mockUsers]);

  return {
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    users,
    isLoading,
    badgeSystem
  };
};
