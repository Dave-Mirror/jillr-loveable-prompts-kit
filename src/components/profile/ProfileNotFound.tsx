
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ProfileNotFound: React.FC = () => {
  return (
    <div className="container py-20 flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
        <p className="mb-6">Please log in to view your profile.</p>
        <Link to="/auth">
          <Button className="neon-button">Login / Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileNotFound;
