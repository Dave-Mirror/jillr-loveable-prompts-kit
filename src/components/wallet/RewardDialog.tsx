
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Copy, Check, ExternalLink, 
  BadgePercent, ShoppingBag, Ticket, Flame, Gift,
  QrCode, Share2
} from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';
import { useToast } from '@/hooks/use-toast';

interface RewardDialogProps {
  reward: UserReward | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaim: (reward: UserReward) => Promise<void>;
  onNavigate: (reward: UserReward) => void;
  onGenerateQRCode: (reward: UserReward) => void;
}

const RewardDialog: React.FC<RewardDialogProps> = ({
  reward,
  open,
  onOpenChange,
  onClaim,
  onNavigate,
  onGenerateQRCode
}) => {
  const { toast } = useToast();
  const [showQRCode, setShowQRCode] = useState(false);

  if (!reward) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Code kopiert!",
      description: "Der Code wurde in die Zwischenablage kopiert.",
    });
  };

  const shareReward = () => {
    if (navigator.share) {
      navigator.share({
        title: `Meine Jillr Belohnung: ${reward.name}`,
        text: `Ich habe gerade ${reward.name} auf Jillr freigeschaltet! Mach auch mit!`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Teilen nicht unterstützt",
        description: "Dein Browser unterstützt die Teilen-Funktion nicht.",
        variant: "destructive"
      });
    }
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
        
        {showQRCode ? (
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg mb-4">
              {/* Placeholder for QR code - in a real app, this would be an actual QR code */}
              <div className="w-48 h-48 border-2 border-black grid grid-cols-4 grid-rows-4">
                {Array(16).fill(0).map((_, i) => (
                  <div key={i} className={`${Math.random() > 0.7 ? 'bg-black' : 'bg-white'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-center text-muted-foreground mb-2">
              Diesen QR-Code im Geschäft scannen lassen, um deine Belohnung einzulösen.
            </p>
            <p className="text-sm font-medium text-center mb-4">
              Code: {reward.code}
            </p>
            <Button 
              variant="outline" 
              onClick={() => setShowQRCode(false)}
              className="w-full"
            >
              Zurück zu Details
            </Button>
          </div>
        ) : (
          <>
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
              
              {reward.claimed && (reward.type === 'product' || reward.type === 'voucher') && (
                <Button 
                  onClick={() => setShowQRCode(true)}
                  variant="outline"
                  className="w-full"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR-Code anzeigen
                </Button>
              )}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  className="flex-1 sm:flex-initial"
                >
                  Schließen
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={shareReward}
                  className="flex-1 sm:flex-initial"
                >
                  <Share2 size={16} className="mr-2" />
                  Teilen
                </Button>
              </div>
              
              {!reward.claimed ? (
                <Button 
                  className="bg-jillr-neonGreen hover:bg-jillr-neonGreen/80 w-full sm:w-auto"
                  onClick={() => onClaim(reward)}
                >
                  <Check size={16} className="mr-2" /> Belohnung beanspruchen
                </Button>
              ) : (
                <Button
                  className="bg-jillr-neonBlue hover:bg-jillr-neonBlue/80 w-full sm:w-auto"
                  onClick={() => onNavigate(reward)}
                >
                  <ExternalLink size={16} className="mr-2" /> Belohnung einlösen
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RewardDialog;
