
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Compass, Zap, Trophy, Map, ShoppingBag, Briefcase, Video, Edit, 
  ChevronDown, Wallet, User, Bell, Database, Settings
} from 'lucide-react';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainNavigationProps {
  user: any;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ user }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Primary navigation items - always visible
  const primaryNavItems = [
    { name: 'Home', icon: Home, path: '/', description: 'Startseite mit aktuellen Challenges' },
    { name: 'Entdecken', icon: Zap, path: '/explore', description: 'Neue Challenges und Trends entdecken' },
    { name: 'Feed', icon: Compass, path: '/challenge-feed', description: 'Content von der Community' },
    { name: 'Live Map', icon: Map, path: '/livemap', description: 'Challenges in deiner Nähe' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop', description: 'Prämien und Produkte' },
  ];
  
  // User section navigation items
  const userNavItems = [
    { name: 'Profil', icon: User, path: '/profile', description: 'Dein persönliches Profil' },
    { name: 'Wallet', icon: Wallet, path: '/wallet', description: 'Deine Belohnungen und Punkte' },
    { name: 'Rangliste', icon: Trophy, path: '/leaderboard', description: 'Community-Bestenliste' },
  ];

  // Feature section navigation items
  const featureNavItems = [
    { name: 'Challenge Explorer', icon: Compass, path: '/dashboard', description: 'Alle verfügbaren Challenges' },
    { name: 'Meine Daten', icon: Database, path: '/profile?tab=data', description: 'Datenschutz & Einstellungen' },
    { name: 'Benachrichtigungen', icon: Bell, path: '/notifications', description: 'Deine Nachrichten' },
    { name: 'Einstellungen', icon: Settings, path: '/settings', description: 'App-Einstellungen' },
  ];

  // Special items based on user type
  const specialNavItems = [
    ...(user?.email?.includes('brand') ? [
      { name: 'Brand Portal', icon: Briefcase, path: '/brand-dashboard', description: 'Marken-Dashboard und Analytics' },
    ] : []),
    ...(user ? [
      { name: 'Content Editor', icon: Edit, path: '/content-editor', description: 'Inhalte erstellen und bearbeiten' },
    ] : []),
    ...(user?.email?.includes('creator') ? [
      { name: 'Creator Studio', icon: Video, path: '/creator-dashboard', description: 'Creator Tools und Dashboard' },
    ] : []),
    ...(user?.email?.includes('admin') ? [
      { name: 'Challenge Editor', icon: Edit, path: '/challenge-editor', description: 'Challenges erstellen und verwalten' },
    ] : []),
  ];

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    // For paths with query parameters, only check the base path
    const currentPath = location.pathname;
    if (path.includes('?')) {
      return currentPath === path.split('?')[0];
    }
    return currentPath === path;
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex items-center gap-1">
        {/* Primary navigation items */}
        {primaryNavItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link to={item.path} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-1.5 px-3 py-2 h-9",
                  isActivePath(item.path) 
                    ? "bg-jillr-neonPurple/20 text-jillr-neonPurple data-[state=open]:bg-jillr-neonPurple/20" 
                    : "hover:bg-white/10"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        
        {/* User Section Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1.5 px-3 py-2 h-9 hover:bg-white/10">
            <User className="w-4 h-4" />
            <span>Konto</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-jillr-darkBlue border-jillr-neonPurple/20">
            <ul className="grid gap-2 p-4 w-[220px]">
              {userNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 hover:bg-jillr-neonPurple/10",
                      isActivePath(item.path) && "bg-jillr-neonPurple/20"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-jillr-neonPurple" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <p className="line-clamp-1 text-xs text-white/70">
                      {item.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Features Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1.5 px-3 py-2 h-9 hover:bg-white/10">
            <Compass className="w-4 h-4" />
            <span>Features</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-jillr-darkBlue border-jillr-neonPurple/20">
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] md:grid-cols-2">
              {featureNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block select-none space-y-1 rounded-md p-3 hover:bg-jillr-neonPurple/10"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-jillr-neonPurple" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <p className="line-clamp-1 text-xs text-white/70">
                      {item.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Special Functions Dropdown - only visible when there are special items */}
        {specialNavItems.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-1.5 px-3 py-2 h-9 hover:bg-white/10">
              <Briefcase className="w-4 h-4" />
              <span>Speziell</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-jillr-darkBlue border-jillr-neonPurple/20">
              <ul className="grid gap-2 p-4 w-[220px]">
                {specialNavItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-jillr-neonPurple/10"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-jillr-neonPurple" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <p className="line-clamp-1 text-xs text-white/70">
                        {item.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
