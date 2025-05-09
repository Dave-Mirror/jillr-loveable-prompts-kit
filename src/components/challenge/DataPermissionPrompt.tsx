
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield, Zap } from 'lucide-react';
import { DataType } from '@/utils/data-vault/types';
import { useToast } from '@/hooks/use-toast';

interface DataPermissionPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataType: DataType;
  xpReward: number;
  campaignName: string;
  onConfirm: (isPermanent: boolean) => Promise<boolean>;
}

const DataPermissionPrompt: React.FC<DataPermissionPromptProps> = ({
  open,
  onOpenChange,
  dataType,
  xpReward,
  campaignName,
  onConfirm
}) => {
  const [isPermanent, setIsPermanent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getDataTypeLabel = (type: DataType): string => {
    switch (type) {
      case 'location': return 'Standortdaten';
      case 'tracking': return 'App-Nutzungsdaten';
      case 'ugc': return 'erstellte Inhalte (UGC)';
      case 'activity': return 'Challenge-Aktivitäten';
      default: return type;
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const success = await onConfirm(isPermanent);
      if (success) {
        toast({
          title: "Datenfreigabe bestätigt",
          description: `Du erhältst ${xpReward} XP für deine Teilnahme!`,
        });
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error granting data permission:', error);
      toast({
        title: "Fehler",
        description: "Die Datenfreigabe konnte nicht gespeichert werden.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-jillr-neonPurple" />
            <DialogTitle>Datenfreigabe für diese Challenge</DialogTitle>
          </div>
          <DialogDescription>
            Um an "{campaignName}" teilzunehmen, kannst du deine {getDataTypeLabel(dataType)} freigeben.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between p-4 border border-jillr-neonPurple/30 bg-jillr-dark/80 rounded-md">
          <div className="text-sm">
            XP-Belohnung für deine Datenfreigabe
          </div>
          <div className="flex items-center text-jillr-neonPurple font-bold">
            <Zap className="h-4 w-4 mr-1" />
            {xpReward} XP
          </div>
        </div>

        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="permanent" 
              checked={isPermanent}
              onCheckedChange={(checked) => setIsPermanent(checked === true)}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="permanent">
                Daten dauerhaft freigeben
              </Label>
              <p className="text-sm text-muted-foreground">
                Wenn aktiviert, werden deine Daten auch für künftige Challenges freigegeben. 
                Du kannst diese Entscheidung jederzeit in deinen Einstellungen ändern.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Ablehnen
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80"
          >
            {isLoading ? "Wird gespeichert..." : "Freigeben und XP erhalten"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DataPermissionPrompt;
