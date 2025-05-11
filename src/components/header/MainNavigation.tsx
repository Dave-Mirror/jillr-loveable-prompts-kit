
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Compass, Zap, Map, ShoppingBag, Award, Video, Building, 
  Edit, Users
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  mobileOnly?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, mobileOnly = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-x-2 px-3 py-1.5 text-sm rounded-full transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-accent hover:text-accent-foreground",
        mobileOnly && "md:hidden"
      )}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
};

export const MainNavigation = () => {
  const location = useLocation();
  
  // Definiere die gruppierte Navigation
  const navigationGroups = {
    discover: [
      { path: '/explore', label: 'Entdecken', icon: <Compass className="w-4 h-4" /> },
      { path: '/feed', label: 'Feed', icon: <Zap className="w-4 h-4" /> },
      { path: '/map', label: 'Karte', icon: <Map className="w-4 h-4" /> },
      { path: '/city-clash', label: 'City Clash', icon: <Building className="w-4 h-4" /> },
    ],
    create: [
      { path: '/dashboard', label: 'Dashboard', icon: <Video className="w-4 h-4" /> },
      { path: '/content-editor', label: 'Content Editor', icon: <Edit className="w-4 h-4" /> },
      { path: '/challenge-editor', label: 'Challenge Editor', icon: <Edit className="w-4 h-4" /> },
    ],
    community: [
      { path: '/leaderboard', label: 'Rangliste', icon: <Award className="w-4 h-4" /> },
      { path: '/creator-marketplace', label: 'Creator', icon: <Users className="w-4 h-4" /> },
      { path: '/shop', label: 'Shop', icon: <ShoppingBag className="w-4 h-4" /> },
    ],
  };

  // Bestimme, welche Gruppe für den aktuellen Pfad aktiv ist
  const getActiveGroup = () => {
    for (const [group, items] of Object.entries(navigationGroups)) {
      if (items.some(item => location.pathname === item.path)) {
        return group;
      }
    }
    return null;
  };

  // Standard Navigation für kleine Bildschirme
  const standardNav = [
    { path: '/explore', label: 'Entdecken', icon: <Compass className="w-4 h-4" /> },
    { path: '/feed', label: 'Feed', icon: <Zap className="w-4 h-4" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <Video className="w-4 h-4" /> },
    { path: '/leaderboard', label: 'Rangliste', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Standard Navigation für kleine Bildschirme */}
      <nav className="md:hidden flex items-center space-x-1">
        {standardNav.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </nav>

      {/* Dropdown Navigation für größere Bildschirme */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {/* Entdecken Gruppe */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn(
              getActiveGroup() === 'discover' ? 'bg-primary text-primary-foreground' : ''
            )}>
              <Compass className="w-4 h-4 mr-2" /> Entdecken
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-2 p-4 w-[220px]">
                {navigationGroups.discover.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md hover:bg-accent",
                      location.pathname === item.path ? "bg-accent text-accent-foreground" : ""
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Erstellen Gruppe */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn(
              getActiveGroup() === 'create' ? 'bg-primary text-primary-foreground' : ''
            )}>
              <Edit className="w-4 h-4 mr-2" /> Erstellen
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-2 p-4 w-[220px]">
                {navigationGroups.create.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md hover:bg-accent",
                      location.pathname === item.path ? "bg-accent text-accent-foreground" : ""
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Community Gruppe */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn(
              getActiveGroup() === 'community' ? 'bg-primary text-primary-foreground' : ''
            )}>
              <Users className="w-4 h-4 mr-2" /> Community
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-2 p-4 w-[220px]">
                {navigationGroups.community.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md hover:bg-accent",
                      location.pathname === item.path ? "bg-accent text-accent-foreground" : ""
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default MainNavigation;
