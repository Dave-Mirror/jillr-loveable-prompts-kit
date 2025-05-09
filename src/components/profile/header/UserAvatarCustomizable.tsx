
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import AvatarCustomizationModal from '../avatar/AvatarCustomizationModal';

interface UserAvatarCustomizableProps {
  avatar: string;
  username: string;
  onEditProfile: () => void;
  userLevel: number;
  userCoins: number;
  userXp: number;
}

const UserAvatarCustomizable: React.FC<UserAvatarCustomizableProps> = ({
  avatar,
  username,
  onEditProfile,
  userLevel,
  userCoins,
  userXp
}) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(avatar);

  const handleAvatarChange = (newAvatar: string) => {
    setCurrentAvatar(newAvatar);
    // In a real app, you would also update this in the database
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-32 w-32 border-4 border-jillr-neonPurple">
          <AvatarImage src={currentAvatar} alt={username} />
          <AvatarFallback className="bg-jillr-neonPurple text-2xl">
            {username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-jillr-darkBlue/80 text-white border-jillr-neonPurple"
          onClick={() => setIsCustomizing(true)}
        >
          <Pencil size={14} />
          <span className="text-xs">Avatar</span>
        </Button>
      </div>
      
      <Button variant="outline" size="sm" className="flex gap-2" onClick={onEditProfile}>
        <Pencil size={14} /> Profil bearbeiten
      </Button>

      {isCustomizing && (
        <AvatarCustomizationModal
          isOpen={isCustomizing}
          onClose={() => setIsCustomizing(false)}
          userLevel={userLevel}
          userCoins={userCoins}
          userXp={userXp}
          initialAvatar={currentAvatar}
          onAvatarChange={handleAvatarChange}
        />
      )}
    </div>
  );
};

export default UserAvatarCustomizable;
