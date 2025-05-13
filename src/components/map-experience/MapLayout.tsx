
import React from 'react';

interface MapLayoutProps {
  children: React.ReactNode;
}

const MapLayout: React.FC<MapLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full relative">
      {children}
    </div>
  );
};

export default MapLayout;
