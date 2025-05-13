
import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Scan, Camera, X } from 'lucide-react';

interface ARScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanComplete: (result: string) => void;
  title?: string;
  description?: string;
}

const ARScanner: React.FC<ARScannerProps> = ({ 
  open, 
  onOpenChange,
  onScanComplete,
  title = "Scan AR Element",
  description = "Point your camera at a QR code or AR marker to interact with it."
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Start camera when dialog opens
  useEffect(() => {
    if (open && !isCameraActive) {
      startCamera();
    }
    
    // Clean up camera when dialog closes
    return () => {
      if (isCameraActive) {
        stopCamera();
      }
    };
  }, [open]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setHasPermission(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const handleDialogClose = () => {
    stopCamera();
    onOpenChange(false);
  };

  // Mock function to simulate a scan
  const simulateScan = () => {
    // In a real implementation, this would be replaced with actual QR code scanning logic
    const mockQrResult = "jillr:easteregg:123456";
    onScanComplete(mockQrResult);
    handleDialogClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md bg-jillr-dark border-jillr-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5 text-jillr-neonPurple" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full aspect-square max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-jillr-neonPurple border-dashed">
            {hasPermission === false ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-jillr-darkAccent">
                <Camera className="h-10 w-10 text-jillr-neonPurple/50 mb-2" />
                <p className="text-sm">Camera access is required to scan codes.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={startCamera}
                >
                  Request Access
                </Button>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-[3rem] sm:border-[5rem] border-jillr-dark/80 box-border"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2/3 h-2/3 border-2 border-jillr-neonPurple rounded-lg animate-pulse"></div>
                </div>
              </>
            )}
          </div>
          
          <div className="flex gap-2 w-full justify-between">
            <Button 
              variant="outline" 
              onClick={handleDialogClose}
              className="flex-1"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            
            <Button 
              onClick={simulateScan}
              className="flex-1"
            >
              <Scan className="mr-2 h-4 w-4" />
              Scan Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARScanner;
