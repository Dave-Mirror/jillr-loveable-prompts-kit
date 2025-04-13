
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Star, Upload, Undo2, Redo2 } from 'lucide-react';

interface EditorControlsProps {
  mediaSource: string | null;
  isProcessing: boolean;
}

const EditorControls: React.FC<EditorControlsProps> = ({ mediaSource, isProcessing }) => {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" disabled={isProcessing || !mediaSource}>
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" disabled={isProcessing || !mediaSource}>
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Button 
          variant="outline" 
          size="lg" 
          className="gap-2"
          disabled={isProcessing || !mediaSource}
        >
          <Star className="h-4 w-4" />
          <span>Als Entwurf speichern</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="gap-2"
          disabled={isProcessing || !mediaSource}
        >
          <Share2 className="h-4 w-4" />
          <span>Social Media teilen</span>
        </Button>
        
        <Button 
          className="gap-2 bg-jillr-neonPurple hover:bg-jillr-neonPurple/80 text-white"
          size="lg"
          disabled={isProcessing || !mediaSource}
        >
          <Upload className="h-4 w-4" />
          <span>Challenge abschließen</span>
        </Button>
      </div>
    </div>
  );
};

export default EditorControls;
