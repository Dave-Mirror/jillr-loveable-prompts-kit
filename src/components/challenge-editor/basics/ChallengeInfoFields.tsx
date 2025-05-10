
import React from 'react';
import { FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ChallengeInfoFieldsProps {
  title: string;
  description: string;
  onChange: (field: string, value: string) => void;
}

const ChallengeInfoFields: React.FC<ChallengeInfoFieldsProps> = ({
  title,
  description,
  onChange
}) => {
  return (
    <div className="grid gap-4 py-4">
      <FormItem>
        <FormLabel>Challenge Title</FormLabel>
        <FormControl>
          <Input 
            placeholder="e.g., Spring Style Refresh" 
            value={title}
            onChange={(e) => onChange('title', e.target.value)}
            name="title"
          />
        </FormControl>
        <FormDescription>
          Create a catchy, clear title that describes your challenge
        </FormDescription>
      </FormItem>

      <FormItem>
        <FormLabel>Challenge Description</FormLabel>
        <FormControl>
          <Textarea 
            placeholder="e.g., Share your amazing hair transformation and secure a discount on your next visit." 
            className="min-h-[120px]"
            value={description}
            onChange={(e) => onChange('description', e.target.value)}
            name="description"
          />
        </FormControl>
        <FormDescription>
          Clearly explain what participants need to do to complete the challenge
        </FormDescription>
      </FormItem>
    </div>
  );
};

export default ChallengeInfoFields;
