
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift, Package, Target, Users, MapPin, Trophy, Coins, Clock } from 'lucide-react';

interface ItemDetailsProps {
  selectedItem: {
    id: string;
    type: string;
    title: string;
    description: string;
    challengeId?: string;
  } | null;
  onClose: () => void;
  onAction: () => void;
}

const ItemDetailsDialog: React.FC<ItemDetailsProps> = ({ 
  selectedItem, 
  onClose,
  onAction
}) => {
  if (!selectedItem) return null;

  const getActionText = () => {
    switch (selectedItem.type) {
      case 'easteregg': return 'Collect Easter Egg';
      case 'drop': return 'Claim Product Drop';
      case 'challenge': return 'Join Challenge';
      case 'teamevent': return 'Join Team Event';
      default: return 'View Details';
    }
  };

  const getIcon = () => {
    switch (selectedItem.type) {
      case 'easteregg': return <Gift className="h-6 w-6 text-yellow-500" />;
      case 'drop': return <Package className="h-6 w-6 text-blue-500" />;
      case 'challenge': return <Target className="h-6 w-6 text-red-500" />;
      case 'teamevent': return <Users className="h-6 w-6 text-purple-500" />;
      default: return <MapPin className="h-6 w-6" />;
    }
  };

  const getReward = () => {
    switch (selectedItem.type) {
      case 'easteregg': return { type: 'XP', amount: 25 };
      case 'drop': return { type: 'Coins', amount: 50 };
      case 'challenge': return { type: 'XP', amount: 100 };
      case 'teamevent': return { type: 'XP & Coins', amount: '75 + 25' };
      default: return null;
    }
  };

  const reward = getReward();

  return (
    <Dialog open={Boolean(selectedItem)} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {getIcon()}
            <DialogTitle>{selectedItem.title}</DialogTitle>
          </div>
          <DialogDescription>
            {selectedItem.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {reward && (
            <div className="flex items-center justify-between p-3 bg-background/80 rounded-lg border">
              <div className="flex items-center gap-2">
                {reward.type.includes('XP') && <Trophy className="h-5 w-5 text-yellow-500" />}
                {reward.type.includes('Coins') && <Coins className="h-5 w-5 text-blue-500" />}
                <span className="font-medium">Reward</span>
              </div>
              <div className="text-sm font-semibold">
                +{reward.amount} {reward.type}
              </div>
            </div>
          )}

          {selectedItem.type === 'challenge' && (
            <div className="flex items-center justify-between p-3 bg-background/80 rounded-lg border">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                <span className="font-medium">Duration</span>
              </div>
              <div className="text-sm">7 days</div>
            </div>
          )}
          
          {selectedItem.type === 'easteregg' && (
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-sm font-medium text-green-600">First to find! +10 bonus XP</p>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onAction}>
            {getActionText()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailsDialog;
