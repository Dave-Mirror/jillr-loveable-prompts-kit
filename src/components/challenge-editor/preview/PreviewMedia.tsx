
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image, Video, Upload, RotateCcw, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { extractVideoPosterFrame, createLocalUploadHandler } from '@/utils/video/posterGeneration';

interface PreviewMediaProps {
  previewMedia: {
    type: string;
    url: string;
    posterUrl?: string;
  };
  setPreviewMedia: React.Dispatch<React.SetStateAction<{
    type: string;
    url: string;
    posterUrl?: string;
  }>>;
  onChange: (data: any) => void;
}

const PreviewMedia: React.FC<PreviewMediaProps> = ({ 
  previewMedia, 
  setPreviewMedia, 
  onChange 
}) => {
  const [isGeneratingPoster, setIsGeneratingPoster] = React.useState(false);

  const handleMediaUpload = async (mediaType: 'image' | 'video') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = mediaType === 'image' ? 'image/*' : 'video/*';
    
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
      
      // Check file size (max 50MB for videos, 5MB for images)
      const maxSize = mediaType === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(`Datei zu groß. Maximum: ${mediaType === 'image' ? '5MB' : '50MB'}`);
        return;
      }
      
      const url = URL.createObjectURL(file);
      const newMediaData: { type: 'image' | 'video'; url: string; posterUrl?: string } = { type: mediaType, url };
      
      // Auto-generate poster for videos
      if (mediaType === 'video') {
        try {
          setIsGeneratingPoster(true);
          const uploadHandler = createLocalUploadHandler();
          const posterBlob = await extractVideoPosterFrame(file, 2);
          const posterUrl = await uploadHandler(posterBlob, `${file.name}_poster.png`);
          
          newMediaData.posterUrl = posterUrl;
          toast.success('Video hochgeladen und Poster generiert');
        } catch (error) {
          console.error('Failed to generate poster:', error);
          toast.warning('Video hochgeladen, aber Poster-Generierung fehlgeschlagen');
        } finally {
          setIsGeneratingPoster(false);
        }
      } else {
        toast.success('Bild erfolgreich hochgeladen');
      }
      
      setPreviewMedia(newMediaData);
      
      // Update parent component
      onChange({ 
        previewMediaType: mediaType, 
        previewMediaUrl: url,
        posterUrl: newMediaData.posterUrl
      });
    };
    
    input.click();
  };

  const handleRegeneratePoster = async () => {
    if (previewMedia.type !== 'video' || !previewMedia.url) return;
    
    try {
      setIsGeneratingPoster(true);
      const uploadHandler = createLocalUploadHandler();
      const posterBlob = await extractVideoPosterFrame(previewMedia.url, 2);
      const posterUrl = await uploadHandler(posterBlob, 'regenerated_poster.png');
      
      const updatedMedia = { ...previewMedia, posterUrl };
      setPreviewMedia(updatedMedia);
      
      onChange({ 
        previewMediaType: previewMedia.type, 
        previewMediaUrl: previewMedia.url,
        posterUrl
      });
      
      toast.success('Poster erfolgreich regeneriert');
    } catch (error) {
      console.error('Failed to regenerate poster:', error);
      toast.error('Poster-Regenerierung fehlgeschlagen');
    } finally {
      setIsGeneratingPoster(false);
    }
  };

  const handleCustomThumbnailUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
      
      const thumbnailUrl = URL.createObjectURL(file);
      const updatedMedia = { ...previewMedia, posterUrl: thumbnailUrl };
      setPreviewMedia(updatedMedia);
      
      onChange({ 
        previewMediaType: previewMedia.type, 
        previewMediaUrl: previewMedia.url,
        posterUrl: thumbnailUrl
      });
      
      toast.success('Custom Thumbnail hochgeladen');
    };
    
    input.click();
  };

  return (
    <div className="mt-4 mb-4">
      <div className="aspect-video rounded-md overflow-hidden bg-jillr-darkBlue/30 border border-jillr-border/30 relative">
        {previewMedia.url ? (
          previewMedia.type === 'video' ? (
            <>
              <video 
                src={previewMedia.url}
                className="w-full h-full object-cover"
                controls
                poster={previewMedia.posterUrl}
              />
              {isGeneratingPoster && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-white text-sm">Poster wird generiert...</div>
                </div>
              )}
            </>
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
      
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
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
        
        {/* Video-specific controls */}
        {previewMedia.type === 'video' && previewMedia.url && (
          <>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleRegeneratePoster}
              disabled={isGeneratingPoster}
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              Poster regenerieren
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCustomThumbnailUpload}
              className="flex items-center gap-1"
            >
              <Camera className="h-4 w-4" />
              Custom Thumbnail
            </Button>
          </>
        )}
      </div>
      
      {/* Poster preview for videos */}
      {previewMedia.type === 'video' && previewMedia.posterUrl && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">Generiertes Poster:</p>
          <div className="w-20 h-12 rounded border overflow-hidden">
            <img 
              src={previewMedia.posterUrl} 
              alt="Generated poster" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewMedia;
