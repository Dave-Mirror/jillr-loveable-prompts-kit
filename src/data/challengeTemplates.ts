import { ChallengeTemplate, TemplateCategory } from '@/types/template';

export const challengeTemplates: ChallengeTemplate[] = [
  {
    id: 'ootd-fashion',
    title: 'Outfit of the Day',
    description: 'Share your daily style inspiration and connect with fashion enthusiasts',
    image: '/api/placeholder/400/200',
    industry: 'Fashion',
    challengeType: 'Photo Upload',
    duration: 7,
    budget: 300,
    data: {
      type: ['photo'],
      title: 'Outfit of the Day Challenge',
      description: 'Show off your unique style with your daily outfit inspiration. Share your fashion creativity and get inspired by others!',
      contentFormats: ['photo'],
      platforms: ['instagram', 'tiktok', 'snapchat'],
      hashtags: ['OOTD', 'StyleChallenge', 'FashionDaily', 'StyleInspiration'],
      kpis: ['engagement', 'ugc_uploads', 'community_votes'],
      minViews: 100,
      minLikes: 25,
      minComments: 5,
      minConversions: 0,
      rewardTypes: ['coins', 'badges']
    }
  },
  {
    id: 'eco-hero',
    title: 'Eco Hero Challenge',
    description: 'Make a positive environmental impact by collecting trash in your community',
    image: '/api/placeholder/400/200',
    industry: 'Sustainability',
    challengeType: 'Photo Upload',
    duration: 7,
    budget: 500,
    data: {
      type: ['photo'],
      title: 'Eco Hero Challenge',
      description: 'Be an environmental champion! Share photos of your trash collection efforts and inspire others to protect our planet.',
      contentFormats: ['photo'],
      platforms: ['instagram', 'tiktok', 'facebook'],
      hashtags: ['EcoHero', 'TrashCollection', 'SaveThePlanet', 'GreenChallenge'],
      kpis: ['engagement', 'ugc_uploads', 'conversions'],
      minViews: 200,
      minLikes: 50,
      minComments: 10,
      minConversions: 5,
      rewardTypes: ['vip_tickets', 'badges', 'coins']
    }
  },
  {
    id: 'taco-tuesday',
    title: 'Taco Tuesday',
    description: 'Celebrate the ultimate food day with your favorite taco creations',
    image: '/api/placeholder/400/200',
    industry: 'Food',
    challengeType: 'Photo Upload',
    duration: 7,
    budget: 400,
    data: {
      type: ['photo'],
      title: 'Taco Tuesday Challenge',
      description: 'Show us your most creative and delicious taco combinations! From traditional to fusion, we want to see them all.',
      contentFormats: ['photo'],
      platforms: ['instagram', 'tiktok', 'facebook'],
      hashtags: ['TacoTuesday', 'FoodieLife', 'TacoLove', 'DeliciousEats'],
      kpis: ['engagement', 'ugc_uploads', 'conversions'],
      minViews: 150,
      minLikes: 30,
      minComments: 8,
      minConversions: 3,
      rewardTypes: ['coupons', 'coins']
    }
  },
  {
    id: 'style-showdown',
    title: 'Style Showdown',
    description: 'Compete in the ultimate fashion battle with video submissions and community voting',
    image: '/api/placeholder/400/200',
    industry: 'Fashion',
    challengeType: 'Video Upload',
    duration: 5,
    budget: 800,
    data: {
      type: ['video'],
      title: 'Style Showdown',
      description: 'Enter the fashion arena! Create compelling style videos and let the community vote for their favorites in this epic showdown.',
      contentFormats: ['video', 'reels'],
      platforms: ['tiktok', 'instagram', 'youtube'],
      hashtags: ['StyleShowdown', 'FashionBattle', 'StyleWars', 'VoteNow'],
      kpis: ['engagement', 'community_votes', 'conversions'],
      minViews: 500,
      minLikes: 100,
      minComments: 25,
      minConversions: 10,
      rewardTypes: ['raffle_entries', 'coins', 'badges']
    }
  },
  {
    id: 'urban-sprint',
    title: 'Urban Sprint',
    description: 'Navigate the city in an exciting AR scavenger hunt collecting virtual items',
    image: '/api/placeholder/400/200',
    industry: 'City',
    challengeType: 'AR Quest',
    duration: 3,
    budget: 600,
    data: {
      type: ['ar_quest'],
      title: 'Urban Sprint Challenge',
      description: 'Race through the city streets in this thrilling AR adventure! Collect virtual items, solve clues, and climb the leaderboard.',
      contentFormats: ['photo', 'video'],
      platforms: ['jillr', 'instagram'],
      hashtags: ['UrbanSprint', 'ARQuest', 'CityChallenge', 'LeaderboardRace'],
      kpis: ['engagement', 'conversions', 'leaderboard_xp'],
      minViews: 300,
      minLikes: 75,
      minComments: 15,
      minConversions: 8,
      rewardTypes: ['coins', 'leaderboard_xp', 'badges']
    }
  },
  {
    id: 'fitness-transformation',
    title: 'Fitness Transformation',
    description: '30-day fitness journey with progress tracking and community motivation',
    image: '/api/placeholder/400/200',
    industry: 'Fitness',
    challengeType: 'Photo Upload',
    duration: 30,
    budget: 1000,
    data: {
      type: ['photo'],
      title: '30-Day Fitness Transformation',
      description: 'Transform your fitness journey! Share your progress, workouts, and healthy meals in this motivating 30-day challenge.',
      contentFormats: ['photo', 'video'],
      platforms: ['instagram', 'tiktok', 'facebook'],
      hashtags: ['FitnessTransformation', '30DayChallenge', 'HealthyLifestyle', 'FitnessMotivation'],
      kpis: ['engagement', 'ugc_uploads', 'conversions'],
      minViews: 250,
      minLikes: 60,
      minComments: 12,
      minConversions: 5,
      rewardTypes: ['badges', 'coupons', 'coins']
    }
  },
  {
    id: 'travel-wanderlust',
    title: 'Wanderlust Adventures',
    description: 'Share your travel experiences and discover hidden gems around the world',
    image: '/api/placeholder/400/200',
    industry: 'Travel',
    challengeType: 'Photo Upload',
    duration: 14,
    budget: 700,
    data: {
      type: ['photo'],
      title: 'Wanderlust Adventures Challenge',
      description: 'Capture the magic of your travels! Share breathtaking destinations, local experiences, and hidden gems you discover.',
      contentFormats: ['photo', 'story'],
      platforms: ['instagram', 'facebook', 'snapchat'],
      hashtags: ['Wanderlust', 'TravelDiaries', 'ExploreMore', 'HiddenGems'],
      kpis: ['engagement', 'ugc_uploads', 'community_votes'],
      minViews: 200,
      minLikes: 45,
      minComments: 10,
      minConversions: 3,
      rewardTypes: ['vip_tickets', 'badges', 'coins']
    }
  },
  {
    id: 'retail-unboxing',
    title: 'Retail Unboxing Experience',
    description: 'Create exciting unboxing videos of your favorite retail products',
    image: '/api/placeholder/400/200',
    industry: 'Retail',
    challengeType: 'Video Upload',
    duration: 10,
    budget: 500,
    data: {
      type: ['video'],
      title: 'Ultimate Unboxing Experience',
      description: 'Share the excitement of unboxing your favorite products! Create engaging videos that showcase the unboxing experience.',
      contentFormats: ['video', 'reels'],
      platforms: ['tiktok', 'youtube', 'instagram'],
      hashtags: ['UnboxingExperience', 'ProductReview', 'RetailTherapy', 'UnboxingFun'],
      kpis: ['engagement', 'ugc_uploads', 'conversions'],
      minViews: 400,
      minLikes: 80,
      minComments: 20,
      minConversions: 12,
      rewardTypes: ['discounts', 'coins', 'badges']
    }
  }
];

export const templateCategories: TemplateCategory[] = [
  {
    id: 'all',
    name: 'All Templates',
    icon: 'Grid3X3',
    templates: challengeTemplates
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: 'Shirt',
    templates: challengeTemplates.filter(t => t.industry === 'Fashion')
  },
  {
    id: 'food',
    name: 'Food',
    icon: 'UtensilsCrossed',
    templates: challengeTemplates.filter(t => t.industry === 'Food')
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    icon: 'Leaf',
    templates: challengeTemplates.filter(t => t.industry === 'Sustainability')
  },
  {
    id: 'fitness',
    name: 'Fitness',
    icon: 'Dumbbell',
    templates: challengeTemplates.filter(t => t.industry === 'Fitness')
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: 'Plane',
    templates: challengeTemplates.filter(t => t.industry === 'Travel')
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: 'ShoppingBag',
    templates: challengeTemplates.filter(t => t.industry === 'Retail')
  },
  {
    id: 'city',
    name: 'City',
    icon: 'Building2',
    templates: challengeTemplates.filter(t => t.industry === 'City')
  }
];