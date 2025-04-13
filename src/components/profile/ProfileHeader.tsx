
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Pencil, MapPin, Calendar, Award, Zap, Coins } from 'lucide-react';
import SocialLinks from './SocialLinks';
import ProfileEditModal from './ProfileEditModal';

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
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32 border-4 border-jillr-neonPurple">
              <AvatarImage src={mockProfileData.avatar} alt={mockProfileData.username} />
              <AvatarFallback className="bg-jillr-neonPurple text-2xl">
                {mockProfileData.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="flex gap-2" onClick={() => setIsEditing(true)}>
              <Pencil size={14} /> Edit Profile
            </Button>
          </div>
          
          {/* Profile info section */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h1 className="text-3xl font-bold">{mockProfileData.username}</h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{mockProfileData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Joined {mockProfileData.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="rounded-lg bg-jillr-darkBlue/50 p-3 flex flex-col items-center min-w-20">
                  <Zap className="h-5 w-5 text-jillr-neonPurple mb-1" />
                  <span className="text-xl font-bold">{userProfile.xp}</span>
                  <span className="text-xs text-muted-foreground">XP</span>
                </div>
                <div className="rounded-lg bg-jillr-darkBlue/50 p-3 flex flex-col items-center min-w-20">
                  <Award className="h-5 w-5 text-jillr-neonPink mb-1" />
                  <span className="text-xl font-bold">{userProfile.level}</span>
                  <span className="text-xs text-muted-foreground">Level</span>
                </div>
                <div className="rounded-lg bg-jillr-darkBlue/50 p-3 flex flex-col items-center min-w-20">
                  <Coins className="h-5 w-5 text-yellow-500 mb-1" />
                  <span className="text-xl font-bold">{userProfile.coins}</span>
                  <span className="text-xs text-muted-foreground">Coins</span>
                </div>
              </div>
            </div>
            
            {/* Level progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Level {currentLevel}</span>
                <span className="text-sm">Level {currentLevel + 1}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                {nextLevelXP - currentXP} XP needed for next level
              </p>
            </div>
            
            {/* Badges */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Top Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {mockProfileData.badges.map((badge, i) => (
                  <div 
                    key={i} 
                    className="bg-jillr-neonPurple/20 border border-jillr-neonPurple/30 rounded-full px-3 py-1 text-xs flex items-center gap-1"
                  >
                    <Award size={12} className="text-jillr-neonPurple" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Social links */}
            <SocialLinks />
          </div>
        </div>
      </CardContent>
      
      {isEditing && <ProfileEditModal isOpen={isEditing} onClose={() => setIsEditing(false)} profileData={mockProfileData} />}
    </Card>
  );
};

export default ProfileHeader;
