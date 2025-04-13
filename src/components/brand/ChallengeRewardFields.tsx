
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ChallengeFormValues } from "./ChallengeFormSchema";

interface ChallengeRewardFieldsProps {
  form: UseFormReturn<ChallengeFormValues>;
}

const ChallengeRewardFields: React.FC<ChallengeRewardFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="xp_reward"
        render={({ field }) => (
          <FormItem>
            <FormLabel>XP Reward</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="1" 
                {...field} 
                onChange={e => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              XP points awarded to participants who complete this challenge
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="coin_reward"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Coin Reward</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="1" 
                {...field} 
                onChange={e => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Coins awarded to participants who complete this challenge
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ChallengeRewardFields;
