
import React, { useState } from 'react';
import { Upload, MessageCircle, Share2, Facebook, Twitter, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ChallengeActionsProps } from './types';
import { shareOnPlatform } from '@/utils/challenge/sharing';
import { Link } from 'react-router-dom';

export const ChallengeActions: React.FC<ChallengeActionsProps> = ({ 
  handleJoinClick, 
  requestCoachTip, 
  shareChallenge, 
  coachTip, 
  isLoadingTip,
  challenge 
}) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleShareClick = () => {
    if (navigator.share) {
      shareChallenge();
    } else {
      setShareDialogOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 sticky bottom-0 md:relative bg-gradient-to-t from-background to-transparent pb-4 pt-2 md:bg-none">
      <Button 
        className="neon-button w-full py-6 text-lg"
        onClick={handleJoinClick}
        asChild
      >
        <Link to="/content-editor">
          <Upload size={20} className="mr-2" />
          Jetzt an der Challenge teilnehmen
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={requestCoachTip}
            >
              <MessageCircle size={18} className="mr-2" />
              Tipp vom KI-Coach
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tipp vom KI-Coach</DialogTitle>
              <DialogDescription>
                Spezifische Empfehlungen für deine "{challenge.type}"-Challenge
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isLoadingTip ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-jillr-neonPurple"></div>
                </div>
              ) : (
                <div className="whitespace-pre-line text-md">{coachTip}</div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleShareClick}
            >
              <Share2 size={18} className="mr-2" />
              Teilen & XP verdienen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Challenge teilen</DialogTitle>
              <DialogDescription>
                Teile diese Challenge mit Freunden und verdiene XP!
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  shareOnPlatform(challenge, 'facebook');
                  setShareDialogOpen(false);
                }}
              >
                <Facebook size={18} className="text-blue-600" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  shareOnPlatform(challenge, 'twitter');
                  setShareDialogOpen(false);
                }}
              >
                <Twitter size={18} className="text-sky-500" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  shareOnPlatform(challenge, 'linkedin');
                  setShareDialogOpen(false);
                }}
              >
                <Linkedin size={18} className="text-blue-700" />
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  shareOnPlatform(challenge, 'whatsapp');
                  setShareDialogOpen(false);
                }}
              >
                <Send size={18} className="text-green-500" />
                WhatsApp
              </Button>
              <Button 
                className="col-span-2 mt-2"
                onClick={() => {
                  shareChallenge();
                  setShareDialogOpen(false);
                }}
              >
                <Share2 size={18} className="mr-2" />
                Direkter Link teilen
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
