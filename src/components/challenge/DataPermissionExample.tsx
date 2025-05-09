import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useDataPermissionPrompt } from '@/hooks/useDataPermissionPrompt';
import DataPermissionPrompt from './DataPermissionPrompt';

interface DataPermissionExampleProps {
  challenge: any;
}

const DataPermissionExample: React.FC<DataPermissionExampleProps> = ({ challenge }) => {
  const {
    isDialogOpen,
    setIsDialogOpen,
    currentDataType,
    xpReward,
    campaignName,
    checkAndRequestPermission,
    handleConfirmPermission
  } = useDataPermissionPrompt(
    challenge?.id || 'example-challenge',
    challenge?.title || 'Beispiel Challenge'
  );

  const handleParticipate = () => {
    // Check if user has granted location permission
    const hasPermission = checkAndRequestPermission('location');
    
    // If permission is granted, proceed with challenge participation
    if (hasPermission) {
      console.log('User already granted permission, proceeding with challenge');
      // Your code to participate in challenge
    }
    // Otherwise, the dialog will be shown and this function will return
  };

  return (
    <>
      <Button 
        onClick={handleParticipate}
        className="flex gap-2 items-center"
      >
        <Shield className="h-4 w-4" />
        An Challenge teilnehmen
      </Button>

      <DataPermissionPrompt
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        dataType={currentDataType}
        xpReward={xpReward}
        campaignName={campaignName}
        onConfirm={handleConfirmPermission}
      />
    </>
  );
};

export default DataPermissionExample;
