
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
                  <SelectItem value="dance">Dance Challenge</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle Challenge</SelectItem>
                  <SelectItem value="comedy">Comedy Challenge</SelectItem>
                  <SelectItem value="transformation">Transformation Challenge</SelectItem>
                  <SelectItem value="tutorial">Tutorial Challenge</SelectItem>
                  <SelectItem value="product">Product Challenge</SelectItem>
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
