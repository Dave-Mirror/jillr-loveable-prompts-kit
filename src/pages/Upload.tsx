import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Upload as UploadIcon, Link as LinkIcon, CheckSquare, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { upsertUserChallenge } from '@/utils/upload/mockUserChallenges';

const capCutTemplates = [
  { value: 'default', label: 'Default Template' },
  { value: 'creative', label: 'Creative Transitions' },
  { value: 'minimal', label: 'Minimal Clean' },
  { value: 'bold', label: 'Bold Text Effects' },
  { value: 'trendy', label: 'Trendy Style' },
];

const formSchema = z.object({
  tiktokLink: z.string().url({ message: 'Please enter a valid TikTok URL' }).includes('tiktok.com', { message: 'Must be a TikTok link' }),
  capCutTemplate: z.string(),
  videoUrl: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the UGC guidelines',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Upload = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tiktokLink: '',
      capCutTemplate: 'default',
      videoUrl: '',
      acceptTerms: false,
    },
  });

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setChallenge(data);
        }
      } catch (error) {
        console.error('Error fetching challenge:', error);
        toast({
          title: 'Error',
          description: 'Failed to load challenge details',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallenge();
  }, [id]);

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // In a real implementation, you would upload to Cloudinary here
    // For now, we'll simulate the upload with a timeout
    
    const file = files[0];
    // Pretend we're uploading to Cloudinary
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Mock upload success - in real app, this would be the Cloudinary response URL
      const mockCloudinaryUrl = `https://res.cloudinary.com/demo/video/upload/mock_${file.name}`;
      setUploadedUrl(mockCloudinaryUrl);
      form.setValue('videoUrl', mockCloudinaryUrl);
      setIsSubmitting(false);
      
      toast({
        title: 'Upload successful',
        description: 'Your video has been uploaded successfully.',
      });
    }, 1500);
  };

  const handleSubmit = async (data: FormValues) => {
    if (!id || !challenge) return;
    
    setIsSubmitting(true);
    
    try {
      // First, check if the user is authenticated
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to submit your challenge.',
          variant: 'destructive',
        });
        // Redirect to login page (to be implemented)
        return;
      }
      
      const userId = user.user.id;
      
      // Insert upload record
      const { data: uploadData, error: uploadError } = await supabase
        .from('uploads')
        .insert({
          user_id: userId,
          challenge_id: id,
          video_url: data.videoUrl || null,
          tiktok_link: data.tiktokLink,
          capcut_template: data.capCutTemplate,
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single();
        
      if (uploadError) throw uploadError;
      
      // Mark this challenge as active for the user using our mock function
      const { error: challengeError } = await upsertUserChallenge({
        user_id: userId,
        challenge_id: id,
        status: 'active',
        joined_at: new Date().toISOString(),
      });
      
      if (challengeError) throw challengeError;
      
      // Award XP and coins to the user's wallet
      const xpReward = challenge.xp_reward || 250;
      const coinReward = challenge.coin_reward || 10;
      
      // Get the user's current wallet or create a new one
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (walletError && walletError.code !== 'PGRST116') { // No rows returned
        throw walletError;
      }
      
      if (walletData) {
        // Update existing wallet
        const { error: updateError } = await supabase
          .from('wallets')
          .update({
            xp_total: walletData.xp_total + xpReward,
            coins_total: walletData.coins_total + coinReward,
            updated_at: new Date().toISOString(),
          })
          .eq('id', walletData.id);
          
        if (updateError) throw updateError;
      } else {
        // Create new wallet for the user
        const { error: insertError } = await supabase
          .from('wallets')
          .insert({
            user_id: userId,
            xp_total: xpReward,
            coins_total: coinReward,
          });
          
        if (insertError) throw insertError;
      }
      
      // Show success notification
      toast({
        title: 'Challenge submission successful!',
        description: `You've earned +${xpReward} XP and +${coinReward} coins for your submission!`,
      });
      
      // Redirect to challenge page
      navigate(`/challenge/${id}`);
    } catch (error) {
      console.error('Error submitting challenge:', error);
      toast({
        title: 'Submission failed',
        description: 'There was an error submitting your challenge. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-12">
        <div className="glassmorphism p-8">
          <h1 className="text-2xl font-bold mb-6">Loading challenge details...</h1>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="container max-w-4xl mx-auto py-12">
        <div className="glassmorphism p-8">
          <h1 className="text-2xl font-bold mb-6">Challenge not found</h1>
          <p>The challenge you're looking for does not exist or has been removed.</p>
          <Button className="mt-4" onClick={() => navigate('/explore')}>
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <div className="glassmorphism p-8">
        <h1 className="text-2xl font-bold mb-2">Upload Your Submission</h1>
        <h2 className="text-xl neon-text mb-6">{challenge.title}</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Video Upload */}
            <div className="p-6 border-2 border-dashed border-jillr-neonPurple/30 rounded-lg text-center">
              <div className="flex flex-col items-center justify-center">
                <UploadIcon className="mb-2 text-jillr-neonPurple h-10 w-10" />
                <h3 className="text-lg font-medium mb-2">Upload your video</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your video file here, or click to browse
                </p>
                <Input 
                  type="file" 
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="max-w-sm"
                />
                {uploadedUrl && (
                  <div className="mt-4 text-sm text-green-400">
                    <CheckSquare className="inline-block mr-1" size={16} />
                    Video uploaded successfully
                  </div>
                )}
              </div>
            </div>
            
            {/* TikTok Link */}
            <FormField
              control={form.control}
              name="tiktokLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TikTok Link</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="text-jillr-neonPink" size={18} />
                      <Input placeholder="https://www.tiktok.com/@username/video/..." {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Add the link to your TikTok video for this challenge
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* CapCut Template Selection */}
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
            
            {/* Terms Checkbox */}
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I accept the UGC Guidelines
                    </FormLabel>
                    <FormDescription>
                      By submitting this content, you grant permission for its use as per our User Generated Content Guidelines.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="neon-button"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Challenge'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Upload;
