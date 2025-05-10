
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, title, videoUrl }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-11/12">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogClose className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Schließen</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="aspect-video w-full">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-cover rounded-md"
          >
            Dein Browser unterstützt keine Videos.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
