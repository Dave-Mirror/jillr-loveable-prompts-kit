
import React from 'react';
import { FormLabel, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface BrandingIntegrationControlProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const BrandingIntegrationControl: React.FC<BrandingIntegrationControlProps> = ({ 
  value, 
  onChange 
}) => {
  return (
    <div className="space-y-3">
      <FormLabel>Automatic Branding Integration</FormLabel>
      <FormDescription>
        Automatically add your brand logos to uploaded content
      </FormDescription>
      <RadioGroup 
        defaultValue={value ? "yes" : "no"}
        onValueChange={(value) => onChange(value === "yes")}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="branding-yes" />
          <label htmlFor="branding-yes" className="cursor-pointer">Yes</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="branding-no" />
          <label htmlFor="branding-no" className="cursor-pointer">No</label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default BrandingIntegrationControl;
