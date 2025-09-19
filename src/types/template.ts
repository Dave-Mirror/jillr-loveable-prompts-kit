import { LocationState } from './location';

export interface ChallengeTemplate {
  id: string;
  title: string;
  description: string;
  image: string;
  industry: string;
  challengeType: string;
  duration: number; // days
  budget: number;
  data: {
    // Challenge basics
    type: string[];
    title: string;
    description: string;
    // Location data
    location?: LocationState;
    // Content requirements
    contentFormats: string[];
    platforms: string[];
    hashtags: string[];
    // KPIs
    kpis: string[];
    minViews: number;
    minLikes: number;
    minComments: number;
    minConversions: number;
    // Rewards
    rewardTypes: string[];
    // Timing
    endDate?: Date;
    // Any other preset data
    [key: string]: any;
  };
}

export interface TemplateCategory {
  id: string;
  name: string;
  icon: string;
  templates: ChallengeTemplate[];
}