
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Globe, AlertCircle } from 'lucide-react';

interface MapLoadErrorProps {
  isApiKeyMissing: boolean;
  loadError: Error | undefined;
}

const MapLoadError: React.FC<MapLoadErrorProps> = ({ 
  isApiKeyMissing, 
  loadError 
}) => {
  return (
    <div className="w-full h-[70vh] flex items-center justify-center glassmorphism p-6 rounded-lg">
      <div className="max-w-md mx-auto text-center space-y-4">
        <Globe className="h-16 w-16 mx-auto text-jillr-neonPurple opacity-50" />
        
        <Alert variant="destructive" className="border-red-500 bg-red-950/30">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Map failed to load</AlertTitle>
          <AlertDescription>
            {isApiKeyMissing 
              ? "A Google Maps API key is required to display the map."
              : loadError 
                ? `Error: ${loadError.message}`
                : "Could not load the map. Please try again later."
            }
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            This map feature requires a valid Google Maps API key to display locations and challenges around you.
          </p>
          
          {isApiKeyMissing && (
            <p className="text-xs text-jillr-neonBlue">
              Tip: Set the VITE_GOOGLE_MAPS_API_KEY environment variable in your .env file to enable maps.
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapLoadError;
