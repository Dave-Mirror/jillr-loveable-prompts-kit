
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  Video, 
  UploadCloud, 
  Smartphone, 
  Link as LinkIcon,
  ArrowRight 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VideoUploadToolProps {
  onMediaSelected: (source: string) => void;
}

const VideoUploadTool: React.FC<VideoUploadToolProps> = ({ onMediaSelected }) => {
  const [urlInput, setUrlInput] = useState('');
  
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
    }
  };

  const handleSampleSelect = (id: string) => {
    onMediaSelected(`/placeholder.svg?sample=${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Video hochladen</h3>
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
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Vorlagen</h3>
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
      </div>
    </div>
  );
};

export default VideoUploadTool;
