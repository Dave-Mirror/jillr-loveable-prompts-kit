
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export interface ChallengeType {
  id: string;
  label: string;
  description: string;
}

export const challengeTypes: ChallengeType[] = [
  { id: 'photo', label: 'Photo Challenge', description: 'Users submit and rate photos' },
  { id: 'video', label: 'Video Challenge', description: 'Short videos on TikTok, Instagram, or Jillr' },
  { id: 'location', label: 'Location-based Challenge', description: 'Geofencing, QR codes, AR elements' },
  { id: 'ar', label: 'AR Challenge', description: 'Hidden Easter eggs or virtual items' },
  { id: 'rating', label: 'Rating Challenge', description: 'Users rate products or places' },
  { id: 'fitness', label: 'Fitness Challenge', description: 'Track steps, use wearables, complete sports tasks' },
  { id: 'quiz', label: 'Quiz Challenge', description: 'Knowledge questions or multiple-choice tests' },
  { id: 'team', label: 'Team Challenge', description: 'Group competitions with rankings & leaderboards' },
  { id: 'live', label: 'Live Event Challenge', description: 'Interactive events with live rewards' },
];

interface ChallengeTypeSelectorProps {
  selectedTypes: string[];
  onTypeChange: (typeId: string) => void;
}

const ChallengeTypeSelector: React.FC<ChallengeTypeSelectorProps> = ({ 
  selectedTypes, 
  onTypeChange 
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Challenge Type</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select one or more challenge types that describe your campaign (multiple selection possible).
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challengeTypes.map((type) => (
          <Card 
            key={type.id} 
            className={`
              cursor-pointer transition-all
              ${selectedTypes.includes(type.id) ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
            `}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <Checkbox 
                id={`type-${type.id}`}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => onTypeChange(type.id)}
              />
              <div>
                <label 
                  htmlFor={`type-${type.id}`}
                  className="font-medium text-base cursor-pointer"
                >
                  {type.label}
                </label>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChallengeTypeSelector;
