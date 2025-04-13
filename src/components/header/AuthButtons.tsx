
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthButtons: React.FC = () => {
  return (
    <Link to="/auth">
      <Button className="neon-button">
        Login
      </Button>
    </Link>
  );
};

export default AuthButtons;
