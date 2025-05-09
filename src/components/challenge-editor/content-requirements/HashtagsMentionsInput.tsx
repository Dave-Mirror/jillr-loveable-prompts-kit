
import React from 'react';
import { FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface HashtagsMentionsInputProps {
  value: string;
  onChange: (value: string) => void;
}

const HashtagsMentionsInput: React.FC<HashtagsMentionsInputProps> = ({ 
  value, 
  onChange 
}) => {
  return (
    <FormItem>
      <FormLabel>Required Hashtags & Mentions</FormLabel>
      <FormControl>
        <Input 
          placeholder="#SpringStyleRefresh #MySalonMunich @mysalonmunich" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name="hashtags"
        />
      </FormControl>
      <FormDescription>
        Separate hashtags and mentions with spaces
      </FormDescription>
    </FormItem>
  );
};

export default HashtagsMentionsInput;
