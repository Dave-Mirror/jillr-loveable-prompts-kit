
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Compass, Zap, Trophy, Map, ShoppingBag, Briefcase, Video, Edit, 
  ChevronDown, Wallet, User, MoreHorizontal
} from 'lucide-react';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem
} from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

interface MainNavigationProps {
  user: any;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ user }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Primary navigation items - always visible
  const primaryNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Explore', icon: Zap, path: '/explore' },
    { name: 'Feed', icon: Compass, path: '/challenge-feed' },
    { name: 'Live Map', icon: Map, path: '/livemap' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
  ];
  
  // Secondary navigation items - visible on larger screens or in dropdown
  const secondaryNavItems = [
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Wallet', icon: Wallet, path: '/wallet' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Challenge Explorer', icon: Compass, path: '/dashboard' },
  ];

  // Special items based on user type - shown in dropdown
  const specialNavItems = [
    ...(user?.email?.includes('brand') ? [
      { name: 'Brand Portal', icon: Briefcase, path: '/brand-dashboard' },
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

  const renderNavItem = (item: { name: string; icon: React.ElementType; path: string }) => (
    <NavigationMenuItem key={item.path}>
      <Link 
        to={item.path} 
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-white/10 ${
          location.pathname === item.path ? 'text-jillr-neonPurple border-b-2 border-jillr-neonPurple' : 'text-foreground'
        }`}
      >
        <item.icon size={16} />
        <span className={isMobile ? "sr-only" : "text-sm"}>{item.name}</span>
      </Link>
    </NavigationMenuItem>
  );

  return (
    <NavigationMenu className="hidden md:flex ml-4">
      <NavigationMenuList className="flex flex-wrap gap-1">
        {/* Primary navigation items - always visible */}
        {primaryNavItems.map(renderNavItem)}
        
        {/* Secondary navigation items - visible on larger screens */}
        <div className="hidden xl:flex">
          {secondaryNavItems.map(renderNavItem)}
        </div>

        {/* More dropdown for secondary and special items on medium screens */}
        <NavigationMenuItem className="hidden md:block xl:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-white/10">
              <MoreHorizontal size={16} />
              <span className="text-sm">More</span>
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-jillr-darkBlue border-jillr-neonPurple/20">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              {secondaryNavItems.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link to={item.path} className="flex items-center gap-2">
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              
              {specialNavItems.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Special Features</DropdownMenuLabel>
                  {specialNavItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center gap-2">
                        <item.icon size={16} />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>

        {/* Special items dropdown - only visible when there are special items */}
        {specialNavItems.length > 0 && (
          <NavigationMenuItem className="hidden xl:block">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-white/10">
                <span className="text-sm">Special</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-jillr-darkBlue border-jillr-neonPurple/20">
                {specialNavItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon size={16} />
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
