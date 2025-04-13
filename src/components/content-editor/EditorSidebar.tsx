
import React from 'react';
import { 
  Video, 
  Camera, 
  Scissors, 
  Layers, 
  Music, 
  Type, 
  Palette, 
  Sticker, 
  Sparkles, 
  Hash 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EditorSidebarProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ selectedTool, setSelectedTool }) => {
  const tools = [
    { id: 'video', icon: Video, label: 'Video Upload' },
    { id: 'camera', icon: Camera, label: 'Aufnahme' },
    { id: 'trim', icon: Scissors, label: 'Schnitt' },
    { id: 'layers', icon: Layers, label: 'Ebenen' },
    { id: 'music', icon: Music, label: 'Musik' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'effects', icon: Sparkles, label: 'Effekte' },
    { id: 'filters', icon: Palette, label: 'Filter' },
    { id: 'stickers', icon: Sticker, label: 'Sticker' },
    { id: 'hashtags', icon: Hash, label: 'Hashtags' },
  ];

  return (
    <div className="lg:w-20 flex lg:flex-col justify-start overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-gray-700">
      {tools.map((tool) => (
        <Tooltip key={tool.id}>
          <TooltipTrigger asChild>
            <Button
              variant={selectedTool === tool.id ? 'default' : 'ghost'}
              size="icon"
              className={`h-14 w-14 rounded-xl m-1 ${
                selectedTool === tool.id 
                  ? 'bg-jillr-neonPurple hover:bg-jillr-neonPurple/90' 
                  : ''
              }`}
              onClick={() => setSelectedTool(tool.id)}
            >
              <tool.icon className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{tool.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default EditorSidebar;
