
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ARScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanComplete?: (result: string) => void;
  scanType?: 'qr' | 'ar' | 'nfc';
  title?: string;
  description?: string;
}

const ARScanner: React.FC<ARScannerProps> = ({ 
  open, 
  onOpenChange, 
  onScanComplete,
  scanType = 'qr',
  title = 'Scan QR Code',
  description = 'Point your camera at the QR code to scan'
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const startScanning = async () => {
    setScanning(true);
    
    if (videoRef.current) {
      try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        videoRef.current.srcObject = stream;
        
        // Simulate a successful scan after 3 seconds (in a real app, you'd use a QR code library)
        setTimeout(() => {
          handleScanSuccess('mock-scan-result');
        }, 3000);
        
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast({
          title: 'Camera Error',
          description: 'Unable to access your camera. Please check permissions.',
          variant: 'destructive'
        });
        setScanning(false);
      }
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  const handleScanSuccess = (result: string) => {
    stopScanning();
    setScanSuccess(true);
    
    // Notify parent component of successful scan
    if (onScanComplete) {
      onScanComplete(result);
    }
    
    // Reset state after 2 seconds
    setTimeout(() => {
      setScanSuccess(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleClose = () => {
    stopScanning();
    setScanSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{scanSuccess ? 'Scan Complete!' : title}</DialogTitle>
          <DialogDescription>
            {scanSuccess 
              ? 'Successfully scanned. Processing result...' 
              : description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center space-y-4">
          {scanSuccess ? (
            <div className="flex flex-col items-center space-y-2 py-8">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-center font-medium">Scan successful!</p>
            </div>
          ) : scanning ? (
            <div className="relative w-full aspect-square rounded-md overflow-hidden border border-input">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-2 border-primary/60 rounded-md" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <Button onClick={startScanning}>Start Scanning</Button>
            </div>
          )}
        </div>
        
        {scanning && !scanSuccess && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={stopScanning}>Cancel</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ARScanner;
