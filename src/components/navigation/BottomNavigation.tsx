
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Compass, Users, Map, User, Zap, ShoppingBag, Trophy,
  Video, Edit, Building
} from 'lucide-react';
import { 
  Sheet,
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
  const location = useLocation();
  
  // Hauptnavigationselemente für die untere Leiste - auf 5 Elemente beschränkt
  const mainNavItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Compass, path: '/explore', label: 'Entdecken' },
    { icon: Video, path: '/dashboard', label: 'Dashboard' },
    { icon: Map, path: '/map', label: 'Karte' },
    { icon: User, path: '/profile', label: 'Profil' }
  ];
  
  // Kategorisierte Navigation im Einklang mit der Hauptnavigation
  const categorizedItems = {
    'Entdecken': [
      { icon: Compass, path: '/explore', label: 'Entdecken' },
      { icon: Zap, path: '/feed', label: 'Feed' },
      { icon: Map, path: '/map', label: 'Live Map' },
      { icon: Building, path: '/city-clash', label: 'City Clash' },
    ],
    'Erstellen': [
      { icon: Video, path: '/dashboard', label: 'Dashboard' },
      { icon: Edit, path: '/content-editor', label: 'Content Editor' },
      { icon: Edit, path: '/challenge-editor', label: 'Challenge Editor' }
    ],
    'Community': [
      { icon: Trophy, path: '/leaderboard', label: 'Rangliste' },
      { icon: Users, path: '/creator-marketplace', label: 'Creator' },
      { icon: ShoppingBag, path: '/shop', label: 'Shop' },
    ],
    'Persönlich': [
      { icon: User, path: '/profile', label: 'Profil' },
      { icon: Home, path: '/wallet', label: 'Wallet' }
    ]
  };
  
  // Um Zustand zwischen MenuAbschnitten zu speichern
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  // Funktion zum Umschalten von Menüabschnitten
  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-jillr-darkBlue/95 backdrop-blur-xl border-t border-jillr-neonPurple/20 z-40 md:hidden shadow-lg safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        {mainNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          
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
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-jillr-neonPurple mt-1"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Kategorisiertes Menu */}
      <Sheet>
        <SheetTrigger asChild className="absolute -top-16 right-4 rounded-full shadow-lg md:hidden">
          <Button
            size="icon"
            variant="outline"
            className="bg-jillr-darkBlue/80 backdrop-blur-md border border-jillr-neonPurple/30 h-12 w-12 rounded-full shadow-glow"
          >
            <Compass size={22} className="text-jillr-neonPurple" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="bg-jillr-darkBlue/95 backdrop-blur-xl border-jillr-neonPurple/20 rounded-t-xl max-h-[85vh] h-auto">
          <div className="pt-2 pb-4">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
            <h3 className="text-lg font-semibold text-center mb-6">jillr Navigation</h3>
            
            <ScrollArea className="h-[calc(85vh-120px)]">
              {Object.keys(categorizedItems).map((category) => (
                <div key={category} className="mb-6">
                  <Button 
                    variant="ghost"
                    className="flex items-center justify-between w-full px-2 py-1 mb-2 text-sm font-medium text-white/80"
                    onClick={() => handleMenuClick(category)}
                  >
                    <span>{category}</span>
                    {activeMenu === category ? (
                      <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 180 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▲
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ rotate: 180 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▼
                      </motion.span>
                    )}
                  </Button>
                  
                  {(activeMenu === category || activeMenu === null) && (
                    <div className="grid grid-cols-4 gap-2">
                      {categorizedItems[category as keyof typeof categorizedItems].map((item) => {
                        const isItemActive = location.pathname === item.path.split('?')[0];
                        return (
                          <SheetClose asChild key={item.path}>
                            <Link 
                              to={item.path}
                              className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10"
                            >
                              <div className={`p-3 rounded-full ${isItemActive ? 'bg-jillr-neonPurple/20' : 'bg-white/5'} mb-2`}>
                                <item.icon size={20} className={isItemActive ? 'text-jillr-neonPurple' : ''} />
                              </div>
                              <span className={`text-xs text-center line-clamp-2 ${isItemActive ? 'text-jillr-neonPurple' : 'text-white'}`}>
                                {item.label}
                              </span>
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BottomNavigation;
