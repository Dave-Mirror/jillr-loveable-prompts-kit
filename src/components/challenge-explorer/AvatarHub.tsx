
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronUp, Award, Trophy, User, Settings, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AvatarHub = () => {
  const [showPopover, setShowPopover] = useState(false);
  
  const mockUserData = {
    name: 'JillrUser',
    avatar: '/assets/avatars/user1.jpg',
    level: 27,
    xp: 3450,
    nextLevelXp: 4000,
    coins: 2850,
    badges: [
      { id: 'b1', name: 'Early Adopter', icon: '🚀' },
      { id: 'b2', name: 'Social Butterfly', icon: '🦋' },
      { id: 'b3', name: 'Video Star', icon: '🌟' },
      { id: 'b4', name: 'Fitness Pro', icon: '💪' }
    ]
  };
  
  const xpProgress = (mockUserData.xp / mockUserData.nextLevelXp) * 100;
  
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="rounded-full h-12 w-12 p-0 border-2 border-jillr-neonPurple bg-jillr-dark hover:bg-jillr-darkAccent hover:border-jillr-neonPurpleLight"
        >
          <Avatar className="h-full w-full">
            <AvatarImage src={mockUserData.avatar} />
            <AvatarFallback className="bg-jillr-neonPurple/20">
              {mockUserData.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-jillr-dark border-jillr-border p-0 -ml-4">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-14 w-14 border-2 border-jillr-neonPurple">
              <AvatarImage src={mockUserData.avatar} />
              <AvatarFallback className="bg-jillr-neonPurple/20 text-lg">
                {mockUserData.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-white font-bold">{mockUserData.name}</span>
              <div className="flex items-center gap-1 text-xs text-white/70">
                <Trophy className="h-3 w-3 text-jillr-neonPurple" />
                <span>Level {mockUserData.level}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/70">
                <Award className="h-3 w-3 text-jillr-neonGreen" />
                <span>{mockUserData.coins} Coins</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-white/70">XP Progress</span>
              <span className="text-jillr-neonPurple">{mockUserData.xp}/{mockUserData.nextLevelXp}</span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>
          
          <div className="mb-4">
            <h4 className="text-xs font-medium text-white/70 mb-2">Badges</h4>
            <div className="flex flex-wrap gap-2">
              {mockUserData.badges.map((badge) => (
                <Badge key={badge.id} variant="outline" className="text-sm">
                  {badge.icon} {badge.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <User className="h-4 w-4 mr-2" /> My Profile
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarHub;
