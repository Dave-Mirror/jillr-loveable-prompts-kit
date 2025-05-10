
import React from 'react';
import { FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface PublishingOptionsProps {
  data: any;
  onChange: (data: any) => void;
}

const PublishingOptions: React.FC<PublishingOptionsProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Publishing Options</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem className="space-y-3">
          <FormLabel>Test the challenge with a live preview?</FormLabel>
          <RadioGroup 
            defaultValue={data.livePreview ? "yes" : "no"}
            onValueChange={(value) => onChange({ livePreview: value === "yes" })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="preview-yes" />
              <label htmlFor="preview-yes" className="cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="preview-no" />
              <label htmlFor="preview-no" className="cursor-pointer">No</label>
            </div>
          </RadioGroup>
        </FormItem>
        
        <FormItem className="space-y-3">
          <FormLabel>Enable A/B testing?</FormLabel>
          <RadioGroup 
            defaultValue={data.abTesting ? "yes" : "no"}
            onValueChange={(value) => onChange({ abTesting: value === "yes" })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="ab-yes" />
              <label htmlFor="ab-yes" className="cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="ab-no" />
              <label htmlFor="ab-no" className="cursor-pointer">No</label>
            </div>
          </RadioGroup>
          <FormDescription>
            Automatically test different versions to find the most effective setup
          </FormDescription>
        </FormItem>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium">Share Challenge Upon Publishing</h4>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="share-social" 
              checked={data.socialSharing}
              onCheckedChange={(checked) => onChange({ socialSharing: checked === true })}
            />
            <div>
              <label 
                htmlFor="share-social"
                className="font-medium text-sm cursor-pointer"
              >
                Share on social media & partner platforms
              </label>
              <p className="text-sm text-muted-foreground">
                Automatically share to connected social platforms
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="push-notif" 
              checked={data.pushNotification}
              onCheckedChange={(checked) => onChange({ pushNotification: checked === true })}
            />
            <div>
              <label 
                htmlFor="push-notif"
                className="font-medium text-sm cursor-pointer"
              >
                Send push notification to Jillr users
              </label>
              <p className="text-sm text-muted-foreground">
                Notify users who match your target audience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingOptions;
