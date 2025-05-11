
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Compass, Zap, MapPin, User, ShoppingBag, Award, Brain } from 'lucide-react';

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
  return (
    <nav className="hidden xs:flex items-center space-x-1">
      <NavItem to="/explore" label="Entdecken" icon={<Compass className="w-4 h-4" />} />
      <NavItem to="/feed" label="Feed" icon={<Zap className="w-4 h-4" />} />
      <NavItem to="/map" label="Karte" icon={<MapPin className="w-4 h-4" />} />
      <NavItem to="/shop" label="Shop" icon={<ShoppingBag className="w-4 h-4" />} />
      <NavItem to="/leaderboard" label="Rangliste" icon={<Award className="w-4 h-4" />} />
      <NavItem to="/hypocampus" label="Trigger" icon={<Brain className="w-4 h-4" />} />
      <NavItem to="/profile" label="Profil" icon={<User className="w-4 h-4" />} />
    </nav>
  );
};

export default MainNavigation;
