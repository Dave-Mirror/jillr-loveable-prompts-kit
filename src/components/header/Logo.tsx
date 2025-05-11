
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="font-bold text-xl relative text-white hover:opacity-80 transition">
      <span className="text-jillr-neonPurple">jillr</span>
    </Link>
  );
};

export default Logo;
