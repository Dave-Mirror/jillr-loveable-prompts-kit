
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ProfileEditModal from './ProfileEditModal';
import UserAvatar from './header/UserAvatar';
import UserInfo from './header/UserInfo';
import UserStats from './header/UserStats';
import LevelProgress from './header/LevelProgress';
import AchievementBadges from './header/AchievementBadges';
import SocialLinks from './SocialLinks';

interface ProfileHeaderProps {
  userProfile: any;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Calculate XP progress to next level
  const currentLevel = userProfile.level || 1;
  const nextLevelXP = currentLevel * 1000;
  const previousLevelXP = (currentLevel - 1) * 1000;
  const currentXP = userProfile.xp || 0;
  const progress = ((currentXP - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100;
  
  // Mock data for profile - would come from database in real app
  const mockProfileData = {
    username: 'JillrCreator',
    location: 'Berlin, Germany',
    joinDate: 'September 2023',
    badges: ['Top 10 Creator', 'Easter Egg Hunter', 'Viral Challenge Master'],
    avatar: 'https://placehold.co/200x200/9b87f5/FFFFFF/png?text=JC'
  };

  return (
    <Card className="border-jillr-neonPurple/20 bg-gradient-to-br from-jillr-darkBlue to-black">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile image section */}
          <UserAvatar 
            avatar={mockProfileData.avatar}
            username={mockProfileData.username}
            onEditClick={() => setIsEditing(true)}
          />
          
          {/* Profile info section */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <UserInfo 
                username={mockProfileData.username}
                location={mockProfileData.location}
                joinDate={mockProfileData.joinDate}
              />
              
              <UserStats 
                xp={userProfile.xp}
                level={userProfile.level}
                coins={userProfile.coins}
              />
            </div>
            
            {/* Level progress */}
            <LevelProgress 
              currentLevel={currentLevel}
              currentXP={currentXP}
              nextLevelXP={nextLevelXP}
              previousLevelXP={previousLevelXP}
              progress={progress}
            />
            
            {/* Badges */}
            <AchievementBadges badges={mockProfileData.badges} />
            
            {/* Social links */}
            <SocialLinks />
          </div>
        </div>
      </CardContent>
      
      {isEditing && (
        <ProfileEditModal 
          isOpen={isEditing} 
          onClose={() => setIsEditing(false)} 
          profileData={mockProfileData} 
        />
      )}
    </Card>
  );
};

export default ProfileHeader;
