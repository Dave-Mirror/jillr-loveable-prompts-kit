import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, Trophy, Wallet, User, Map, Zap, ShoppingBag, MoreHorizontal,
  BarChart, Video, Settings, Bell, Heart, Star, Edit
} from 'lucide-react';
import { 
  Sheet,
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';

const BottomNavigation = () => {
  const location = useLocation();
  
  // Main nav items for the bottom bar - keep this limited to 5 items
  const mainNavItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Zap, path: '/explore', label: 'Entdecken' },
    { icon: ShoppingBag, path: '/shop', label: 'Shop' },
    { icon: Map, path: '/livemap', label: 'Map' },
    { icon: MoreHorizontal, path: '#more', label: 'Mehr', isMore: true }
  ];
  
  // Additional items that will be shown in the "More" menu
  // Hinzufügen aller verfügbaren Seiten mit passenden Icons
  const moreItems = [
    { icon: Trophy, path: '/leaderboard', label: 'Rangliste' },
    { icon: Wallet, path: '/wallet', label: 'Wallet' },
    { icon: User, path: '/profile', label: 'Profil' },
    { icon: Search, path: '/search', label: 'Suche' },
    { icon: BarChart, path: '/dashboard', label: 'Dashboard' },
    { icon: BarChart, path: '/brand-dashboard', label: 'Brand Portal' },
    { icon: BarChart, path: '/enterprise-dashboard', label: 'Enterprise Dashboard' },
    { icon: Video, path: '/creator-dashboard', label: 'Creator Studio' },
    { icon: Edit, path: '/challenge-editor', label: 'Challenge Editor' },
    { icon: Edit, path: '/content-editor', label: 'Content Editor' },
    { icon: Video, path: '/creator-marketplace', label: 'Creator Market' },
    { icon: Settings, path: '/settings', label: 'Einstellungen' },
    { icon: Bell, path: '/notifications', label: 'Benachrichtigungen' },
    { icon: Heart, path: '/favorites', label: 'Favoriten' }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-jillr-darkBlue/95 backdrop-blur-xl border-t border-jillr-neonPurple/20 z-40 md:hidden shadow-lg safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        {mainNavItems.map((item) => {
          const isActive = item.isMore ? false : location.pathname === item.path;
          
          // For the "More" button, render a Sheet component
          if (item.isMore) {
            return (
              <Sheet key={item.path}>
                <SheetTrigger className={`flex flex-col items-center justify-center w-full h-full transition-colors text-muted-foreground hover:text-white/80`}>
                  <item.icon size={20} />
                  <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                </SheetTrigger>
                <SheetContent side="bottom" className="bg-jillr-darkBlue/95 backdrop-blur-xl border-jillr-neonPurple/20 rounded-t-xl">
                  <div className="pt-2 pb-4">
                    <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
                    <h3 className="text-lg font-semibold text-center mb-6">Mehr Optionen</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {moreItems.map((moreItem) => {
                        const isMoreItemActive = location.pathname === moreItem.path;
                        return (
                          <Link 
                            key={moreItem.path} 
                            to={moreItem.path}
                            className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10"
                          >
                            <div className={`p-3 rounded-full ${isMoreItemActive ? 'bg-jillr-neonPurple/20' : 'bg-white/5'} mb-2`}>
                              <moreItem.icon size={24} className={isMoreItemActive ? 'text-jillr-neonPurple' : ''} />
                            </div>
                            <span className={`text-xs ${isMoreItemActive ? 'text-jillr-neonPurple' : 'text-white'}`}>
                              {moreItem.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            );
          }
          
          // For standard navigation items
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-jillr-neonPurple' : 'text-muted-foreground hover:text-white/80'
              }`}
              aria-label={item.label}
            >
              <item.icon size={20} className={isActive ? 'animate-pulse' : ''} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-jillr-neonPurple mt-1"></div>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
