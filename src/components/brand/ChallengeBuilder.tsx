
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { challengeFormSchema, ChallengeFormValues } from './ChallengeFormSchema';
import ChallengeBasicFields from './ChallengeBasicFields';
import ChallengeBrandFields from './ChallengeBrandFields';
import ChallengeDateFields from './ChallengeDateFields';
import ChallengeRewardFields from './ChallengeRewardFields';
import ChallengeHashtagsInput from './ChallengeHashtagsInput';
import ChallengeFormSubmit from './ChallengeFormSubmit';

const ChallengeBuilder = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      brand_name: "",
      brand_logo_url: "",
      brand_color: "#",
      xp_reward: 100,
      coin_reward: 10,
    },
  });

  const onSubmit = async (data: ChallengeFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Convert Date objects to ISO strings for Supabase compatibility
      const challengeData = {
        title: data.title, // Ensure title is explicitly passed
        description: data.description,
        type: data.type,
        brand_name: data.brand_name,
        brand_logo_url: data.brand_logo_url,
        brand_color: data.brand_color,
        start_date: data.start_date.toISOString(),
        end_date: data.end_date.toISOString(),
        xp_reward: data.xp_reward,
        coin_reward: data.coin_reward,
        hashtags,
        status: 'active',
        user_id: user.id,
      };
      
      const { data: newChallenge, error } = await supabase
        .from('challenges')
        .insert(challengeData)
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Challenge created!",
        description: "Your challenge has been created successfully.",
      });
      
      form.reset();
      setHashtags([]);
    } catch (error) {
      console.error('Error creating challenge:', error);
      toast({
        title: "Error",
        description: "There was an error creating your challenge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-6">Create a New Challenge</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ChallengeBasicFields form={form} />
          <ChallengeBrandFields form={form} />
          <ChallengeDateFields form={form} />
          <ChallengeRewardFields form={form} />
          <ChallengeHashtagsInput hashtags={hashtags} setHashtags={setHashtags} />
          <ChallengeFormSubmit isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default ChallengeBuilder;
