
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { whenOptions, thenOptions } from './config/triggerOptions';

interface TriggerBasicSettingsProps {
  triggerCondition: string;
  setTriggerCondition: (value: string) => void;
  triggerAction: string;
  setTriggerAction: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  triggerType: 'personal' | 'brand';
}

const TriggerBasicSettings: React.FC<TriggerBasicSettingsProps> = ({
  triggerCondition,
  setTriggerCondition,
  triggerAction,
  setTriggerAction,
  description,
  setDescription,
  triggerType
}) => {
  // Filter options based on triggerType
  const filteredWhenOptions = triggerType === 'brand' 
    ? whenOptions.filter(o => ['location', 'time', 'weather', 'activity'].includes(o.category)) 
    : whenOptions;
    
  const filteredThenOptions = triggerType === 'brand'
    ? thenOptions.filter(o => ['reward', 'challenge', 'brand', 'notification'].includes(o.category))
    : thenOptions;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">WENN...</h3>
        <Select value={triggerCondition} onValueChange={setTriggerCondition}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle eine Bedingung" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Zeit</SelectLabel>
              {filteredWhenOptions.filter(o => o.category === 'time').map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Ort</SelectLabel>
              {filteredWhenOptions.filter(o => o.category === 'location').map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Aktivität</SelectLabel>
              {filteredWhenOptions.filter(o => o.category === 'activity').map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Wetter</SelectLabel>
              {filteredWhenOptions.filter(o => o.category === 'weather').map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
            {triggerType !== 'brand' && (
              <>
                <SelectGroup>
                  <SelectLabel>Stimmung</SelectLabel>
                  {filteredWhenOptions.filter(o => o.category === 'mood').map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Social Media</SelectLabel>
                  {filteredWhenOptions.filter(o => o.category === 'social').map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Erfolge</SelectLabel>
                  {filteredWhenOptions.filter(o => o.category === 'achievement').map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectGroup>
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">DANN...</h3>
        <Select value={triggerAction} onValueChange={setTriggerAction}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle eine Aktion" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Belohnungen</SelectLabel>
              {filteredThenOptions.filter(o => o.category === 'reward').map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Challenges</SelectLabel>
              {filteredThenOptions.filter(o => o.category === 'challenge').map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
            {triggerType !== 'brand' && (
              <SelectGroup>
                <SelectLabel>Avatar</SelectLabel>
                {filteredThenOptions.filter(o => o.category === 'avatar').map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            )}
            <SelectGroup>
              <SelectLabel>Benachrichtigungen</SelectLabel>
              {filteredThenOptions.filter(o => o.category === 'notification').map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectGroup>
            {triggerType === 'brand' && (
              <SelectGroup>
                <SelectLabel>Marken-Aktionen</SelectLabel>
                {filteredThenOptions.filter(o => o.category === 'brand').map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">Beschreibung (Optional)</h3>
        <Input 
          placeholder="Beschreibung für diesen Trigger" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-jillr-darkBlue border-gray-700"
        />
      </div>
    </div>
  );
};

export default TriggerBasicSettings;
