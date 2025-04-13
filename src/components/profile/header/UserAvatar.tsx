
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface UserAvatarProps {
  avatar: string;
  username: string;
  onEditClick: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatar, username, onEditClick }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-32 w-32 border-4 border-jillr-neonPurple">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback className="bg-jillr-neonPurple text-2xl">
          {username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <Button variant="outline" size="sm" className="flex gap-2" onClick={onEditClick}>
        <Pencil size={14} /> Edit Profile
      </Button>
    </div>
  );
};

export default UserAvatar;
