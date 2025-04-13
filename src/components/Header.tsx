
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Coins, Zap, Award, User, LogOut, Wallet, ShoppingBag, 
  Video, BarChart, Trophy, Home, Map, Zap as Challenge 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';

const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  // Placeholder data, in a real app this would come from database
  const userData = {
    name: 'User',
    xp: 1250,
    coins: 780,
    level: 7,
    badges: 3
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const mainNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Dashboard', icon: BarChart, path: user?.email?.includes('brand') || user?.email?.includes('enterprise') ? '/enterprise-dashboard' : '/dashboard' },
    { name: 'Explore', icon: Zap, path: '/explore' },
    { name: 'Challenges', icon: Challenge, path: '/challenges' },
    { name: 'Live Map', icon: Map, path: '/livemap' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Wallet', icon: Wallet, path: '/wallet' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism px-4 py-3">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold neon-text">jillr</span>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {mainNavItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link 
                  to={item.path} 
                  className="flex items-center gap-2 text-foreground hover:text-jillr-neonPurple transition-colors px-3 py-2 rounded-md hover:bg-jillr-darkBlue/50"
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-jillr-darkBlue">
                <Zap size={16} className="text-jillr-neonPurple" />
                <span className="text-sm font-medium">{userData.xp} XP</span>
              </div>
              
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-jillr-darkBlue">
                <Coins size={16} className="text-jillr-neonGreen" />
                <span className="text-sm font-medium">{userData.coins}</span>
              </div>
              
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-jillr-darkBlue">
                <Award size={16} className="text-jillr-neonPink" />
                <span className="text-sm font-medium">Lvl {userData.level}</span>
              </div>
              
              <Link to="/profile" className="w-9 h-9 flex items-center justify-center rounded-full bg-jillr-darkBlue hover:bg-jillr-neonPurple/20 transition-colors">
                <User size={20} />
              </Link>
              
              <Link to="/wallet" className="w-9 h-9 flex items-center justify-center rounded-full bg-jillr-darkBlue hover:bg-jillr-neonPurple/20 transition-colors">
                <Wallet size={20} />
              </Link>
              
              {user.email?.includes('creator') && (
                <Link to="/creator-dashboard" className="w-9 h-9 flex items-center justify-center rounded-full bg-jillr-darkBlue hover:bg-jillr-neonPurple/20 transition-colors">
                  <Video size={20} />
                </Link>
              )}
              
              {(user.email?.includes('brand') || user.email?.includes('enterprise')) && (
                <Link to="/enterprise-dashboard" className="w-9 h-9 flex items-center justify-center rounded-full bg-jillr-darkBlue hover:bg-jillr-neonPurple/20 transition-colors">
                  <BarChart size={20} />
                </Link>
              )}
              
              <Link to="/leaderboard" className="w-9 h-9 flex items-center justify-center rounded-full bg-jillr-darkBlue hover:bg-jillr-neonPurple/20 transition-colors">
                <Trophy size={20} />
              </Link>
              
              <Link to="/shop" className="w-9 h-9 flex items-center justify-center rounded-full bg-jillr-darkBlue hover:bg-jillr-neonPurple/20 transition-colors">
                <ShoppingBag size={20} />
              </Link>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSignOut}
                className="hover:bg-jillr-neonPink/20"
              >
                <LogOut size={20} />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="neon-button">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
