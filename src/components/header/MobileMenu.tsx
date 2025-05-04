
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BarChart, Zap, Trophy, Map, ShoppingBag, 
  Wallet, Video, LogOut, Menu, Coins, Award, Edit, PenLine,
  User, Settings, Bell, Heart, Star
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
  
  // Main navigation items - grouped by category
  const mainNavItems = [
    { category: 'Hauptnavigation', items: [
      { name: 'Home', icon: Home, path: '/' },
      { name: 'Explore', icon: Zap, path: '/explore' },
      { name: 'Live Map', icon: Map, path: '/livemap' },
      { name: 'Shop', icon: ShoppingBag, path: '/shop' },
      { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' }
    ]},
    { category: 'Persönlich', items: [
      { name: 'Wallet', icon: Wallet, path: '/wallet' },
      { name: 'Profil', icon: User, path: '/profile' },
      { name: 'Dashboard', icon: BarChart, path: '/dashboard' },
      { name: 'Einstellungen', icon: Settings, path: '/settings' },
      { name: 'Favoriten', icon: Heart, path: '/favorites' }
    ]}
  ];

  // Special items based on user type
  const specialNavItems = [
    ...(user?.email?.includes('brand') || user?.email?.includes('enterprise') ? [
      { name: 'Brand Portal', icon: BarChart, path: '/brand-dashboard' },
      { name: 'Challenge Builder', icon: PenLine, path: '/challenge-builder' },
    ] : []),
    ...(user ? [
      { name: 'Content Editor', icon: Edit, path: '/content-editor' },
    ] : []),
    ...(user?.email?.includes('creator') ? [
      { name: 'Creator Studio', icon: Video, path: '/creator-dashboard' },
    ] : []),
    ...(user?.email?.includes('admin') ? [
      { name: 'Challenge Editor', icon: Edit, path: '/challenge-editor' },
    ] : []),
  ];

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-white/10">
          <Menu size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-jillr-darkBlue/95 backdrop-blur-xl border-jillr-neonPurple/20">
        <div className="flex flex-col h-full overflow-y-auto pb-safe">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="text-xl font-bold neon-text">jillr</Link>
          </div>
          
          {/* User Stats - Mobile */}
          <div className="flex justify-between gap-2 mb-6">
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
          
          {/* Mobile Navigation - Grouped by category */}
          {mainNavItems.map((group) => (
            <div className="space-y-2 mb-6" key={group.category}>
              <p className="text-xs uppercase text-white/50 mx-1 mt-2">{group.category}</p>
              <nav className="space-y-1">
                {group.items.map((item) => (
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
              </nav>
            </div>
          ))}
          
          {/* Special Navigation Items */}
          {specialNavItems.length > 0 && (
            <div className="space-y-2 mt-4">
              <p className="text-xs uppercase text-white/50 mx-1 mt-2">Spezialfunktionen</p>
              <nav className="space-y-1">
                {specialNavItems.map((item) => (
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
              </nav>
            </div>
          )}
          
          {/* Logout Button */}
          <button 
            onClick={onSignOut}
            className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-jillr-neonPink hover:bg-jillr-dark/50"
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
