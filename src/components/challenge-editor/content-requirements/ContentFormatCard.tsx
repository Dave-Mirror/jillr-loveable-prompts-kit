
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface ContentFormatCardProps {
  format: {
    id: string;
    label: string;
    config?: string;
  };
  selected: boolean;
  onToggle: (formatId: string) => void;
}

const ContentFormatCard: React.FC<ContentFormatCardProps> = ({ 
  format, 
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
          id={`format-${format.id}`}
          checked={selected}
          onCheckedChange={() => onToggle(format.id)}
        />
        <div className="w-full">
          <label 
            htmlFor={`format-${format.id}`}
            className="font-medium text-base cursor-pointer"
          >
            {format.label}
          </label>
          
          {format.config === 'duration' && selected && (
            <div className="mt-2">
              <label className="text-sm text-muted-foreground">Duration (seconds)</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="Min"
                  className="w-20"
                  min={1}
                />
                <span>to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="w-20"
                  min={1}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentFormatCard;
