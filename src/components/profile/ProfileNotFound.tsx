
import React from 'react';

const ProfileNotFound: React.FC = () => {
  return (
    <div className="container py-20 flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
        <p>Please log in to view your profile.</p>
      </div>
    </div>
  );
};

export default ProfileNotFound;
