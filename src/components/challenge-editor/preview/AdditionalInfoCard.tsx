
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface AdditionalInfoCardProps {
  data: any;
}

const AdditionalInfoCard: React.FC<AdditionalInfoCardProps> = ({ data }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="font-medium flex items-center gap-2">
          <Info className="h-5 w-5 text-jillr-neonPurple" />
          Additional Information
        </h4>
        
        <div className="mt-4 space-y-2 text-sm">
          {data.formatRequirements && data.formatRequirements !== 'none' && (
            <p>Format: {data.formatRequirements}</p>
          )}
          
          {data.maxParticipants > 0 && (
            <p>Limited to {data.maxParticipants} participants</p>
          )}
          
          {data.licenseRights && (
            <p>Company can reuse content</p>
          )}
          
          {data.contentGuidelines && (
            <div>
              <p className="font-medium">Content guidelines:</p>
              <p className="text-muted-foreground">{data.contentGuidelines.substring(0, 100)}{data.contentGuidelines.length > 100 ? '...' : ''}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoCard;
