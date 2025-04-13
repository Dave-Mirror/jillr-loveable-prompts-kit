
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlidersHorizontal, Sparkles, Music, AlignLeft, Star } from 'lucide-react';
import VideoUploadTool from './tools/VideoUploadTool';
import EffectsTool from './tools/EffectsTool';
import TemplatesTool from './tools/TemplatesTool';

interface EditorToolbarProps {
  selectedTool: string;
  setMediaSource: React.Dispatch<React.SetStateAction<string | null>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ 
  selectedTool, 
  setMediaSource,
  setIsProcessing
}) => {
  const [activeTab, setActiveTab] = useState('adjustments');

  const handleMediaUpload = (source: string) => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setMediaSource(source);
      setIsProcessing(false);
    }, 2000);
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'video':
      case 'camera':
        return <VideoUploadTool onMediaSelected={handleMediaUpload} />;
      case 'effects':
      case 'filters':
        return <EffectsTool />;
      default:
        return <TemplatesTool />;
    }
  };

  return (
    <div className="mt-4 bg-card border border-gray-700 rounded-lg p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="adjustments" className="flex items-center">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Anpassungen</span>
          </TabsTrigger>
          <TabsTrigger value="effects" className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Effekte</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center">
            <Music className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Audio</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center">
            <AlignLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Text</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center">
            <Star className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
        </TabsList>

        <div className="min-h-[120px]">
          {renderToolContent()}
        </div>
      </Tabs>
    </div>
  );
};

export default EditorToolbar;
