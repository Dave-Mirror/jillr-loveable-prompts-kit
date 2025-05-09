
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Star, Upload, Undo2, Redo2, Rocket, BarChart, Eye } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface EditorControlsProps {
  mediaSource: string | null;
  isProcessing: boolean;
}

const EditorControls: React.FC<EditorControlsProps> = ({ mediaSource, isProcessing }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
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
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" disabled={isProcessing || !mediaSource}>
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" disabled={isProcessing || !mediaSource}>
          <Redo2 className="h-4 w-4" />
        </Button>
        
        {mediaSource && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className={showAnalytics ? "bg-jillr-neonPurple/20 text-jillr-neonPurple border-jillr-neonPurple" : ""}
                >
                  <BarChart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Performance-Prognose anzeigen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {showAnalytics && mediaSource && (
        <div className="absolute left-0 right-0 bg-card border border-gray-700 rounded-lg p-4 shadow-lg mt-12 z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Performance-Prognose</h3>
            <Badge className="bg-green-500/20 text-green-400">Hoch</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Erwartete Views</p>
              <p className="text-lg font-medium">8.5k - 15k</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Engagement Rate</p>
              <p className="text-lg font-medium">6.2%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Zielgruppen-Fit</p>
              <p className="text-lg font-medium">92%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Trend-Potential</p>
              <p className="text-lg font-medium">Hoch</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="text-sm font-medium mb-2">KI-Empfehlungen</h4>
            <ul className="text-xs space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Dein Content entspricht aktuellen TikTok-Trends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Videolänge ist optimal für die Zielplattform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">!</span>
                <span>Füge einen Call-to-Action am Ende hinzu, um die Conversion zu steigern</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
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
    </div>
  );
};

export default EditorControls;
