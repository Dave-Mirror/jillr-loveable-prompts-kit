
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

  if (isLoading) {
    return <ProfileLoading />;
  }

  return (
    <div className="container py-8">
      <ProfileHeader userProfile={profileData} />
      <ProfileTabs 
        userProfile={profileData} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Profile;
