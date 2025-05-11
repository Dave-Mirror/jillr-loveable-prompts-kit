
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
  // Bestimme die Rolle des Benutzers
  const userRole = getUserRole(userProfile);
  
  // Navigation-Items nach Kategorien und Rollen
  const categorizedNavItems = getCategorizedNavItems(userRole);

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

// Bestimmt die Rolle des Benutzers basierend auf dem Profil
function getUserRole(userProfile: any): 'user' | 'creator' | 'brand' | 'enterprise' {
  if (!userProfile) return 'user';
  
  if (userProfile.isEnterprise) return 'enterprise';
  if (userProfile.email?.includes('brand') || userProfile.accountType === 'brand') return 'brand';
  if (userProfile.isCreator) return 'creator';
  
  return 'user';
}

// Gibt rollenspezifische Navigationsitems zurück
function getCategorizedNavItems(role: string) {
  // Basis-Navigation für alle Benutzerrollen
  const baseItems = {
    'Entdecken': [
      { name: 'Home', icon: Home, path: '/' },
      { name: 'Explore', icon: Compass, path: '/explore' },
      { name: 'Feed', icon: Zap, path: '/feed' },
      { name: 'Map', icon: Map, path: '/map' },
      { name: 'City Clash', icon: Building, path: '/city-clash' },
    ],
    'Community': [
      { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
      { name: 'Creator', icon: Users, path: '/creator-marketplace' },
      { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    ]
  };

  // Rollenspezifische Navigation
  const roleBasedItems: Record<string, any> = {
    'user': {
      'Erstellen': [
        { name: 'Content Editor', icon: Edit, path: '/content-editor' },
      ],
    },
    'creator': {
      'Erstellen': [
        { name: 'Dashboard', icon: Video, path: '/dashboard' },
        { name: 'Content Editor', icon: Edit, path: '/content-editor' },
        { name: 'Challenge Editor', icon: Edit, path: '/challenge-editor' },
      ],
    },
    'brand': {
      'Erstellen': [
        { name: 'Dashboard', icon: Video, path: '/dashboard' },
        { name: 'Challenge Editor', icon: Edit, path: '/challenge-editor' },
      ],
      'Marketing': [
        { name: 'Hypocampus', icon: Zap, path: '/hypocampus' },
        { name: 'Trigger Management', icon: Zap, path: '/trigger-management' },
      ],
    },
    'enterprise': {
      'Erstellen': [
        { name: 'Dashboard', icon: Video, path: '/dashboard' },
        { name: 'Challenge Editor', icon: Edit, path: '/challenge-editor' },
      ],
      'Marketing': [
        { name: 'Hypocampus', icon: Zap, path: '/hypocampus' },
        { name: 'Trigger Management', icon: Zap, path: '/trigger-management' },
      ],
    }
  };

  // Kombiniere Basis- und rollenspezifische Navigation
  return { ...baseItems, ...roleBasedItems[role] };
}

export default RightSection;
