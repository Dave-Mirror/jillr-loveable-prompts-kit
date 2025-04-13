
import React from 'react';
import Logo from './Logo';
import MainNavigation from './MainNavigation';

interface LeftSectionProps {
  user: any;
}

const LeftSection: React.FC<LeftSectionProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-4">
      <Logo />
      <MainNavigation user={user} />
    </div>
  );
};

export default LeftSection;
