
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface PlatformCardProps {
  platform: {
    id: string;
    label: string;
  };
  selected: boolean;
  onToggle: (platformId: string) => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ 
  platform, 
  selected, 
  onToggle 
}) => {
  return (
    <Card className={`
      cursor-pointer transition-all
      ${selected ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
    `}>
      <CardContent className="p-4 flex items-start gap-3">
        <Checkbox 
          id={`platform-${platform.id}`}
          checked={selected}
          onCheckedChange={() => onToggle(platform.id)}
        />
        <label 
          htmlFor={`platform-${platform.id}`}
          className="font-medium cursor-pointer"
        >
          {platform.label}
        </label>
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
