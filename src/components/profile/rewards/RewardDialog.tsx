
import React from 'react';
import { 
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Copy, Check, ExternalLink, 
  BadgePercent, ShoppingBag, Ticket, Flame, Gift 
} from 'lucide-react';
import { UserReward } from '@/utils/challenge/userRewards';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  if (!selectedReward) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Code kopiert!",
      description: "Der Code wurde in die Zwischenablage kopiert.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {selectedReward.type === 'coupon' && <BadgePercent className="text-yellow-500" />}
            {selectedReward.type === 'product' && <ShoppingBag className="text-jillr-neonBlue" />}
            {selectedReward.type === 'ticket' && <Ticket className="text-jillr-neonPink" />}
            {selectedReward.type === 'access' && <Flame className="text-orange-500" />}
            {selectedReward.type === 'voucher' && <Gift className="text-jillr-neonGreen" />}
            {selectedReward.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative aspect-video rounded-md overflow-hidden mb-4">
          <img 
            src={selectedReward.image} 
            alt={selectedReward.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <p>{selectedReward.description}</p>
          
          {selectedReward.challengeName && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Challenge:</span>
              <Badge variant="outline">{selectedReward.challengeName}</Badge>
            </div>
          )}
          
          {selectedReward.code && (
            <div className="bg-muted p-3 rounded-md flex items-center justify-between">
              <code className="font-mono text-base">{selectedReward.code}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(selectedReward.code!)}
              >
                <Copy size={16} />
              </Button>
            </div>
          )}
          
          {selectedReward.expireDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={14} className="text-muted-foreground" />
              <span>Gültig bis {new Date(selectedReward.expireDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Schließen
          </Button>
          
          {!selectedReward.claimed ? (
            <Button 
              className="bg-jillr-neonGreen hover:bg-jillr-neonGreen/80"
              onClick={() => onClaimReward(selectedReward)}
            >
              <Check size={16} className="mr-2" /> Belohnung beanspruchen
            </Button>
          ) : (
            <Button
              className="bg-jillr-neonBlue hover:bg-jillr-neonBlue/80"
              onClick={() => onNavigateToReward(selectedReward)}
            >
              <ExternalLink size={16} className="mr-2" /> Belohnung einlösen
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardDialog;
