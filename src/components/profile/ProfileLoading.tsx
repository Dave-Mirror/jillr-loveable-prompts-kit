
import React from 'react';
import { Loader2 } from 'lucide-react';

const ProfileLoading: React.FC = () => {
  return (
    <div className="container py-20 flex justify-center items-center">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-jillr-neonPurple" />
        <h2 className="text-2xl font-bold">Loading Profile...</h2>
      </div>
    </div>
  );
};

export default ProfileLoading;
