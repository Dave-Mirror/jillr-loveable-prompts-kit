
import React from 'react';
import { Upload, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type ChallengeActionsProps = {
  handleJoinClick: () => void;
  requestCoachTip: () => void;
  shareChallenge: () => void;
  coachTip: string;
  isLoadingTip: boolean;
  challenge: any;
}

export const ChallengeActions: React.FC<ChallengeActionsProps> = ({ 
  handleJoinClick, 
  requestCoachTip, 
  shareChallenge, 
  coachTip, 
  isLoadingTip,
  challenge 
}) => {
  return (
    <div className="flex flex-col gap-4 sticky bottom-0 md:relative bg-gradient-to-t from-background to-transparent pb-4 pt-2 md:bg-none">
      <Button 
        className="neon-button w-full py-6 text-lg"
        onClick={handleJoinClick}
      >
        <Upload size={20} className="mr-2" />
        Jetzt an der Challenge teilnehmen
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
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={shareChallenge}
        >
          <Share2 size={18} className="mr-2" />
          Teilen & XP verdienen
        </Button>
      </div>
    </div>
  );
};
