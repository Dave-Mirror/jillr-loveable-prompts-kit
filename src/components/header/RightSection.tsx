
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
      
      {/* Add Wallet and Profile Quick Access Icons */}
      <Link 
        to="/wallet" 
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
      >
        <Wallet size={18} />
      </Link>
      
      <Link 
        to="/profile" 
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
      >
        <User size={18} />
      </Link>
      
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

