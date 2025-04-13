
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BarChart, Zap, Trophy, Map, ShoppingBag, Briefcase, Video, Edit, PenLine
} from 'lucide-react';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem
} from '@/components/ui/navigation-menu';

interface MainNavigationProps {
  user: any;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ user }) => {
  const location = useLocation();
  
  // Simplified navigation items - focused only on main app features
  const mainNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Explore', icon: Zap, path: '/explore' },
    { name: 'Live Map', icon: Map, path: '/livemap' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Dashboard', icon: BarChart, path: user?.email?.includes('brand') || user?.email?.includes('enterprise') ? '/enterprise-dashboard' : '/dashboard' },
  ];

  // Special items based on user type - shown conditionally
  const specialNavItems = [
    ...(user?.email?.includes('brand') || user?.email?.includes('enterprise') ? [
      { name: 'Brand Portal', icon: Briefcase, path: '/brand-dashboard' },
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
    <NavigationMenu className="hidden md:flex ml-4">
      <NavigationMenuList className="flex gap-1">
        {mainNavItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link 
              to={item.path} 
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-white/10 ${
                location.pathname === item.path ? 'text-jillr-neonPurple border-b-2 border-jillr-neonPurple' : 'text-foreground'
              }`}
            >
              <item.icon size={16} />
              <span className="text-sm">{item.name}</span>
            </Link>
          </NavigationMenuItem>
        ))}

        {specialNavItems.length > 0 && (
          <>
            <div className="h-6 border-l border-white/10 mx-1"></div>
            {specialNavItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-white/10 ${
                    location.pathname === item.path ? 'text-jillr-neonPurple border-b-2 border-jillr-neonPurple' : 'text-foreground'
                  }`}
                >
                  <item.icon size={16} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              </NavigationMenuItem>
            ))}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
