
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderContainerProps {
  children: React.ReactNode;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ children }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled || location.pathname !== '/explore' 
          ? 'bg-jillr-dark/90 backdrop-blur-lg shadow-lg' 
          : 'bg-gradient-to-b from-jillr-dark/80 to-transparent'
      } py-3`}
    >
      <div className="container flex items-center justify-between">
        {children}
      </div>
    </header>
  );
};

export default HeaderContainer;
