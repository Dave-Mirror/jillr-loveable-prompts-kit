
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Compass, Zap, Trophy, Map, ShoppingBag, 
  Wallet, Video, LogOut, Menu, Coins, Award, Edit, 
  User, Settings, Users, Building
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
  
  // Bestimme die Rolle des Benutzers
  const userRole = getUserRole(userProfile);
  
  // Hole die rollenspezifischen Menüpunkte
  const mainNavItems = getNavItemsForRole(userRole);

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

// Bestimmt die Rolle des Benutzers basierend auf dem Profil
function getUserRole(userProfile: any): 'user' | 'creator' | 'brand' | 'enterprise' {
  if (!userProfile) return 'user';
  
  if (userProfile.isEnterprise) return 'enterprise';
  if (userProfile.email?.includes('brand') || userProfile.accountType === 'brand') return 'brand';
  if (userProfile.isCreator) return 'creator';
  
  return 'user';
}

// Gibt rollenspezifische Navigationsitems zurück
function getNavItemsForRole(role: string) {
  // Basis-Navigation für alle Benutzerrollen
  const navItems = [
    { 
      category: 'Entdecken', 
      items: [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Explore', icon: Compass, path: '/explore' },
        { name: 'Feed', icon: Zap, path: '/feed' },
        { name: 'Live Map', icon: Map, path: '/map' },
        { name: 'City Clash', icon: Building, path: '/city-clash' },
      ]
    },
    { 
      category: 'Community', 
      items: [
        { name: 'Leaderboard', icon: Award, path: '/leaderboard' },
        { name: 'Creator', icon: Users, path: '/creator-marketplace' },
        { name: 'Shop', icon: ShoppingBag, path: '/shop' },
      ]
    },
    { 
      category: 'Persönlich', 
      items: [
        { name: 'Profil', icon: User, path: '/profile' },
        { name: 'Wallet', icon: Wallet, path: '/wallet' },
        { name: 'Einstellungen', icon: Settings, path: '/settings' },
      ]
    }
  ];

  // Füge rollenspezifische Menüpunkte hinzu
  if (role === 'creator' || role === 'brand' || role === 'enterprise') {
    navItems.splice(1, 0, {
      category: 'Erstellen',
      items: [
        { name: 'Dashboard', icon: Video, path: '/dashboard' },
        { name: 'Content Editor', icon: Edit, path: '/content-editor' },
        { name: 'Challenge Editor', icon: Edit, path: '/challenge-editor' },
      ]
    });
  }

  // Spezielle Menüpunkte für Brands und Enterprises
  if (role === 'brand' || role === 'enterprise') {
    navItems.splice(2, 0, {
      category: 'Marketing',
      items: [
        { name: 'Hypocampus', icon: Zap, path: '/hypocampus' },
        { name: 'Trigger Management', icon: Zap, path: '/trigger-management' },
      ]
    });
  }

  return navItems;
}

export default MobileMenu;
