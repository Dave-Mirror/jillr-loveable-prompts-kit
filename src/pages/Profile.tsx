
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ProfileLoading from '@/components/profile/ProfileLoading';

// Mock data for demo profile when not logged in
const mockUserProfile = {
  id: 'demo-user-id',
  level: 5,
  xp: 4500,
  coins: 750,
  active_challenges: 3
};

const Profile = () => {
  const { userProfile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('activity');

  // Use mock profile if user is not authenticated
  const profileData = userProfile || mockUserProfile;
  
  // This is user's own profile
  const isOwnProfile = true;

  if (isLoading) {
    return <ProfileLoading />;
  }

  return (
    <div className="pb-8">
      <ProfileHeader 
        userProfile={profileData} 
        isOwnProfile={isOwnProfile} 
      />
      <div className="container">
        <ProfileTabs 
          userProfile={profileData} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOwnProfile={isOwnProfile}
        />
      </div>
    </div>
  );
};

export default Profile;
