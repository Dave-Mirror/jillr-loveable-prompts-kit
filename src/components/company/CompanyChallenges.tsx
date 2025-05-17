
import React from 'react';
import { Layout, Users } from 'lucide-react';
import { Challenge } from '@/utils/challenge/rewards/types';
import ChallengeCard from '@/components/challenge-card/ChallengeCard';
import { useNavigate } from 'react-router-dom';

interface CompanyChallengesProps {
  challenges: Challenge[];
}

const CompanyChallenges: React.FC<CompanyChallengesProps> = ({ challenges }) => {
  const navigate = useNavigate();
  
  const handleChallengeClick = (id: string) => {
    navigate(`/challenge/${id}`);
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Layout className="h-6 w-6 text-jillr-neonBlue" />
          Aktive Challenges
        </h2>
        
        <div className="inline-flex items-center gap-2 text-sm text-gray-400">
          <Users className="h-4 w-4" />
          <span>{challenges.length} aktive Challenges</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            challenge={{
              id: challenge.id,
              title: challenge.title,
              description: challenge.description || '',
              type: challenge.type || 'Challenge',
              imageUrl: challenge.imageUrl || '/placeholder.svg',
              reward: `${challenge.xpReward} XP`,
              expiresIn: challenge.endDate ? new Date(challenge.endDate).toLocaleDateString() : 'Aktiv',
            }}
            onClick={handleChallengeClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyChallenges;
