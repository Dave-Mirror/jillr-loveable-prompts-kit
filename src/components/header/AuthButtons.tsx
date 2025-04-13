
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, Video } from 'lucide-react';

const AuthButtons: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/brand-dashboard">
        <Button variant="outline" className="flex items-center gap-2">
          <Briefcase size={16} />
          <span className="hidden sm:inline">Brand Portal</span>
        </Button>
      </Link>
      <Link to="/creator-dashboard">
        <Button variant="outline" className="flex items-center gap-2">
          <Video size={16} />
          <span className="hidden sm:inline">Creator</span>
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
