
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface TriggerAdvancedSettingsProps {
  frequency: number[];
  setFrequency: (value: number[]) => void;
  priority: number[];
  setPriority: (value: number[]) => void;
  requiresMultipleConditions: boolean;
  setRequiresMultipleConditions: (value: boolean) => void;
}

const TriggerAdvancedSettings: React.FC<TriggerAdvancedSettingsProps> = ({
  frequency,
  setFrequency,
  priority,
  setPriority,
  requiresMultipleConditions,
  setRequiresMultipleConditions
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">Häufigkeit</h3>
          <span className="text-sm text-gray-400">{frequency[0]}x pro Tag</span>
        </div>
        <Slider
          value={frequency}
          onValueChange={setFrequency}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">Priorität</h3>
          <span className="text-sm text-gray-400">{priority[0]}/10</span>
        </div>
        <Slider
          value={priority}
          onValueChange={setPriority}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-300">Mehrfache Bedingungen</h3>
          <Switch 
            checked={requiresMultipleConditions}
            onCheckedChange={setRequiresMultipleConditions}
          />
        </div>
        <p className="text-xs text-gray-400">
          Wenn aktiviert, muss dieser Trigger zusammen mit anderen Bedingungen erfüllt sein
        </p>
      </div>
    </div>
  );
};

export default TriggerAdvancedSettings;
