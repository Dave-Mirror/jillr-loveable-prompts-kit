
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlidersHorizontal, Sparkles, Music, AlignLeft, Star, Rocket, MapPin, Flame, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import VideoUploadTool from './tools/VideoUploadTool';
import EffectsTool from './tools/EffectsTool';
import TemplatesTool from './tools/TemplatesTool';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleMediaUpload = (source: string) => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setMediaSource(source);
      setIsProcessing(false);
      
      if (source.includes('template=')) {
        toast({
          title: "KI-Optimierung abgeschlossen",
          description: "Dein Video wurde mit KI-Templates optimiert für maximales Engagement.",
          variant: "default"
        });
      }
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
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {selectedTool === 'templates' && (
            <Badge variant="outline" className="bg-jillr-neonPurple/20 text-jillr-neonPurple flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Smart Templates
            </Badge>
          )}
          {selectedTool === 'effects' && (
            <Badge variant="outline" className="bg-jillr-neonPurple/20 text-jillr-neonPurple flex items-center">
              <Flame className="h-3 w-3 mr-1" />
              Trending Effects
            </Badge>
          )}
          {selectedTool === 'video' && (
            <Badge variant="outline" className="bg-jillr-neonPurple/20 text-jillr-neonPurple flex items-center">
              <Award className="h-3 w-3 mr-1" />
              AI Optimization
            </Badge>
          )}
        </div>
        
        <Badge variant="secondary" className="cursor-pointer" onClick={() => {
          toast({
            title: "KI-Assistenz aktiviert",
            description: "Dein Video wird automatisch analysiert und Verbesserungsvorschläge werden generiert.",
          });
        }}>
          <Rocket className="h-3.5 w-3.5 mr-1.5" />
          KI-Assistenz aktivieren
        </Badge>
      </div>
      
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
