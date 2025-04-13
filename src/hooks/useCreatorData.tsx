
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Challenge, Product, DashboardStats } from '@/types/dashboard';

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
      if (!userId) return;
      
      try {
        setIsLoading(true);
        
        // Fetch user's challenges
        const { data, error: challengesError } = await supabase
          .from('challenges')
          .select('*')
          .eq('user_id', userId);
          
        if (challengesError) throw challengesError;
        
        // Use type assertion to avoid deep type instantiation
        const challengesData = data as Challenge[] || [];
        
        // Fetch wallet data for XP and coins
        const { data: walletData, error: walletError } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
          
        if (walletError && walletError.code !== 'PGRST116') throw walletError;
        
        // Mock data for products and affiliate stats (would be real API calls in production)
        const mockProducts: Product[] = [
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
        
        setProducts(mockProducts);
        
        // Add default views value of 0 for challenges that don't have it
        const challengesWithViews = challengesData.map((challenge: Challenge) => ({
          ...challenge,
          views: challenge.views || 0
        }));
        
        // Calculate totals
        const totalViews = challengesWithViews.reduce((acc, challenge) => acc + (challenge.views || 0), 0);
        const totalLinkClicks = 250; // Mock data
        const totalSales = mockProducts.reduce((acc, product) => acc + product.sales, 0);
        const totalCommission = mockProducts.reduce((acc, product) => acc + (product.commission * product.sales), 0);
        
        setMyChallenges(challengesWithViews);
        setDashboardStats({
          totalViews,
          totalXp: walletData?.xp_total || 0,
          totalCoins: walletData?.coins_total || 0,
          totalLinkClicks,
          totalSales,
          totalCommission
        });
      } catch (error) {
        console.error('Error fetching creator data:', error);
        toast({
          title: "Fehler",
          description: "Deine Daten konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCreatorData();
  }, [userId, toast]);

  return { myChallenges, products, dashboardStats, isLoading };
};
