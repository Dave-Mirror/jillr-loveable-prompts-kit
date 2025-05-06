
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActiveChallengesTab from '../challenge-tabs/ActiveChallengesTab';
import CompletedChallengesTab from '../challenge-tabs/CompletedChallengesTab';
import PendingChallengesTab from '../challenge-tabs/PendingChallengesTab';
import { useToast } from '@/hooks/use-toast';
import { ActiveChallenge, CompletedChallenge } from '../challenge-tabs/types';

interface ChallengesTabProps {
  userProfile: any;
  isOwnProfile: boolean;
}

const ChallengesTab: React.FC<ChallengesTabProps> = ({ userProfile, isOwnProfile }) => {
  const { toast } = useToast();
  const [activeChallenges, setActiveChallenges] = useState<ActiveChallenge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<CompletedChallenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        // In a real app, fetch from API
        // Mock data for demonstration
        setActiveChallenges([
          {
            id: 'c1',
            title: 'Spring Style Refresh',
            brand: 'TrendOn Clothing',
            deadline: '3 days left',
            xpReward: 250,
            coinReward: 100,
            progress: 80,
            status: 'in_progress'
          },
          {
            id: 'c2',
            title: 'Fitness Challenge',
            brand: 'GymLite',
            deadline: '5 days left',
            xpReward: 300,
            coinReward: 150,
            progress: 30,
            status: 'in_progress'
          },
          {
            id: 'c3',
            title: 'VIP Access Event',
            brand: 'Music Festival',
            deadline: '2 days left',
            xpReward: 500,
            coinReward: 250,
            progress: 0,
            status: 'not_started'
          }
        ]);
        
        setCompletedChallenges([
          {
            id: 'c4',
            title: 'Summer Lookbook',
            brand: 'Fashion Brand',
            completedDate: 'April 15, 2023',
            xpEarned: 250,
            coinsEarned: 100,
            views: 2350,
            likes: 542
          },
          {
            id: 'c5',
            title: 'Gaming Setup Tour',
            brand: 'GameStation',
            completedDate: 'March 22, 2023',
            xpEarned: 300,
            coinsEarned: 150,
            views: 4500,
            likes: 875
          }
        ]);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        toast({
          title: 'Error loading challenges',
          description: 'Please try again later',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [toast, userProfile.id]);

  return (
    <Tabs defaultValue="active">
      <TabsList className="w-full grid grid-cols-3 mb-6">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active">
        <ActiveChallengesTab activeChallenges={activeChallenges} />
      </TabsContent>
      
      <TabsContent value="completed">
        <CompletedChallengesTab completedChallenges={completedChallenges} />
      </TabsContent>
      
      <TabsContent value="pending">
        <PendingChallengesTab />
      </TabsContent>
    </Tabs>
  );
};

export default ChallengesTab;
