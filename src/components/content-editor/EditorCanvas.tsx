
import React, { useState } from 'react';
import { Upload, Clapperboard, Loader2, Camera, Sparkles, Award, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface EditorCanvasProps {
  mediaSource: string | null;
  isProcessing: boolean;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ mediaSource, isProcessing }) => {
  const [showOverlays, setShowOverlays] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Simuliere Fortschritt während der Verarbeitung
  React.useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 150);
      
      return () => {
        clearInterval(interval);
        setProgress(0);
      };
    }
  }, [isProcessing]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This would normally process the file and set the media source
    console.log('File selected:', e.target.files?.[0]);
  };

  return (
    <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative flex items-center justify-center min-h-[400px]">
      {isProcessing ? (
        <div className="text-center p-6">
          <Loader2 className="h-12 w-12 animate-spin text-jillr-neonPurple mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Verarbeitung läuft...</h3>
          <p className="text-muted-foreground mb-4">Dein Video wird optimiert und KI-Effekte werden angewendet</p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between mb-1 text-sm">
              <span>{progress}%</span>
              <span>KI-Optimierung</span>
            </div>
            <Progress value={progress} className="h-2" />
            
            <div className="mt-4 text-sm text-left space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-jillr-neonPurple" />
                <span className="text-muted-foreground">KI analysiert Content...</span>
              </div>
              {progress > 30 && (
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-jillr-neonPurple" />
                  <span className="text-muted-foreground">Optimiere Engagement-Faktoren...</span>
                </div>
              )}
              {progress > 60 && (
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-jillr-neonPurple" />
                  <span className="text-muted-foreground">Wende Trend-Template an...</span>
                </div>
              )}
              {progress > 90 && (
                <div className="flex items-center gap-2">
                  <Clapperboard className="h-4 w-4 text-jillr-neonPurple" />
                  <span className="text-muted-foreground">Finalisiere Video...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : mediaSource ? (
        // This would normally display the video or image with UI overlays
        <div className="w-full h-full flex items-center justify-center relative">
          <img 
            src={mediaSource} 
            alt="Preview" 
            className="max-h-full max-w-full object-contain"
          />
          
          {/* AI-Template und Branding-Overlays */}
          {showOverlays && (
            <>
              {/* Brand Logo */}
              <div className="absolute top-4 left-4 bg-black/30 p-1.5 rounded-md">
                <img 
                  src="/placeholder.svg" 
                  alt="Brand Logo" 
                  className="h-6 w-auto"
                />
              </div>
              
              {/* KI Text-Overlay */}
              <div className="absolute bottom-16 left-0 right-0 p-4 text-center">
                <div className="text-xl font-bold text-white drop-shadow-md">
                  Entdecke den neuen Look
                </div>
              </div>
              
              {/* Hashtags */}
              <div className="absolute bottom-4 left-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-black/40 text-white">
                    #TrendChallenge
                  </Badge>
                  <Badge className="bg-black/40 text-white">
                    #Jillr
                  </Badge>
                </div>
              </div>
              
              {/* Toggle Button für Overlays */}
              <Button 
                variant="secondary" 
                size="sm" 
                className="absolute top-4 right-4 bg-black/50"
                onClick={() => setShowOverlays(!showOverlays)}
              >
                {showOverlays ? 'Overlays ausblenden' : 'Overlays anzeigen'}
              </Button>
            </>
          )}
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
          
          <div className="mt-8 flex items-center gap-2 justify-center">
            <Badge variant="outline" className="bg-jillr-neonPurple/10 text-jillr-neonPurple border-jillr-neonPurple flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>KI-optimiert</span>
            </Badge>
            <Badge variant="outline" className="bg-jillr-neonPurple/10 text-jillr-neonPurple border-jillr-neonPurple flex items-center gap-1">
              <Flame className="h-3 w-3" />
              <span>Viral Templates</span>
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorCanvas;
