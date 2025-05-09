
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderContainerProps {
  children: React.ReactNode;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ children }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
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

  // Check if we're on the home page or explore page to apply transparent header
  const shouldBeTransparent = location.pathname === '/' || location.pathname === '/explore';
  // Check if we're on the challenge feed to apply full-screen mode
  const isFullscreenPage = location.pathname === '/challenge-feed';

  if (isFullscreenPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
        <div className="container">
          <div className="flex items-center justify-between pt-safe">
            {children}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled || !shouldBeTransparent 
          ? 'bg-jillr-dark/90 backdrop-blur-lg shadow-lg' 
          : 'bg-gradient-to-b from-jillr-dark/80 to-transparent'
      } ${isMobile ? 'py-2' : 'py-3'} safe-area-top`}
    >
      <div className="container flex items-center justify-between">
        {children}
      </div>
    </header>
  );
};

export default HeaderContainer;
