
import React from 'react';
import { DataType, DATA_PERMISSION_DEFAULTS } from '@/utils/data-vault/types';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Zap } from 'lucide-react';

interface DataPermissionToggleProps {
  type: DataType;
  enabled: boolean;
  onToggle: (type: DataType, enabled: boolean) => Promise<boolean>;
  isLoading: boolean;
}

const getIconForType = (type: DataType) => {
  switch (type) {
    case 'location':
      return '📍';
    case 'tracking':
      return '📊';
    case 'ugc':
      return '🖼️';
    case 'activity':
      return '🔍';
    default:
      return '📄';
  }
};

const getTitleForType = (type: DataType) => {
  switch (type) {
    case 'location':
      return 'Standortdaten';
    case 'tracking':
      return 'App-Nutzung';
    case 'ugc':
      return 'Erstellte Inhalte (UGC)';
    case 'activity':
      return 'Challenge-Historie';
    default:
      return type;
  }
};

const DataPermissionToggle: React.FC<DataPermissionToggleProps> = ({
  type,
  enabled,
  onToggle,
  isLoading
}) => {
  const { xpReward, description } = DATA_PERMISSION_DEFAULTS[type];
  
  const handleToggle = async (checked: boolean) => {
    await onToggle(type, checked);
  };
  
  return (
    <Card className={enabled ? "border-jillr-neonPurple/50" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">{getIconForType(type)}</span>
            {getTitleForType(type)}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch 
              checked={enabled}
              onCheckedChange={handleToggle}
              disabled={isLoading}
              className="data-[state=checked]:bg-jillr-neonPurple"
            />
            <span className="text-sm text-muted-foreground">
              {enabled ? 'Freigegeben' : 'Nicht freigegeben'}
            </span>
          </div>
          <Badge 
            variant={enabled ? "default" : "outline"}
            className={enabled ? "bg-jillr-neonPurple" : "text-muted-foreground"}
          >
            <Zap className="h-3 w-3 mr-1" />
            {xpReward} XP
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataPermissionToggle;
