
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface ChallengeNavButtonsProps {
  activeTab: string;
  navigateTab: (direction: 'prev' | 'next') => void;
  challengeData: any;
}

const ChallengeNavButtons: React.FC<ChallengeNavButtonsProps> = ({
  activeTab,
  navigateTab,
  challengeData
}) => {
  return (
    <div className="flex justify-between mt-8">
      <Button 
        variant="outline" 
        onClick={() => navigateTab('prev')}
        disabled={activeTab === 'basics'}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous Step
      </Button>
      
      {activeTab === 'preview' ? (
        <Button 
          className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80"
          onClick={() => console.log('Publishing challenge:', challengeData)}
        >
          <Check className="mr-2 h-4 w-4" />
          Publish Challenge
        </Button>
      ) : (
        <Button 
          variant="default" 
          onClick={() => navigateTab('next')}
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ChallengeNavButtons;
