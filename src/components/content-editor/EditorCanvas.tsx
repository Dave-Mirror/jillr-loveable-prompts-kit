
import React from 'react';
import { Upload, Clapperboard, Loader2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorCanvasProps {
  mediaSource: string | null;
  isProcessing: boolean;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ mediaSource, isProcessing }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This would normally process the file and set the media source
    console.log('File selected:', e.target.files?.[0]);
  };

  return (
    <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative flex items-center justify-center min-h-[400px]">
      {isProcessing ? (
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-jillr-neonPurple mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Verarbeitung läuft...</h3>
          <p className="text-muted-foreground">Dein Video wird optimiert und KI-Effekte werden angewendet</p>
        </div>
      ) : mediaSource ? (
        // This would normally display the video or image
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={mediaSource} 
            alt="Preview" 
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : (
        <div className="text-center p-8 max-w-md mx-auto">
          <Clapperboard className="h-16 w-16 mx-auto mb-4 text-jillr-neonPurple" />
          <h3 className="text-xl font-medium mb-4">Starte mit deinem Content</h3>
          <p className="text-muted-foreground mb-6">
            Lade ein Video hoch oder nimm eines mit deiner Kamera auf, um es mit unseren KI-Tools zu bearbeiten
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80 w-full sm:w-auto">
              <Camera className="mr-2 h-4 w-4" />
              Aufnehmen
            </Button>
            <label htmlFor="video-upload">
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <div>
                  <Upload className="mr-2 h-4 w-4" />
                  Video hochladen
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*,image/*"
                    className="sr-only"
                    onChange={handleFileUpload}
                  />
                </div>
              </Button>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorCanvas;
