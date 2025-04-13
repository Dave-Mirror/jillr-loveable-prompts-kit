
import * as z from "zod";

export const challengeFormSchema = z.object({
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

export type ChallengeFormValues = z.infer<typeof challengeFormSchema>;
