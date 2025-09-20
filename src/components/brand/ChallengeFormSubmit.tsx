
import React from 'react';
import { Button } from "@/components/ui/button";

interface ChallengeFormSubmitProps {
  isSubmitting: boolean;
}

const ChallengeFormSubmit: React.FC<ChallengeFormSubmitProps> = ({ isSubmitting }) => {
  return (
    <Button 
      type="submit" 
      className="w-full"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Creating...' : 'Create Challenge'}
    </Button>
  );
};

export default ChallengeFormSubmit;
