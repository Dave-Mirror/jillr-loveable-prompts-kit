
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Zap, Trophy, Map, ShoppingBag, Menu, Compass, Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface GuestMobileMenuProps {
  mainNavItems: NavItem[];
}

const GuestMobileMenu: React.FC<GuestMobileMenuProps> = ({ mainNavItems }) => {
  const location = useLocation();
  
  // Simplified navigation for guests
  const guestNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Explore', icon: Zap, path: '/explore' },
    { name: 'Feed', icon: Compass, path: '/feed' },
    { name: 'Live Map', icon: Map, path: '/map' },
    { name: 'City Clash', icon: Building, path: '/city-clash' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' }
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
          
          {/* Mobile Navigation */}
          <nav className="space-y-1">
            {guestNavItems.map((item) => (
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
          
          <div className="mt-auto">
            <Link to="/auth" className="w-full">
              <Button className="w-full mt-6 bg-jillr-neonPurple hover:bg-jillr-neonPurple/80 text-white">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default GuestMobileMenu;
