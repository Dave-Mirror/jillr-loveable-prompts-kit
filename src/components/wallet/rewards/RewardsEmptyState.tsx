
import React from 'react';
import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RewardsEmptyState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center p-8 bg-card rounded-lg border">
      <Gift className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-xl font-medium mb-2">Keine Challenge-Belohnungen</h3>
      <p className="text-muted-foreground mb-4">
        Nimm an Challenges teil und gewinne exklusive Belohnungen!
      </p>
      <Button onClick={() => navigate('/explore')}>Challenges entdecken</Button>
    </div>
  );
};

export default RewardsEmptyState;
