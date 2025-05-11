
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AnalyticsDemoPrompt: React.FC = () => {
  return (
    <div className="mt-6">
      <Link to="/auth">
        <Button className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
          Anmelden für persönliche Daten
        </Button>
      </Link>
    </div>
  );
};

export default AnalyticsDemoPrompt;
