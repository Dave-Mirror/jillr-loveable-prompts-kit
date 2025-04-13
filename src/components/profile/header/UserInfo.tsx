
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface UserInfoProps {
  username: string;
  location: string;
  joinDate: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ username, location, joinDate }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{username}</h1>
      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>Joined {joinDate}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
