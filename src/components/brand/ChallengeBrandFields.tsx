
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ChallengeFormValues } from "./ChallengeFormSchema";

interface ChallengeBrandFieldsProps {
  form: UseFormReturn<ChallengeFormValues>;
}

const ChallengeBrandFields: React.FC<ChallengeBrandFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FormField
        control={form.control}
        name="brand_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand Name</FormLabel>
            <FormControl>
              <Input placeholder="Your brand name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="brand_logo_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand Logo URL (optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/logo.png" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="brand_color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand Color (optional)</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <Input placeholder="#FF00FF" {...field} />
                <div 
                  className="w-10 h-10 rounded border" 
                  style={{ backgroundColor: field.value }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ChallengeBrandFields;
