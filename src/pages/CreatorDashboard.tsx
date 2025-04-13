
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TrendingUp, 
  Award, 
  Coins, 
  Tag, 
  Video, 
  ShoppingBag, 
  Link as LinkIcon, 
  BarChart, 
  ExternalLink,
  Clock,
  Eye,
  Heart
} from 'lucide-react';

// Define a type for challenges to fix the infinite type instantiation
type Challenge = {
  id: string;
  title: string;
  status: string;
  views?: number; // Make views optional as it might not exist in all challenges
  // Add other needed properties from the Database type
  type?: string;
  description?: string;
  coin_reward?: number;
  xp_reward?: number;
  start_date?: string;
  end_date?: string;
  hashtags?: string[];
};

// Define other types we need
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  sales: number;
  commission: number;
  trackingLink: string;
};

const CreatorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [myChallenges, setMyChallenges] = useState<Challenge[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
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
        const mockProducts = [
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
        const challengesWithViews = (challengesData || []).map((challenge: Challenge) => ({
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
  }, [user, toast]);

  const copyTrackingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link kopiert!",
      description: "Der Tracking-Link wurde in die Zwischenablage kopiert.",
    });
  };

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border-jillr-neonPurple/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Eye className="text-jillr-neonPurple" />
              Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardStats.totalViews.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Gesamtaufrufe deiner Challenges</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonGreen/20 border-jillr-neonGreen/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Award className="text-jillr-neonGreen" />
              XP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardStats.totalXp.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Gesamte Erfahrungspunkte</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPink/20 border-jillr-neonPink/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Coins className="text-jillr-neonPink" />
              Coins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{dashboardStats.totalCoins.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Verfügbare Coins</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="challenges" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="challenges">Meine Challenges</TabsTrigger>
          <TabsTrigger value="shop">TikTok Shop</TabsTrigger>
          <TabsTrigger value="stats">Statistiken</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges">
          <div className="bg-card rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-4">Meine Challenges</h2>
            
            {myChallenges.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Teilnehmer</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myChallenges.map((challenge) => (
                      <TableRow key={challenge.id}>
                        <TableCell className="font-medium">{challenge.title}</TableCell>
                        <TableCell>
                          <Badge variant={challenge.status === 'active' ? 'default' : 'outline'}>
                            {challenge.status === 'active' ? 'Aktiv' : 'Beendet'}
                          </Badge>
                        </TableCell>
                        <TableCell>{challenge.views || 0}</TableCell>
                        <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
                        <TableCell>
                          <Link to={`/challenge/${challenge.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye size={14} className="mr-1" /> Anzeigen
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center p-8 bg-muted/20 rounded-lg">
                <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Keine Challenges gefunden</h3>
                <p className="text-muted-foreground mb-4">Du hast noch keine eigenen Challenges erstellt.</p>
                <Link to="/challenge-builder">
                  <Button>Erste Challenge erstellen</Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="shop">
          <div className="bg-card rounded-lg border p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-semibold">TikTok Shop Produkte</h2>
              <Button variant="outline" className="mt-2 md:mt-0">
                <ShoppingBag size={16} className="mr-2" /> Neues Produkt
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <div className="aspect-[4/3] relative rounded-t-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                    <Badge className="absolute top-2 right-2 bg-jillr-neonGreen text-background">
                      ${product.price}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>
                      <div className="flex justify-between">
                        <span><Eye size={14} className="inline mr-1" />{Math.floor(Math.random() * 1000) + 100}</span>
                        <span><Heart size={14} className="inline mr-1" />{Math.floor(Math.random() * 100) + 10}</span>
                        <span><ShoppingBag size={14} className="inline mr-1" />{product.sales}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-2">
                      <span className="text-muted-foreground">Tracking-Link:</span>
                      <div className="flex mt-1">
                        <input 
                          type="text" 
                          value={product.trackingLink} 
                          readOnly 
                          className="flex-1 px-3 py-1 text-xs rounded-l-md bg-muted"
                        />
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-l-none"
                          onClick={() => copyTrackingLink(product.trackingLink)}
                        >
                          <LinkIcon size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex justify-between items-center w-full text-sm">
                      <span><span className="text-muted-foreground">Provision:</span> ${(product.commission * product.sales).toFixed(2)}</span>
                      <Button size="sm" variant="ghost" className="p-0">
                        <ExternalLink size={14} className="mr-1" /> TikTok Shop
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <LinkIcon className="text-jillr-neonPurple" size={18} />
                  Link-Klicks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dashboardStats.totalLinkClicks.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Alle Affiliate-Links</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShoppingBag className="text-jillr-neonGreen" size={18} />
                  Verkäufe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{dashboardStats.totalSales.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Alle Produkte</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="text-jillr-neonPink" size={18} />
                  Provision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${dashboardStats.totalCommission.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <p className="text-sm text-muted-foreground">Verdiente Provision</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-card rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-4">Affiliate-Link Performance</h2>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produkt</TableHead>
                    <TableHead>Klicks</TableHead>
                    <TableHead>Conversion</TableHead>
                    <TableHead>Verkäufe</TableHead>
                    <TableHead>Provision</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{Math.floor(Math.random() * 100) + 50}</TableCell>
                      <TableCell>{(Math.random() * 5 + 2).toFixed(1)}%</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>${(product.commission * product.sales).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;
