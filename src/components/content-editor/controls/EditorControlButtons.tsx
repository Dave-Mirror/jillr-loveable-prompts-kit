
import React from 'react';
import { Undo2, Redo2, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EditorControlButtonsProps {
  mediaSource: string | null;
  isProcessing: boolean;
  showAnalytics: boolean;
  onToggleAnalytics: () => void;
}

const EditorControlButtons: React.FC<EditorControlButtonsProps> = ({
  mediaSource,
  isProcessing,
  showAnalytics,
  onToggleAnalytics
}) => {
  return (
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
                onClick={onToggleAnalytics}
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
  );
};

export default EditorControlButtons;
