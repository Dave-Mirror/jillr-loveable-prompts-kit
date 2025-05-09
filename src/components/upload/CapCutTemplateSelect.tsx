
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

export const capCutTemplates = [
  { value: 'default', label: 'Default Template' },
  { value: 'creative', label: 'Creative Transitions' },
  { value: 'minimal', label: 'Minimal Clean' },
  { value: 'bold', label: 'Bold Text Effects' },
  { value: 'trendy', label: 'Trendy Style' },
];

const CapCutTemplateSelect: React.FC = () => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="capCutTemplate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>CapCut Template</FormLabel>
          <FormControl>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-jillr-dark px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              {...field}
            >
              {capCutTemplates.map((template) => (
                <option key={template.value} value={template.value}>
                  {template.label}
                </option>
              ))}
            </select>
          </FormControl>
          <FormDescription>
            Select the CapCut template you used for this video
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

export default CapCutTemplateSelect;
