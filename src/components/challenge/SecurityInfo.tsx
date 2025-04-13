
import React from 'react';
import { Camera } from 'lucide-react';

export const SecurityInfo: React.FC = () => {
  return (
    <div className="p-4 rounded-lg bg-jillr-darkBlue/30 border border-jillr-darkBlue">
      <div className="flex items-start mb-2">
        <div className="mt-1 mr-3 bg-jillr-neonBlue/20 p-1.5 rounded-full">
          <Camera size={16} className="text-jillr-neonBlue" />
        </div>
        <div>
          <h3 className="font-medium mb-1">AR/Geofencing Validierung</h3>
          <p className="text-sm text-muted-foreground">
            Deine Teilnahme wird automatisch geprüft – bleib fair!
          </p>
        </div>
      </div>
    </div>
  );
};
