
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BarChart, Zap, Trophy, Map, ShoppingBag, Briefcase, Video, Edit
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
  
  const mainNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Dashboard', icon: BarChart, path: user?.email?.includes('brand') || user?.email?.includes('enterprise') ? '/enterprise-dashboard' : '/dashboard' },
    { name: 'Explore', icon: Zap, path: '/explore' },
    { name: 'Challenges', icon: Trophy, path: '/challenges' },
    { name: 'Live Map', icon: Map, path: '/livemap' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Brand Portal', icon: Briefcase, path: '/brand-dashboard' },
    { name: 'Creator Studio', icon: Video, path: '/creator-dashboard' },
    { name: 'Content Editor', icon: Edit, path: '/content-editor' },
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
