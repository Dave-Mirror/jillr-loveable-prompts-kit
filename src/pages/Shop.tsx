
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ShoppingBag,
  Search,
  Heart,
  Tag,
  User,
  ArrowUpDown,
  ChevronDown,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Mock categories for filter
  const categories = [
    { id: 'all', name: 'Alle Produkte' },
    { id: 'clothing', name: 'Kleidung' },
    { id: 'accessories', name: 'Accessoires' },
    { id: 'digital', name: 'Digital' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        // Mock data for products (would be real API calls in production)
        const mockProducts = [
          { 
            id: '1', 
            name: 'Creator T-Shirt', 
            price: 29.99, 
            image: 'https://placehold.co/300x300/333/white?text=T-Shirt',
            category: 'clothing',
            creator: 'Creator1',
            creatorAvatar: 'https://i.pravatar.cc/150?img=1',
            sales: 122,
            likes: 45
          },
          { 
            id: '2', 
            name: 'Creator Hoodie', 
            price: 59.99, 
            image: 'https://placehold.co/300x300/333/white?text=Hoodie',
            category: 'clothing',
            creator: 'Creator2',
            creatorAvatar: 'https://i.pravatar.cc/150?img=2',
            sales: 87,
            likes: 32
          },
          { 
            id: '3', 
            name: 'Creator Cap', 
            price: 24.99, 
            image: 'https://placehold.co/300x300/333/white?text=Cap',
            category: 'accessories',
            creator: 'Creator3',
            creatorAvatar: 'https://i.pravatar.cc/150?img=3',
            sales: 153,
            likes: 58
          },
          { 
            id: '4', 
            name: 'Digital Preset Pack', 
            price: 19.99, 
            image: 'https://placehold.co/300x300/333/white?text=Presets',
            category: 'digital',
            creator: 'Creator4',
            creatorAvatar: 'https://i.pravatar.cc/150?img=4',
            sales: 210,
            likes: 95
          },
          { 
            id: '5', 
            name: 'Creator Socks', 
            price: 14.99, 
            image: 'https://placehold.co/300x300/333/white?text=Socks',
            category: 'clothing',
            creator: 'Creator5',
            creatorAvatar: 'https://i.pravatar.cc/150?img=5',
            sales: 76,
            likes: 28
          },
          { 
            id: '6', 
            name: 'Phone Case', 
            price: 22.99, 
            image: 'https://placehold.co/300x300/333/white?text=Phone+Case',
            category: 'accessories',
            creator: 'Creator1',
            creatorAvatar: 'https://i.pravatar.cc/150?img=1',
            sales: 92,
            likes: 41
          },
          { 
            id: '7', 
            name: 'Content Creation Guide', 
            price: 34.99, 
            image: 'https://placehold.co/300x300/333/white?text=Guide',
            category: 'digital',
            creator: 'Creator2',
            creatorAvatar: 'https://i.pravatar.cc/150?img=2',
            sales: 187,
            likes: 79
          },
          { 
            id: '8', 
            name: 'Creator Beanie', 
            price: 19.99, 
            image: 'https://placehold.co/300x300/333/white?text=Beanie',
            category: 'accessories',
            creator: 'Creator3',
            creatorAvatar: 'https://i.pravatar.cc/150?img=3',
            sales: 64,
            likes: 22
          }
        ];
        
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Fehler",
          description: "Die Produkte konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [toast]);

  // Apply filters and search
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (filterCategory !== 'all') {
      result = result.filter(product => product.category === filterCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.creator.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => b.sales - a.sales);
    } else if (sortBy === 'recent') {
      // For mock data we'll just use the existing order
      // In a real app, this would sort by creation date
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  }, [products, filterCategory, searchQuery, sortBy]);

  const toggleLike = (productId: string) => {
    if (!user) {
      toast({
        title: "Nicht eingeloggt",
        description: "Du musst eingeloggt sein, um Produkte zu liken.",
        variant: "destructive"
      });
      return;
    }
    
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          likes: product.isLiked ? product.likes - 1 : product.likes + 1,
          isLiked: !product.isLiked
        };
      }
      return product;
    }));
    
    toast({
      title: "Produkt geliked!",
      description: "Das Produkt wurde zu deinen Favoriten hinzugefügt.",
    });
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h2 className="text-xl mb-4">Lade Produkte...</h2>
          <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Creator Shop</h1>
          <p className="text-muted-foreground">Entdecke exklusive Produkte von deinen Lieblings-Creators</p>
        </div>
        
        {user && (
          <Link to="/creator-dashboard">
            <Button variant="outline" className="mt-4 md:mt-0">
              Zum Creator Dashboard
            </Button>
          </Link>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Nach Produkten oder Creators suchen..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category filter dropdown */}
          <div className="flex gap-2 w-full md:w-auto">
            <Select 
              value={filterCategory} 
              onValueChange={setFilterCategory}
            >
              <SelectTrigger className="w-full md:w-[180px] bg-card border border-border">
                <SelectValue placeholder="Kategorie" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border z-50">
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort dropdown */}
            <Select 
              value={sortBy} 
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-full md:w-[180px] bg-card border border-border">
                <SelectValue placeholder="Sortieren" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border z-50">
                <SelectItem value="popular">Beliebtheit</SelectItem>
                <SelectItem value="recent">Neueste</SelectItem>
                <SelectItem value="price-low">Preis: Niedrig zu Hoch</SelectItem>
                <SelectItem value="price-high">Preis: Hoch zu Niedrig</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Mobile filter button */}
            <Button variant="outline" size="icon" className="md:hidden">
              <SlidersHorizontal size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col">
              <div className="aspect-square relative overflow-hidden">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full transition-transform hover:scale-105" />
                <Badge className="absolute top-2 right-2 bg-jillr-neonGreen text-background">
                  ${product.price}
                </Badge>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 left-2 bg-background/80 hover:bg-background"
                  onClick={() => toggleLike(product.id)}
                >
                  <Heart className={`h-5 w-5 ${product.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <img src={product.creatorAvatar} alt={product.creator} className="w-5 h-5 rounded-full mr-1" />
                  {product.creator}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <Tag size={14} className="mr-1" />
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </span>
                  <span className="flex items-center">
                    <Heart size={14} className="mr-1" />
                    {product.likes}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="mt-auto">
                <Button className="w-full bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Kaufen
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-muted/20 rounded-lg">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Keine Produkte gefunden</h3>
          <p className="text-muted-foreground mb-4">Versuche es mit einem anderen Suchbegriff oder Filter.</p>
          <Button onClick={() => {
            setSearchQuery('');
            setFilterCategory('all');
            setSortBy('popular');
          }}>Filter zurücksetzen</Button>
        </div>
      )}
    </div>
  );
};

export default Shop;
