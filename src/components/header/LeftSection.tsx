
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
        {/* We're removing the Logo component and replacing it with a div to avoid nesting <a> tags */}
        <div className="flex items-center">
          <Logo />
        </div>
      </Link>
    </div>
  );
};

export default LeftSection;
