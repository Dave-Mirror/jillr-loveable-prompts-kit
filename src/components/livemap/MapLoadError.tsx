
import React from 'react';

interface MapLoadErrorProps {
  isApiKeyMissing: boolean;
  loadError?: Error;
}

const MapLoadError: React.FC<MapLoadErrorProps> = ({ isApiKeyMissing, loadError }) => {
  return (
    <div className="w-full h-[70vh] relative rounded-lg glassmorphism overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Google Maps could not be loaded</h3>
        {isApiKeyMissing ? (
          <>
            <p className="mb-4 text-muted-foreground">Please add your Google Maps API key in the .env file:</p>
            <div className="bg-muted p-3 rounded-md text-left w-full max-w-md mb-4">
              <code className="text-sm">VITE_GOOGLE_MAPS_API_KEY=your_api_key_here</code>
            </div>
            <a 
              href="https://console.cloud.google.com/google/maps-apis/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline text-sm"
            >
              Get an API key from Google Cloud Console
            </a>
          </>
        ) : (
          <p className="text-muted-foreground">There was an error loading the map: {loadError?.message}</p>
        )}
      </div>
    </div>
  );
};

export default MapLoadError;
