
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

const AuthButtons: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/brand-dashboard">
        <Button variant="outline" className="flex items-center gap-2">
          <Briefcase size={16} />
          <span className="hidden sm:inline">Brand Portal</span>
        </Button>
      </Link>
      <Link to="/auth">
        <Button className="neon-button">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
