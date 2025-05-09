
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext } from 'react-hook-form';

const TermsCheckbox: React.FC = () => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              I accept the UGC Guidelines
            </FormLabel>
            <FormDescription>
              By submitting this content, you grant permission for its use as per our User Generated Content Guidelines.
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TermsCheckbox;
