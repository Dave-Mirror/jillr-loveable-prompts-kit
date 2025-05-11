
import React from 'react';
import SearchButton from './SearchButton';
import NotificationBell from './NotificationBell';
import UserProfile from './UserProfile';
import UserStats from './UserStats';
import MobileMenu from './MobileMenu';
import GuestMobileMenu from './GuestMobileMenu';
import AuthButtons from './AuthButtons';
import { 
  Home, Zap, Map, Trophy, ShoppingBag, Compass, Building
} from 'lucide-react';

interface RightSectionProps {
  user: any;
  userProfile: any;
  signOut: () => Promise<void>;
}

const RightSection: React.FC<RightSectionProps> = ({ user, userProfile, signOut }) => {
  // Vereinfachte Navigation mit konsolidierten Routen
  const mainNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Explore', icon: Zap, path: '/explore' },
    { name: 'Feed', icon: Compass, path: '/feed' },
    { name: 'Live Map', icon: Map, path: '/map' },
    { name: 'City Clash', icon: Building, path: '/city-clash' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Dashboard', icon: Compass, path: '/dashboard' }
  ];

  return (
    <div className="flex items-center gap-3">
      <SearchButton />
      
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
