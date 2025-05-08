
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface LeftSectionProps {
  user?: any;
}

const LeftSection: React.FC<LeftSectionProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="flex items-center gap-1">
        <Logo />
      </Link>
    </div>
  );
};

export default LeftSection;
