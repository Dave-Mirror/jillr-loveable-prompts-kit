
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Challenge, Product, DashboardStats } from '@/types/dashboard';
import { isValidData } from '@/utils/challenge/database-types';

interface UseCreatorDataResult {
  myChallenges: Challenge[];
  products: Product[];
  dashboardStats: DashboardStats;
  isLoading: boolean;
}

export const useCreatorData = (userId: string | undefined): UseCreatorDataResult => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [myChallenges, setMyChallenges] = useState<Challenge[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalViews: 0,
    totalXp: 0,
    totalCoins: 0,
    totalLinkClicks: 0,
    totalSales: 0,
    totalCommission: 0
  });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        setIsLoading(true);
        
        let challenges: Challenge[] = [];
        
        // If a user is logged in, try to load real data
        if (userId && userId !== 'demo-user') {
          try {
            // Fetch user's challenges
            const { data: challengesData, error: challengesError } = await supabase
              .from('challenges')
              .select('*')
              .eq('user_id', userId);
              
            if (challengesError) throw challengesError;
            
            // Convert to properly typed challenges array
            if (Array.isArray(challengesData)) {
              challengesData.forEach(item => {
                if (item) { // Check if item exists
                  challenges.push({
                    id: item.id,
                    title: item.title,
                    status: item.status || 'active',
                    type: item.type,
                    description: item.description,
                    coin_reward: item.coin_reward,
                    xp_reward: item.xp_reward,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    hashtags: item.hashtags,
                    views: 0 // Set a default value for views since it's not in the database
                  });
                }
              });
            }
            
            // Fetch wallet data for XP and coins
            const { data: walletData, error: walletError } = await supabase
              .from('wallets')
              .select('*')
              .eq('user_id', userId)
              .maybeSingle();
              
            if (walletError && walletError.code !== 'PGRST116') throw walletError;
            
            // Calculate total views from uploads table instead of challenges
            const { data: uploadsData, error: uploadsError } = await supabase
              .from('uploads')
              .select('challenge_id, views')
              .in('challenge_id', challenges.map(c => c.id));
              
            if (uploadsError) throw uploadsError;
            
            // Create a map to track views per challenge
            const viewsByChallenge = new Map<string, number>();
            
            if (Array.isArray(uploadsData)) {
              uploadsData.forEach(upload => {
                if (upload && upload.challenge_id) {
                  const challengeId = upload.challenge_id;
                  const views = upload.views || 0;
                  
                  if (viewsByChallenge.has(challengeId)) {
                    viewsByChallenge.set(challengeId, (viewsByChallenge.get(challengeId) || 0) + views);
                  } else {
                    viewsByChallenge.set(challengeId, views);
                  }
                }
              });
            }
            
            // Update challenges with view counts
            const challengesWithViews = challenges.map((challenge) => ({
              ...challenge,
              views: viewsByChallenge.get(challenge.id) || 0
            }));
            
            challenges = challengesWithViews;
            
            // Calculate totals
            const totalViews = Array.from(viewsByChallenge.values()).reduce((sum, views) => sum + views, 0);
            const totalXp = walletData?.xp_total || 0;
            const totalCoins = walletData?.coins_total || 0;
            
            setDashboardStats(prevStats => ({
              ...prevStats,
              totalViews,
              totalXp,
              totalCoins
            }));
          } catch (error) {
            console.error('Error fetching real data:', error);
            // Fall back to demo data if there's an error
            challenges = getDemoChallenges();
            setDemoDashboardStats();
          }
        } else {
          // Demo data for non-authenticated users
          challenges = getDemoChallenges();
          setDemoDashboardStats();
        }
        
        setMyChallenges(challenges);
        setProducts(getMockProducts());
      } catch (error) {
        console.error('Error fetching creator data:', error);
        toast({
          title: "Fehler",
          description: "Deine Daten konnten nicht geladen werden.",
          variant: "destructive"
        });
        
        // Set demo data as fallback
        setMyChallenges(getDemoChallenges());
        setDemoDashboardStats();
        setProducts(getMockProducts());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCreatorData();
  }, [userId, toast]);

  const getDemoChallenges = (): Challenge[] => {
    return [
      {
        id: 'demo-1',
        title: 'Tanz-Challenge',
        status: 'active',
        type: 'dance',
        description: 'Zeige deine besten Tanzschritte zu diesem Song!',
        coin_reward: 200,
        xp_reward: 500,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        hashtags: ['tanzen', 'viral', 'musik'],
        views: 4256
      },
      {
        id: 'demo-2',
        title: 'Makeup Tutorial',
        status: 'active',
        type: 'tutorial',
        description: 'Teile dein Lieblings-Makeup Tutorial!',
        coin_reward: 150,
        xp_reward: 300,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        hashtags: ['beauty', 'makeup', 'tutorial'],
        views: 2189
      },
      {
        id: 'demo-3',
        title: 'Fitness Challenge',
        status: 'active',
        type: 'fitness',
        description: 'Zeige deine beste Workout-Routine!',
        coin_reward: 250,
        xp_reward: 600,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        hashtags: ['fitness', 'workout', 'gesundheit'],
        views: 3452
      }
    ];
  };

  const setDemoDashboardStats = () => {
    setDashboardStats({
      totalViews: 9897,
      totalXp: 4580,
      totalCoins: 1250,
      totalLinkClicks: 250,
      totalSales: 35,
      totalCommission: 350.75
    });
  };

  const getMockProducts = (): Product[] => {
    return [
      { 
        id: '1', 
        name: 'Creator T-Shirt', 
        price: 29.99, 
        image: 'https://placehold.co/300x300/333/white?text=T-Shirt',
        sales: 12,
        commission: 5.99,
        trackingLink: 'https://rebrandly.com/creator-tshirt'
      },
      { 
        id: '2', 
        name: 'Creator Hoodie', 
        price: 59.99, 
        image: 'https://placehold.co/300x300/333/white?text=Hoodie',
        sales: 8,
        commission: 11.99,
        trackingLink: 'https://rebrandly.com/creator-hoodie'
      },
      { 
        id: '3', 
        name: 'Creator Cap', 
        price: 24.99, 
        image: 'https://placehold.co/300x300/333/white?text=Cap',
        sales: 15,
        commission: 4.99,
        trackingLink: 'https://rebrandly.com/creator-cap'
      }
    ];
  };

  return { myChallenges, products, dashboardStats, isLoading };
};
