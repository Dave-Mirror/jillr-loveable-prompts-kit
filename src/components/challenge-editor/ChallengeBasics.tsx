
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

const challengeTypes = [
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

const ChallengeBasics = ({ data, onChange }) => {
  const handleTypeChange = (typeId) => {
    const newTypes = data.type.includes(typeId)
      ? data.type.filter(id => id !== typeId)
      : [...data.type, typeId];
    
    onChange({ type: newTypes });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Challenge Type</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select one or more challenge types that describe your campaign (multiple selection possible).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challengeTypes.map((type) => (
            <Card key={type.id} className={`
              cursor-pointer transition-all
              ${data.type.includes(type.id) ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
            `}>
              <CardContent className="p-4 flex items-start gap-3">
                <Checkbox 
                  id={`type-${type.id}`}
                  checked={data.type.includes(type.id)}
                  onCheckedChange={() => handleTypeChange(type.id)}
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

      <div className="grid gap-4 py-4">
        <FormField
          name="title"
          render={() => (
            <FormItem>
              <FormLabel>Challenge Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Spring Style Refresh" 
                  value={data.title}
                  onChange={(e) => onChange({ title: e.target.value })}
                />
              </FormControl>
              <FormDescription>
                Create a catchy, clear title that describes your challenge
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={() => (
            <FormItem>
              <FormLabel>Challenge Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="e.g., Share your amazing hair transformation and secure a discount on your next visit." 
                  className="min-h-[120px]"
                  value={data.description}
                  onChange={(e) => onChange({ description: e.target.value })}
                />
              </FormControl>
              <FormDescription>
                Clearly explain what participants need to do to complete the challenge
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="mt-2">
          <p className="text-sm font-medium mb-1">Challenge Preview URL</p>
          <div className="p-3 bg-muted rounded-md text-sm">
            {data.title 
              ? `jillr.app/challenge/${data.title.toLowerCase().replace(/\s+/g, '-')}`
              : 'jillr.app/challenge/your-challenge-name'}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            This URL will be automatically generated for marketing & social media sharing
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeBasics;
