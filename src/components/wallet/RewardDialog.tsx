
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
  reward: UserReward | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaim: (reward: UserReward) => Promise<void>;
  onNavigate: (reward: UserReward) => void;
}

const RewardDialog: React.FC<RewardDialogProps> = ({
  reward,
  open,
  onOpenChange,
  onClaim,
  onNavigate
}) => {
  const { toast } = useToast();

  if (!reward) return null;

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
            {reward.type === 'coupon' && <BadgePercent className="text-yellow-500" />}
            {reward.type === 'product' && <ShoppingBag className="text-jillr-neonBlue" />}
            {reward.type === 'ticket' && <Ticket className="text-jillr-neonPink" />}
            {reward.type === 'access' && <Flame className="text-orange-500" />}
            {reward.type === 'voucher' && <Gift className="text-jillr-neonGreen" />}
            {reward.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative aspect-video rounded-md overflow-hidden mb-4">
          <img 
            src={reward.image} 
            alt={reward.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <p>{reward.description}</p>
          
          {reward.challengeName && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Challenge:</span>
              <Badge variant="outline">{reward.challengeName}</Badge>
            </div>
          )}
          
          {reward.code && (
            <div className="bg-muted p-3 rounded-md flex items-center justify-between">
              <code className="font-mono text-base">{reward.code}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(reward.code!)}
              >
                <Copy size={16} />
              </Button>
            </div>
          )}
          
          {reward.expireDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={14} className="text-muted-foreground" />
              <span>Gültig bis {new Date(reward.expireDate).toLocaleDateString('de-DE')}</span>
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
          
          {!reward.claimed ? (
            <Button 
              className="bg-jillr-neonGreen hover:bg-jillr-neonGreen/80"
              onClick={() => onClaim(reward)}
            >
              <Check size={16} className="mr-2" /> Belohnung beanspruchen
            </Button>
          ) : (
            <Button
              className="bg-jillr-neonBlue hover:bg-jillr-neonBlue/80"
              onClick={() => onNavigate(reward)}
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
