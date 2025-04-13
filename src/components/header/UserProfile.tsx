
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface UserProfileProps {
  userProfile: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ userProfile }) => {
  return (
    <Link to="/profile" className="w-9 h-9 flex items-center justify-center rounded-full bg-jillr-darkBlue/60 hover:bg-jillr-neonPurple/20 transition-colors overflow-hidden">
      {userProfile?.avatar ? (
        <img 
          src={userProfile.avatar} 
          alt="Profile" 
          className="h-full w-full object-cover"
        />
      ) : (
        <User size={18} />
      )}
    </Link>
  );
};

export default UserProfile;
