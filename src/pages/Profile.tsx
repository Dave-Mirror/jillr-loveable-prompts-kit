
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  
  // Use mock profile if user is not authenticated
  const profileData = userProfile || mockUserProfile;
  
  // Parse the tab parameter from the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    
    if (tabParam && ['activity', 'rewards', 'community', 'statistics', 'social', 'data', 'settings', 'hypocampus'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  if (isLoading) {
    return <ProfileLoading />;
  }

  return (
    <div className="pb-8">
      <ProfileHeader userProfile={profileData} />
      <div className="container">
        <ProfileTabs 
          userProfile={profileData} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default Profile;
