
import { useState } from 'react';
import { useDataPermissions } from '@/hooks/useDataPermissions';
import { DataType } from '@/utils/data-vault/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useDataPermissionPrompt = (campaignId: string, campaignName: string) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDataType, setCurrentDataType] = useState<DataType>('location');
  const { updatePermission, getXpReward, getPermissionStatus } = useDataPermissions();
  const { user } = useAuth();
  const { toast } = useToast();

  const checkAndRequestPermission = (dataType: DataType): boolean => {
    // If user already granted permission, return true
    if (getPermissionStatus(dataType)) {
      return true;
    }

    // If user is not logged in, show toast and return false
    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Bitte melde dich an, um an dieser Challenge teilzunehmen.",
        variant: "default"
      });
      return false;
    }

    // Show permission dialog
    setCurrentDataType(dataType);
    setIsDialogOpen(true);
    return false;
  };

  const handleConfirmPermission = async (isPermanent: boolean): Promise<boolean> => {
    try {
      const success = await updatePermission(currentDataType, true);
      
      // Here you would also track that this permission was granted specifically for this campaign
      // This would likely involve another table in your database
      
      return success;
    } catch (error) {
      console.error('Error confirming permission:', error);
      return false;
    }
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    currentDataType,
    xpReward: currentDataType ? getXpReward(currentDataType) : 0,
    campaignName,
    checkAndRequestPermission,
    handleConfirmPermission
  };
};
