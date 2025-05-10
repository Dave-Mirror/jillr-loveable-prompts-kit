
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image, Video, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface PreviewMediaProps {
  previewMedia: {
    type: string;
    url: string;
  };
  setPreviewMedia: React.Dispatch<React.SetStateAction<{
    type: string;
    url: string;
  }>>;
  onChange: (data: any) => void;
}

const PreviewMedia: React.FC<PreviewMediaProps> = ({ 
  previewMedia, 
  setPreviewMedia, 
  onChange 
}) => {
  const handleMediaUpload = (mediaType: 'image' | 'video') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = mediaType === 'image' ? 'image/*' : 'video/*';
    
    input.onchange = (e) => {
      // Properly type the event target as HTMLInputElement
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0]; // Use optional chaining
      if (!file) return;
      
      // Check file size (max 50MB for videos, 5MB for images)
      const maxSize = mediaType === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(`Datei zu groß. Maximum: ${mediaType === 'image' ? '5MB' : '50MB'}`);
        return;
      }
      
      const url = URL.createObjectURL(file);
      setPreviewMedia({ type: mediaType, url });
      
      // Update the parent component's data
      onChange({ 
        previewMediaType: mediaType, 
        previewMediaUrl: url 
      });
      
      toast.success(`${mediaType === 'image' ? 'Bild' : 'Video'} erfolgreich hochgeladen`);
    };
    
    input.click();
  };

  return (
    <div className="mt-4 mb-4">
      <div className="aspect-video rounded-md overflow-hidden bg-jillr-darkBlue/30 border border-jillr-border/30">
        {previewMedia.url ? (
          previewMedia.type === 'video' ? (
            <video 
              src={previewMedia.url}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <img 
              src={previewMedia.url}
              className="w-full h-full object-cover"
              alt="Challenge preview"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <p>Lade ein Vorschaubild oder -video hoch</p>
          </div>
        )}
      </div>
      
      <div className="flex gap-2 mt-2 justify-center">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => handleMediaUpload('image')}
          className="flex items-center gap-1"
        >
          <Image className="h-4 w-4" />
          Bild hochladen
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => handleMediaUpload('video')}
          className="flex items-center gap-1"
        >
          <Video className="h-4 w-4" />
          Video hochladen
        </Button>
      </div>
    </div>
  );
};

export default PreviewMedia;
