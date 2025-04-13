
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BarChart, Zap, Trophy, Map, ShoppingBag, 
  Wallet, Video, LogOut, Menu, Coins, Award, Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileMenuProps {
  user: any;
  userProfile: any;
  onSignOut: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, userProfile, onSignOut }) => {
  const location = useLocation();
  
  const mainNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Dashboard', icon: BarChart, path: user?.email?.includes('brand') || user?.email?.includes('enterprise') ? '/enterprise-dashboard' : '/dashboard' },
    { name: 'Explore', icon: Zap, path: '/explore' },
    { name: 'Challenges', icon: Trophy, path: '/challenges' },
    { name: 'Live Map', icon: Map, path: '/livemap' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Content Editor', icon: Edit, path: '/content-editor' },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-white/10">
          <Menu size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-jillr-darkBlue/95 backdrop-blur-xl border-jillr-neonPurple/20">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold neon-text">jillr</span>
          </div>
          
          {/* User Stats - Mobile */}
          <div className="flex justify-between gap-2 mb-8">
            <div className="flex-1 items-center gap-1 px-2 py-3 rounded-lg bg-jillr-dark/70 flex flex-col">
              <Zap size={20} className="text-jillr-neonPurple" />
              <span className="text-sm font-medium">{userProfile?.xp || 0} XP</span>
            </div>
            
            <div className="flex-1 items-center gap-1 px-2 py-3 rounded-lg bg-jillr-dark/70 flex flex-col">
              <Coins size={20} className="text-jillr-neonGreen" />
              <span className="text-sm font-medium">{userProfile?.coins || 0}</span>
            </div>
            
            <div className="flex-1 items-center gap-1 px-2 py-3 rounded-lg bg-jillr-dark/70 flex flex-col">
              <Award size={20} className="text-jillr-neonPink" />
              <span className="text-sm font-medium">Lvl {userProfile?.level || 1}</span>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <nav className="space-y-1 flex-1">
            {mainNavItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-jillr-dark text-jillr-neonPurple' 
                    : 'hover:bg-jillr-dark/50'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <Link 
              to="/wallet" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-jillr-dark/50"
            >
              <Wallet size={20} />
              <span>Wallet</span>
            </Link>
            
            {user?.email?.includes('creator') && (
              <Link 
                to="/creator-dashboard" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-jillr-dark/50"
              >
                <Video size={20} />
                <span>Creator Studio</span>
              </Link>
            )}
            
            {(user?.email?.includes('brand') || user?.email?.includes('enterprise')) && (
              <Link 
                to="/enterprise-dashboard" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-jillr-dark/50"
              >
                <BarChart size={20} />
                <span>Enterprise Dashboard</span>
              </Link>
            )}
          </nav>
          
          {/* Logout Button */}
          <button 
            onClick={onSignOut}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-jillr-neonPink hover:bg-jillr-dark/50"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
