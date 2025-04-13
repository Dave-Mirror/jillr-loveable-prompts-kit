
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ChallengeFormValues } from "./ChallengeFormSchema";

interface ChallengeBasicFieldsProps {
  form: UseFormReturn<ChallengeFormValues>;
}

const ChallengeBasicFields: React.FC<ChallengeBasicFieldsProps> = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a catchy title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select challenge type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Photo & Video">Photo & Video Challenge</SelectItem>
                  <SelectItem value="AR">AR Challenge</SelectItem>
                  <SelectItem value="Geofencing">Geofencing & Location Challenge</SelectItem>
                  <SelectItem value="Fitness">Fitness & Wearable Challenge</SelectItem>
                  <SelectItem value="Sustainability">Sustainability Challenge</SelectItem>
                  <SelectItem value="Gamification">Gamification Challenge</SelectItem>
                  <SelectItem value="Community">Community & Engagement Challenge</SelectItem>
                  <SelectItem value="Battle">Battle & Competition Challenge</SelectItem>
                  <SelectItem value="Review">Review & Rating Challenge</SelectItem>
                  <SelectItem value="Travel">Travel Challenge</SelectItem>
                  <SelectItem value="Food">Food Challenge</SelectItem>
                  <SelectItem value="Fashion">Fashion Challenge</SelectItem>
                  <SelectItem value="Beauty">Beauty Challenge</SelectItem>
                  <SelectItem value="Dance">Dance Challenge</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Challenge Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe what participants should do in this challenge" 
                className="min-h-[120px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ChallengeBasicFields;
