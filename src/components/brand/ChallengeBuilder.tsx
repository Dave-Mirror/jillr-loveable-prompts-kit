
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Hash, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const challengeFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.string().min(1, {
    message: "Please select a challenge type.",
  }),
  brand_name: z.string().min(1, {
    message: "Brand name is required.",
  }),
  brand_logo_url: z.string().url({
    message: "Please enter a valid URL for the brand logo.",
  }).optional().or(z.literal('')),
  brand_color: z.string().regex(/^#[0-9A-F]{6}$/i, {
    message: "Please enter a valid hex color code.",
  }).optional().or(z.literal('')),
  start_date: z.date({
    required_error: "Please select a start date.",
  }),
  end_date: z.date({
    required_error: "Please select an end date.",
  }).refine(date => date > new Date(), {
    message: "End date must be in the future.",
  }),
  xp_reward: z.number().min(1, {
    message: "XP reward must be at least 1.",
  }).default(100),
  coin_reward: z.number().min(1, {
    message: "Coin reward must be at least 1.",
  }).default(10),
});

type ChallengeFormValues = z.infer<typeof challengeFormSchema>;

const ChallengeBuilder = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hashtags, setHashtags] = React.useState<string[]>([]);
  const [newHashtag, setNewHashtag] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const onSubmit = async (data: ChallengeFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Convert Date objects to ISO strings for Supabase compatibility
      const challengeData = {
        ...data,
        start_date: data.start_date.toISOString(),
        end_date: data.end_date.toISOString(),
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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
          
          <div>
            <FormLabel>Challenge Hashtags</FormLabel>
            <div className="flex flex-wrap gap-2 mb-3">
              {hashtags.map(tag => (
                <div 
                  key={tag} 
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-jillr-darkBlue"
                >
                  <Hash size={14} />
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeHashtag(tag)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a hashtag"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addHashtag();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addHashtag}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-jillr-neonPurple hover:bg-jillr-neonPurple/80"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Challenge'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChallengeBuilder;
