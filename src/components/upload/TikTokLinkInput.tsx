
import React from 'react';
import { LinkIcon } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const TikTokLinkInput: React.FC = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="tiktokLink"
      render={({ field }) => (
        <FormItem>
          <FormLabel>TikTok Link</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-2">
              <LinkIcon className="text-jillr-neonPink" size={18} />
              <Input placeholder="https://www.tiktok.com/@username/video/..." {...field} />
            </div>
          </FormControl>
          <FormDescription>
            Add the link to your TikTok video for this challenge
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TikTokLinkInput;
