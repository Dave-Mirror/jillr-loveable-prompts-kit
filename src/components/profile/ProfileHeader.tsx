import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Award, MapPin, Calendar, Pencil, Instagram, Youtube, Twitch, Twitter } from 'lucide-react';
import { TiktokIcon } from '@/components/ui/icons/TiktokIcon';
import ProfileEditModal from './ProfileEditModal';
import TopAchievements from './header/TopAchievements';
import SocialLinks from './header/SocialLinks';
import LevelProgressBar from './header/LevelProgressBar';

interface ProfileHeaderProps {
  userProfile: any;
  isOwnProfile: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userProfile, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Calculate XP progress to next level
  const currentLevel = userProfile.level || 1;
  const nextLevelXP = currentLevel * 1000;
  const previousLevelXP = (currentLevel - 1) * 1000;
  const currentXP = userProfile.xp || 0;
  const progress = ((currentXP - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100;

  return (
    <Card className="border-none rounded-none bg-jillr-darkBlue/70 shadow-lg">
      <CardContent className="py-6 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img 
                src={userProfile.avatar || 'https://placehold.co/200x200/9b87f5/FFFFFF/png?text=JC'} 
                alt={userProfile.username} 
                className="h-24 w-24 rounded-full object-cover border-2 border-jillr-neonPurple"
              />
              {userProfile.online && (
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
              )}
            </div>
            
            {isOwnProfile && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 text-xs" 
                onClick={() => setIsEditing(true)}
              >
                <Pencil size={14} />
                Edit Profile
              </Button>
            )}
          </div>
          
          {/* Profile Info & Stats */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">{userProfile.username}</h1>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                  {userProfile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Joined {userProfile.joinDate || '2023'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-end mt-2 md:mt-0">
                <div className="flex items-center gap-1 px-3 py-1 bg-jillr-darkBlue/50 rounded-lg">
                  <Award size={18} className="text-yellow-400" />
                  <span className="font-medium">Level {currentLevel}</span>
                </div>
              </div>
            </div>
            
            {/* Level Progress */}
            <LevelProgressBar 
              currentLevel={currentLevel}
              currentXP={currentXP}
              nextLevelXP={nextLevelXP}
              progress={progress}
            />
            
            {/* Social Links */}
            <SocialLinks socialLinks={userProfile.socialLinks} />
            
            {/* Achievements */}
            <TopAchievements badges={userProfile.badges || []} />
          </div>
        </div>
      </CardContent>
      
      {isEditing && (
        <ProfileEditModal 
          isOpen={isEditing} 
          onClose={() => setIsEditing(false)} 
          profileData={userProfile} 
        />
      )}
    </Card>
  );
};

export default ProfileHeader;
