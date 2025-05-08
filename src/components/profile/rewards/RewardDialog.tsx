
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserReward } from '@/utils/challenge/rewards/types';
import { Award, Gift, Ticket, Clipboard, Check, ChevronRight, QrCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RewardDialogProps {
  selectedReward: UserReward | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaimReward: (reward: UserReward) => Promise<void>;
  onNavigateToReward: (reward: UserReward) => void;
}

const RewardDialog: React.FC<RewardDialogProps> = ({
  selectedReward,
  open,
  onOpenChange,
  onClaimReward,
  onNavigateToReward
}) => {
  if (!selectedReward) return null;

  // Get icon based on reward type
  const getRewardIcon = () => {
    switch (selectedReward.type) {
      case 'voucher':
        return <Gift className="h-6 w-6 text-jillr-neonPink" />;
      case 'ticket':
        return <Ticket className="h-6 w-6 text-jillr-neonBlue" />;
      case 'badge':
        return <Award className="h-6 w-6 text-jillr-neonGreen" />;
      default:
        return <Award className="h-6 w-6 text-jillr-neonPurple" />;
    }
  };

  // Get color class based on reward type
  const getRewardColorClass = () => {
    switch (selectedReward.type) {
      case 'voucher':
        return 'from-jillr-neonPink/20 to-jillr-neonPurple/20 border-jillr-neonPink/30';
      case 'ticket':
        return 'from-jillr-neonBlue/20 to-jillr-neonGreen/20 border-jillr-neonBlue/30';
      case 'badge':
        return 'from-jillr-neonGreen/20 to-jillr-neonBlue/20 border-jillr-neonGreen/30';
      default:
        return 'from-jillr-neonPurple/20 to-jillr-darkBlue/40 border-jillr-neonPurple/30';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-0 p-0 overflow-hidden">
        <div className={`bg-gradient-to-br ${getRewardColorClass()} border rounded-lg p-0.5`}>
          <div className="bg-black/90 rounded-md p-5 space-y-5">
            <DialogHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge 
                  variant="outline" 
                  className="uppercase text-xs border-jillr-neonPurple/30 bg-jillr-neonPurple/10"
                >
                  {selectedReward.type}
                </Badge>
                {selectedReward.claimed && (
                  <Badge className="bg-green-500/80">
                    <Check className="h-3 w-3 mr-1" />
                    Claimed
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-3 bg-jillr-darkBlue/50 rounded-full animate-glow">
                  {getRewardIcon()}
                </div>
                <DialogTitle className="text-xl">{selectedReward.name}</DialogTitle>
              </div>
              
              <DialogDescription className="text-base text-white/80">
                {selectedReward.description}
              </DialogDescription>
            </DialogHeader>

            {selectedReward.imageUrl && (
              <div className="w-full h-40 rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={selectedReward.imageUrl} 
                  alt={selectedReward.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {selectedReward.details && (
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-white/70">{selectedReward.details}</p>
              </div>
            )}

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              {!selectedReward.claimed ? (
                <Button 
                  onClick={() => onClaimReward(selectedReward)}
                  className="w-full sm:w-auto bg-gradient-to-r from-jillr-neonPurple to-jillr-neonBlue hover:opacity-90"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Belohnung beanspruchen
                </Button>
              ) : selectedReward.claimUrl ? (
                <Button 
                  onClick={() => onNavigateToReward(selectedReward)}
                  variant="outline" 
                  className="w-full sm:w-auto border-jillr-neonPurple/30 hover:bg-jillr-neonPurple/20"
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  Zum Einlösen
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-jillr-neonPurple/30 hover:bg-jillr-neonPurple/20"
                  onClick={() => onOpenChange(false)}
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  QR-Code anzeigen
                </Button>
              )}
              
              {selectedReward.claimCode && (
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-md">
                  <code className="text-jillr-neonGreen text-sm">{selectedReward.claimCode}</code>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6"
                    onClick={() => navigator.clipboard.writeText(selectedReward.claimCode || '')}
                  >
                    <Clipboard className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardDialog;
