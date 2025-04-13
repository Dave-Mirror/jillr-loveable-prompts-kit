
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ChallengeActivity from '@/components/profile/ChallengeActivity';
import RewardsSection from '@/components/profile/RewardsSection';
import CommunitySection from '@/components/profile/CommunitySection';
import ProfileSettings from '@/components/profile/ProfileSettings';
import StatsSection from '@/components/profile/StatsSection';
import SocialMediaConnections from '@/components/profile/SocialMediaConnections';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { userProfile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('activity');

  if (isLoading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-jillr-neonPurple" />
          <h2 className="text-2xl font-bold">Loading Profile...</h2>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <ProfileHeader userProfile={userProfile} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="activity">Challenge Activity</TabsTrigger>
          <TabsTrigger value="rewards">Rewards & XP</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="mt-6">
          <ChallengeActivity userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="rewards" className="mt-6">
          <RewardsSection userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="community" className="mt-6">
          <CommunitySection userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="statistics" className="mt-6">
          <StatsSection userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="social" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SocialMediaConnections userProfile={userProfile} />
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <ProfileSettings userProfile={userProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
