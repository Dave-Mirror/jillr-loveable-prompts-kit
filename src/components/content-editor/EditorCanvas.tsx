
import React from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, Upload, PlusCircle } from 'lucide-react';

interface EditorCanvasProps {
  mediaSource: string | null;
  isProcessing: boolean;
  currentStep: number;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ mediaSource, isProcessing, currentStep }) => {
  // Renderinhalt basierend auf dem aktuellen Schritt und Medienstatus
  const renderContent = () => {
    if (isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="h-12 w-12 text-jillr-neonPurple animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">Dein Content wird bearbeitet...</p>
        </div>
      );
    }

    if (!mediaSource) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="p-4 rounded-full bg-jillr-dark/50 mb-4">
            <Upload className="h-8 w-8 text-jillr-neonPurple" />
          </div>
          <h3 className="font-medium text-lg mb-1">Video oder Foto auswählen</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Wähle ein Video oder Foto aus oder nehme ein neues auf, um mit der Bearbeitung zu beginnen.
          </p>
        </div>
      );
    }

    // Zeige verschiedene Überlagerungen basierend auf dem aktuellen Schritt
    return (
      <div className="relative h-full">
        <img 
          src={mediaSource} 
          alt="Editor content" 
          className="w-full h-full object-contain"
        />
        
        {currentStep === 1 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 bg-jillr-dark/70 px-3 py-1.5 rounded-full text-xs">
              Bearbeitungsmodus
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-jillr-neonPurple/20 to-transparent">
            <div className="absolute bottom-4 left-4 right-4 bg-jillr-dark/70 px-3 py-2 rounded-lg text-xs">
              KI analysiert deinen Content für optimales Engagement...
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-4 bg-green-600/70 px-3 py-1.5 rounded-full text-xs flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              Bereit zum Veröffentlichen
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full aspect-[9/16] md:aspect-[3/4] lg:aspect-[9/16] bg-jillr-dark/30 border-jillr-border flex items-center justify-center overflow-hidden rounded-lg">
      {renderContent()}
    </Card>
  );
};

export default EditorCanvas;
