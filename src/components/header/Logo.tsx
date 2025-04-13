
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="text-2xl font-bold neon-text">jillr</span>
    </Link>
  );
};

export default Logo;
