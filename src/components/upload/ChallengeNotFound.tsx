
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ChallengeNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container max-w-4xl mx-auto py-12">
      <div className="glassmorphism p-8">
        <h1 className="text-2xl font-bold mb-6">Challenge not found</h1>
        <p>The challenge you're looking for does not exist or has been removed.</p>
        <Button className="mt-4" onClick={() => navigate('/explore')}>
          Back to Explore
        </Button>
      </div>
    </div>
  );
};

export default ChallengeNotFound;
