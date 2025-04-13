
import React from 'react';
import SearchButton from './SearchButton';
import NotificationBell from './NotificationBell';
import UserProfile from './UserProfile';
import UserStats from './UserStats';
import MobileMenu from './MobileMenu';
import GuestMobileMenu from './GuestMobileMenu';
import AuthButtons from './AuthButtons';
import { 
  Home, BarChart, Zap, Trophy, Map, ShoppingBag, Briefcase, Video, Edit
} from 'lucide-react';

interface RightSectionProps {
  user: any;
  userProfile: any;
  signOut: () => Promise<void>;
}

const RightSection: React.FC<RightSectionProps> = ({ user, userProfile, signOut }) => {
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
