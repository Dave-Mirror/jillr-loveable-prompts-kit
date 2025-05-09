
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  Video, 
  UploadCloud, 
  Smartphone, 
  Link as LinkIcon,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface VideoUploadToolProps {
  onMediaSelected: (source: string) => void;
}

const VideoUploadTool: React.FC<VideoUploadToolProps> = ({ onMediaSelected }) => {
  const [urlInput, setUrlInput] = useState('');
  const [showTrending, setShowTrending] = useState(false);
  const { toast } = useToast();
  
  // Sample predefined videos for demo
  const sampleVideos = [
    {
      id: 'demo1',
      thumbnail: '/placeholder.svg',
      title: 'Beach Sunset'
    },
    {
      id: 'demo2',
      thumbnail: '/placeholder.svg',
      title: 'City Timelapse'
    },
    {
      id: 'demo3',
      thumbnail: '/placeholder.svg',
      title: 'Nature Walk'
    }
  ];
  
  // Sample trending templates
  const trendingTemplates = [
    {
      id: 'trend1',
      thumbnail: '/placeholder.svg',
      title: 'TikTok Transition Challenge',
      views: '2.3M',
      isAI: true
    },
    {
      id: 'trend2',
      thumbnail: '/placeholder.svg',
      title: 'Before/After Glow Up',
      views: '1.8M',
      isAI: false
    },
    {
      id: 'trend3',
      thumbnail: '/placeholder.svg',
      title: 'Product Review Format',
      views: '1.5M',
      isAI: true
    }
  ];

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onMediaSelected(urlInput);
      setUrlInput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to storage and return URL
      const mockUrl = '/placeholder.svg';
      onMediaSelected(mockUrl);
      
      toast({
        title: "Video hochgeladen",
        description: "Dein Video wurde erfolgreich hochgeladen und wird für die Bearbeitung vorbereitet.",
      });
    }
  };

  const handleSampleSelect = (id: string) => {
    onMediaSelected(`/placeholder.svg?sample=${id}`);
  };
  
  const handleTemplateSelect = (id: string) => {
    toast({
      title: "Trending Template ausgewählt",
      description: "Das Template wird geladen und auf dein Video angewendet.",
    });
    onMediaSelected(`/placeholder.svg?template=${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Video hochladen</h3>
          <Button 
            onClick={() => setShowTrending(!showTrending)} 
            variant="ghost" 
            size="sm"
            className={showTrending ? "bg-jillr-neonPurple/20 text-jillr-neonPurple" : ""}
          >
            <Sparkles className={`h-4 w-4 mr-1.5 ${showTrending ? "text-jillr-neonPurple" : ""}`} />
            Trend Templates
          </Button>
        </div>
        
        {showTrending ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              AI-optimierte Templates basierend auf aktuellen TikTok & Instagram Trends. Wähle ein Template, das zu deinem Content passt.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trendingTemplates.map((template) => (
                <div key={template.id} className="relative group cursor-pointer rounded-md overflow-hidden" onClick={() => handleTemplateSelect(template.id)}>
                  <div className="aspect-[9/16] bg-gray-800 relative">
                    <img src={template.thumbnail} alt={template.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-white">{template.title}</h4>
                          <p className="text-xs text-gray-300">{template.views} Views</p>
                        </div>
                        {template.isAI && (
                          <Badge variant="secondary" className="bg-jillr-neonPurple text-white text-xs">
                            <Sparkles className="h-3 w-3 mr-1" /> AI Optimiert
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button size="sm" className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
                      Template anwenden
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              onClick={() => setShowTrending(false)}
            >
              Zurück zu Upload-Optionen
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 gap-2"
                onClick={() => onMediaSelected('/placeholder.svg?camera=1')}
              >
                <Camera className="h-8 w-8 text-jillr-neonPurple" />
                <span>Kamera</span>
              </Button>
              
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center h-24 gap-2 border rounded-md hover:bg-accent">
                  <UploadCloud className="h-8 w-8 text-jillr-neonPurple" />
                  <span>Datei hochladen</span>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept="video/*,image/*"
                  className="sr-only"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 gap-2"
              >
                <Smartphone className="h-8 w-8 text-jillr-neonPurple" />
                <span>Smartphone</span>
              </Button>
              
              <Button 
                variant="outline"
                className="flex flex-col items-center justify-center h-24 gap-2"
              >
                <Video className="h-8 w-8 text-jillr-neonPurple" />
                <span>TikTok importieren</span>
              </Button>
            </div>
            
            <form onSubmit={handleUrlSubmit} className="mt-2">
              <Label htmlFor="video-url">Video URL</Label>
              <div className="flex mt-1.5 gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="video-url"
                    type="url"
                    placeholder="https://..."
                    className="pl-9"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                  />
                </div>
                <Button type="submit">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Vorlagen & Beispiel-Content</h3>
        <div className="grid grid-cols-3 gap-2">
          {sampleVideos.map((video) => (
            <Button
              key={video.id}
              variant="outline"
              className="p-0 h-auto aspect-video flex flex-col overflow-hidden"
              onClick={() => handleSampleSelect(video.id)}
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full aspect-video object-cover"
              />
              <span className="p-1 text-xs truncate w-full">
                {video.title}
              </span>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 space-y-3">
          <h4 className="text-base font-medium">AI-Integration</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80 h-auto py-3 flex flex-col gap-2"
              onClick={() => {
                toast({
                  title: "KI-Optimierung aktiviert",
                  description: "Dein Video wird automatisch optimiert für mehr Engagement."
                });
              }}
            >
              <Sparkles className="h-5 w-5" />
              <span>KI-Optimierung aktivieren</span>
              <span className="text-xs opacity-80">Automatische Schnitte & Effekte</span>
            </Button>
            <Button 
              variant="outline"
              className="h-auto py-3 flex flex-col gap-2"
              onClick={() => {
                toast({
                  title: "CapCut Templates",
                  description: "CapCut Integration wird geladen..."
                });
              }}
            >
              <img src="/placeholder.svg" alt="CapCut" className="h-5 w-5" />
              <span>CapCut Import</span>
              <span className="text-xs opacity-80">Trend-Templates importieren</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadTool;
