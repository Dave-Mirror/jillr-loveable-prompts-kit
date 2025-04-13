
import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, Zap, Award, User, LogOut, Wallet, ShoppingBag, Video } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism px-4 py-3">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold neon-text">jillr</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/explore" className="text-foreground hover:text-jillr-neonPurple transition-colors">
            Explore
          </Link>
          <Link to="/shop" className="text-foreground hover:text-jillr-neonPurple transition-colors">
            Shop
          </Link>
          {user && (
            <>
              <Link to="/creator-dashboard" className="text-foreground hover:text-jillr-neonPurple transition-colors">
                Creator Dashboard
              </Link>
              <Link to="/wallet" className="text-foreground hover:text-jillr-neonPurple transition-colors">
                Wallet
              </Link>
            </>
          )}
        </nav>
        
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
              
              <Link to="/creator-dashboard" className="w-9 h-9 flex items-center justify-center rounded-full bg-jillr-darkBlue hover:bg-jillr-neonPurple/20 transition-colors">
                <Video size={20} />
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
            <>
              <Link to="/shop" className="w-9 h-9 md:hidden flex items-center justify-center rounded-full bg-jillr-darkBlue hover:bg-jillr-neonPurple/20 transition-colors">
                <ShoppingBag size={20} />
              </Link>
              
              <Link to="/auth">
                <Button className="neon-button">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
