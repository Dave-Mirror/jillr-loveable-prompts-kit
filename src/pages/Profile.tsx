
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ProfileLoading from '@/components/profile/ProfileLoading';
import ProfileNotFound from '@/components/profile/ProfileNotFound';

const Profile = () => {
  const { userProfile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('activity');

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (!userProfile) {
    return <ProfileNotFound />;
  }

  return (
    <div className="container py-8">
      <ProfileHeader userProfile={userProfile} />
      <ProfileTabs 
        userProfile={userProfile} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Profile;
