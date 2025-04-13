
import React from 'react';
import { ArrowLeft, Save, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const EditorHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center">
        <Link to="/creator-dashboard">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Content Editor</h1>
          <div className="flex items-center mt-1">
            <div className="h-2 w-full max-w-xs bg-gray-700 rounded">
              <div className="h-full bg-jillr-neonPurple rounded" style={{ width: '45%' }} />
            </div>
            <span className="text-xs ml-2 text-muted-foreground">45% abgeschlossen</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 self-end sm:self-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Hilfe zum Content Editor</p>
          </TooltipContent>
        </Tooltip>
        
        <Button variant="outline" className="gap-2">
          <Save className="h-4 w-4" />
          <span>Entwurf speichern</span>
        </Button>
        
        <Button className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
          Weiter
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
