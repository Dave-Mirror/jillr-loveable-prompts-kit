
import React, { useState } from 'react';
import { UploadIcon, CheckSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface VideoUploadSectionProps {
  onUploadComplete: (url: string) => void;
}

const VideoUploadSection: React.FC<VideoUploadSectionProps> = ({ onUploadComplete }) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // In a real implementation, you would upload to Cloudinary here
    // For now, we'll simulate the upload with a timeout
    
    const file = files[0];
    setIsUploading(true);
    
    setTimeout(() => {
      // Mock upload success - in real app, this would be the Cloudinary response URL
      const mockCloudinaryUrl = `https://res.cloudinary.com/demo/video/upload/mock_${file.name}`;
      setUploadedUrl(mockCloudinaryUrl);
      onUploadComplete(mockCloudinaryUrl);
      setIsUploading(false);
      
      toast({
        title: 'Upload successful',
        description: 'Your video has been uploaded successfully.',
      });
    }, 1500);
  };

  return (
    <div className="p-6 border-2 border-dashed border-jillr-neonPurple/30 rounded-lg text-center">
      <div className="flex flex-col items-center justify-center">
        <UploadIcon className="mb-2 text-jillr-neonPurple h-10 w-10" />
        <h3 className="text-lg font-medium mb-2">Upload your video</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop your video file here, or click to browse
        </p>
        <Input 
          type="file" 
          accept="video/*"
          onChange={handleVideoUpload}
          className="max-w-sm"
          disabled={isUploading}
        />
        {isUploading && (
          <div className="mt-4 text-sm text-blue-400">
            Uploading video...
          </div>
        )}
        {uploadedUrl && (
          <div className="mt-4 text-sm text-green-400">
            <CheckSquare className="inline-block mr-1" size={16} />
            Video uploaded successfully
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploadSection;
