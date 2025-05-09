
import React, { useState } from 'react';
import { Share2, Upload, Rocket, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface EditorActionButtonsProps {
  mediaSource: string | null;
  isProcessing: boolean;
}

const EditorActionButtons: React.FC<EditorActionButtonsProps> = ({
  mediaSource,
  isProcessing
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  
  const handleAIOptimize = () => {
    if (!mediaSource) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "KI-Optimierung abgeschlossen",
        description: "Dein Video wurde für maximale Performance optimiert.",
      });
    }, 2500);
  };
  
  return (
    <div className="flex items-center gap-3 flex-wrap justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            disabled={isProcessing || !mediaSource}
          >
            <Eye className="h-4 w-4" />
            <span>Vorschau</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Video Vorschau</DialogTitle>
          </DialogHeader>
          <div className="aspect-[9/16] bg-gray-900 flex items-center justify-center rounded-md overflow-hidden">
            {mediaSource ? (
              <img 
                src={mediaSource} 
                alt="Video preview" 
                className="w-full h-full object-contain"
              />
            ) : (
              <p className="text-muted-foreground">Kein Video ausgewählt</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <Button 
        variant="outline" 
        size="lg" 
        className="gap-2"
        disabled={isProcessing || !mediaSource || isAnalyzing}
        onClick={handleAIOptimize}
      >
        {isAnalyzing ? (
          <>
            <div className="h-4 w-4 rounded-full border-2 border-jillr-neonPurple border-t-transparent animate-spin" />
            <span>KI optimiert...</span>
          </>
        ) : (
          <>
            <Rocket className="h-4 w-4" />
            <span>KI-optimieren</span>
          </>
        )}
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
  );
};

export default EditorActionButtons;
