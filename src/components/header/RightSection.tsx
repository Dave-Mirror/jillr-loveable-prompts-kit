
import React from 'react';
import SearchButton from './SearchButton';
import NotificationBell from './NotificationBell';
import UserProfile from './UserProfile';
import UserStats from './UserStats';
import MobileMenu from './MobileMenu';
import GuestMobileMenu from './GuestMobileMenu';
import AuthButtons from './AuthButtons';
import { 
  Compass, Zap, Map, Trophy, ShoppingBag, Users, Edit,
  Video, Home, Building 
} from 'lucide-react';

interface RightSectionProps {
  user: any;
  userProfile: any;
  signOut: () => Promise<void>;
}

const RightSection: React.FC<RightSectionProps> = ({ user, userProfile, signOut }) => {
  // Navigation-Items nach Kategorien für Mobile-Menü
  const categorizedNavItems = {
    'Entdecken': [
      { name: 'Home', icon: Home, path: '/' },
      { name: 'Explore', icon: Compass, path: '/explore' },
      { name: 'Feed', icon: Zap, path: '/feed' },
      { name: 'Map', icon: Map, path: '/map' },
      { name: 'City Clash', icon: Building, path: '/city-clash' },
    ],
    'Erstellen': [
      { name: 'Dashboard', icon: Video, path: '/dashboard' },
      { name: 'Content Editor', icon: Edit, path: '/content-editor' },
      { name: 'Challenge Editor', icon: Edit, path: '/challenge-editor' },
    ],
    'Community': [
      { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
      { name: 'Creator', icon: Users, path: '/creator-marketplace' },
      { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    ]
  };

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
          <GuestMobileMenu mainNavItems={Object.values(categorizedNavItems).flat()} />
        </>
      )}
    </div>
  );
};

export default RightSection;
