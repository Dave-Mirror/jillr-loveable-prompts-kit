
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import VideoUploadSection from './VideoUploadSection';
import TikTokLinkInput from './TikTokLinkInput';
import CapCutTemplateSelect from './CapCutTemplateSelect';
import TermsCheckbox from './TermsCheckbox';

// Define the form schema
export const formSchema = z.object({
  tiktokLink: z.string().url({ message: 'Please enter a valid TikTok URL' }).includes('tiktok.com', { message: 'Must be a TikTok link' }),
  capCutTemplate: z.string(),
  videoUrl: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the UGC guidelines',
  }),
});

export type FormValues = z.infer<typeof formSchema>;

interface UploadFormContainerProps {
  onSubmit: (data: FormValues) => Promise<void>;
  isSubmitting: boolean;
}

const UploadFormContainer: React.FC<UploadFormContainerProps> = ({ 
  onSubmit,
  isSubmitting
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tiktokLink: '',
      capCutTemplate: 'default',
      videoUrl: '',
      acceptTerms: false,
    },
  });

  const handleVideoUploadComplete = (url: string) => {
    form.setValue('videoUrl', url);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Video Upload */}
          <VideoUploadSection onUploadComplete={handleVideoUploadComplete} />
          
          {/* TikTok Link */}
          <TikTokLinkInput />
          
          {/* CapCut Template Selection */}
          <CapCutTemplateSelect />
          
          {/* Terms Checkbox */}
          <TermsCheckbox />
          
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
    </FormProvider>
  );
};

export default UploadFormContainer;
