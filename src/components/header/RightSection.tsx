
import React from 'react';
import { Link } from 'react-router-dom';
import SearchButton from './SearchButton';
import NotificationBell from './NotificationBell';
import UserProfile from './UserProfile';
import UserStats from './UserStats';
import MobileMenu from './MobileMenu';
import GuestMobileMenu from './GuestMobileMenu';
import AuthButtons from './AuthButtons';
import { 
  Home, BarChart, Zap, Trophy, Map, ShoppingBag, Wallet, User
} from 'lucide-react';

interface RightSectionProps {
  user: any;
  userProfile: any;
  signOut: () => Promise<void>;
}

const RightSection: React.FC<RightSectionProps> = ({ user, userProfile, signOut }) => {
  // Simplified main nav items for consistency
  const mainNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Explore', icon: Zap, path: '/explore' },
    { name: 'Live Map', icon: Map, path: '/livemap' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Dashboard', icon: BarChart, path: user?.email?.includes('brand') || user?.email?.includes('enterprise') ? '/enterprise-dashboard' : '/dashboard' }
  ];

  return (
    <div className="flex items-center gap-3">
      <SearchButton />
      
      {/* Consistent Wallet and Profile Quick Access Icons */}
      <div className="flex items-center gap-2 group">
        <Link 
          to="/wallet" 
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
        >
          <Wallet size={16} />
          <span className="text-xs hidden md:inline">Wallet</span>
        </Link>
        
        <Link 
          to="/profile" 
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
        >
          <User size={16} />
          <span className="text-xs hidden md:inline">Pril</span>
        </Link>
      </div>
      
      {user ? (
        <>
          <UserStats userProfile={userProfile} />
          <NotificationBell />
          <UserProfile userProfile={userProfile} />
          <MobileMenu user={user} userProfile={userProfile} onSignOut={signOut} />
        </>
      ) : (
        <>
          <AuthButtons />
          <GuestMobileMenu mainNavItems={mainNavItems} />
        </>
      )}
    </div>
  );
};

export default RightSection;

