
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdvancedSettings = ({ data, onChange }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-2">Additional Content Requirements</h3>
        
        <FormField
          name="formatRequirements"
          render={() => (
            <FormItem>
              <FormLabel>Format Requirements</FormLabel>
              <FormControl>
                <Select 
                  value={data.formatRequirements} 
                  onValueChange={(value) => onChange({ formatRequirements: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format requirements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No specific requirements</SelectItem>
                    <SelectItem value="portrait">Portrait orientation (9:16)</SelectItem>
                    <SelectItem value="landscape">Landscape orientation (16:9)</SelectItem>
                    <SelectItem value="square">Square (1:1)</SelectItem>
                    <SelectItem value="custom">Custom requirements</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Specify orientation and aspect ratio for submitted content
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          name="contentGuidelines"
          render={() => (
            <FormItem>
              <FormLabel>Content Guidelines</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Guidelines for UGC quality and brand conformity..."
                  className="min-h-[100px]"
                  value={data.contentGuidelines}
                  onChange={(e) => onChange({ contentGuidelines: e.target.value })}
                />
              </FormControl>
              <FormDescription>
                Provide detailed guidelines for the quality and style of content you're looking for
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormItem className="space-y-3">
          <FormLabel>License Rights & Brand Usage</FormLabel>
          <FormDescription>
            Can your company reuse and redistribute content created by participants?
          </FormDescription>
          <RadioGroup 
            defaultValue={data.licenseRights ? "yes" : "no"}
            onValueChange={(value) => onChange({ licenseRights: value === "yes" })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="license-yes" />
              <label htmlFor="license-yes" className="cursor-pointer">Yes, company can reuse content</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="license-no" />
              <label htmlFor="license-no" className="cursor-pointer">No, content remains with creator</label>
            </div>
          </RadioGroup>
        </FormItem>
      </div>
      
      <div className="bg-jillr-neonPurple/10 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Pro Tip: Content Guidelines</h4>
        <p className="text-sm text-muted-foreground">
          Clear guidelines lead to better submissions. Consider including:
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
          <li>Specific examples of what you're looking for</li>
          <li>Tone of voice guidance (funny, serious, inspirational)</li>
          <li>Required elements (product placement, specific actions)</li>
          <li>What to avoid (competitor products, inappropriate content)</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedSettings;
