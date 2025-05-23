
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActiveChallengesTab from './challenge-tabs/ActiveChallengesTab';
import CompletedChallengesTab from './challenge-tabs/CompletedChallengesTab';
import PendingChallengesTab from './challenge-tabs/PendingChallengesTab';
import UgcContentSidebar from './challenge-content/UgcContentSidebar';
import { ActiveChallenge, CompletedChallenge, ContentUpload } from './challenge-tabs/types';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';

interface ChallengeActivityProps {
  userProfile: any;
}

const ChallengeActivity: React.FC<ChallengeActivityProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('active');
  
  const tabOptions: FilterOption[] = [
    { value: 'active', label: 'Active Challenges' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
  ];
  
  // Mock data - in a real app, this would likely come from an API or context
  const activeChallenges: ActiveChallenge[] = [
    {
      id: '1',
      title: 'Summer Dance Challenge',
      brand: 'Nike',
      deadline: '2 days left',
      xpReward: 250,
      coinReward: 100,
      progress: 70,
      status: 'in_progress'
    },
    {
      id: '2',
      title: 'City Travel Moments',
      brand: 'Airbnb',
      deadline: '5 days left',
      xpReward: 350,
      coinReward: 150,
      progress: 30,
      status: 'not_started'
    }
  ];
  
  const completedChallenges: CompletedChallenge[] = [
    {
      id: '3',
      title: 'Trending Dance Moves',
      brand: 'Spotify',
      completedDate: '2023-09-15',
      xpEarned: 300,
      coinsEarned: 120,
      views: 2430,
      likes: 342
    },
    {
      id: '4',
      title: 'Product Unboxing',
      brand: 'Samsung',
      completedDate: '2023-08-22',
      xpEarned: 250,
      coinsEarned: 100,
      views: 1820,
      likes: 215
    }
  ];
  
  const contentUploads: ContentUpload[] = [
    {
      id: '1',
      thumbnail: 'https://placehold.co/300x400/9b87f5/FFFFFF/png?text=Challenge+Video',
      title: 'My Dance Challenge',
      date: '2023-09-15',
      views: 2430,
      likes: 342,
      featured: true,
      challenge: 'Trending Dance Moves',
      tiktokLink: 'https://tiktok.com/'
    },
    {
      id: '2',
      thumbnail: 'https://placehold.co/300x400/7E69AB/FFFFFF/png?text=Product+Review',
      title: 'Unboxing the New Phone',
      date: '2023-08-22',
      views: 1820,
      likes: 215,
      featured: false,
      challenge: 'Product Unboxing',
      tiktokLink: 'https://tiktok.com/'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Challenge Activity</h2>
        <FilterDropdown
          options={tabOptions}
          activeValue={activeTab}
          onSelect={setActiveTab}
          label="Status"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TabsContent value={activeTab === 'active' ? activeTab : ''} className="mt-0">
            <ActiveChallengesTab activeChallenges={activeChallenges} />
          </TabsContent>
          
          <TabsContent value={activeTab === 'completed' ? activeTab : ''} className="mt-0">
            <CompletedChallengesTab completedChallenges={completedChallenges} />
          </TabsContent>
          
          <TabsContent value={activeTab === 'pending' ? activeTab : ''} className="mt-0">
            <PendingChallengesTab />
          </TabsContent>
        </div>
        
        <div>
          <UgcContentSidebar contentUploads={contentUploads} />
        </div>
      </div>
    </div>
  );
};

export default ChallengeActivity;
