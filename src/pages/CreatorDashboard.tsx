
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Challenge, Product, DashboardStats } from '@/types/dashboard';
import StatCards from '@/components/dashboard/StatCards';
import ChallengesTab from '@/components/dashboard/ChallengesTab';
import ShopTab from '@/components/dashboard/ShopTab';
import StatsTab from '@/components/dashboard/StatsTab';

const CreatorDashboard = () => {
  const { user } = useAuth();
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
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch user's challenges
        const { data: challengesData, error: challengesError } = await supabase
          .from('challenges')
          .select('*')
          .eq('user_id', user.id);
          
        if (challengesError) throw challengesError;
        
        // Fetch wallet data for XP and coins
        const { data: walletData, error: walletError } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
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
        
        // Ensure challengesData is an array before processing
        const challenges = Array.isArray(challengesData) ? challengesData : [];
        
        // Add default views value of 0 for challenges that don't have it
        const challengesWithViews = challenges.map((challenge: any) => ({
          ...challenge,
          views: challenge.views || 0
        }));
        
        // Calculate totals
        const totalViews = challengesWithViews.reduce((acc: number, challenge: Challenge) => acc + (challenge.views || 0), 0);
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
  }, [user, toast]);

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h2 className="text-xl mb-4">Lade Creator-Daten...</h2>
          <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <p className="text-muted-foreground">Verwalte deine Challenges, Produkte und Statistiken</p>
        </div>
        <Link to="/challenge-builder">
          <Button className="mt-4 md:mt-0 bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
            <Video className="mr-2 h-4 w-4" /> Challenge starten
          </Button>
        </Link>
      </div>
      
      <StatCards stats={dashboardStats} />
      
      <Tabs defaultValue="challenges" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="challenges">Meine Challenges</TabsTrigger>
          <TabsTrigger value="shop">TikTok Shop</TabsTrigger>
          <TabsTrigger value="stats">Statistiken</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges">
          <ChallengesTab challenges={myChallenges} />
        </TabsContent>
        
        <TabsContent value="shop">
          <ShopTab products={products} />
        </TabsContent>
        
        <TabsContent value="stats">
          <StatsTab stats={dashboardStats} products={products} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;
