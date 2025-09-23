import { ChallengeTemplate, TemplateCategory } from '@/types/template';
import ootdFashionImage from '@/assets/templates/ootd-fashion.jpg';
import ecoHeroImage from '@/assets/templates/eco-hero.jpg';
import tacoTuesdayImage from '@/assets/templates/taco-tuesday.jpg';
import styleShowdownImage from '@/assets/templates/style-showdown.jpg';
import urbanSprintImage from '@/assets/templates/urban-sprint.jpg';
import fitnessTransformationImage from '@/assets/templates/fitness-transformation.jpg';
import travelWanderlustImage from '@/assets/templates/travel-wanderlust.jpg';
import retailUnboxingImage from '@/assets/templates/retail-unboxing.jpg';

// City Clash template images
const qrCodeChallengeImage = 'https://images.unsplash.com/photo-1558898499-98b1b19b1c36?auto=format&q=80&w=1600';
const cityCheckinChallengeImage = 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9b?auto=format&q=80&w=1600';

export const challengeTemplates: ChallengeTemplate[] = [
  {
    id: 'ootd-fashion',
    title: 'Outfit of the Day',
    description: 'Share your daily style inspiration and connect with fashion enthusiasts',
    image: ootdFashionImage,
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
    image: ecoHeroImage,
    industry: 'Sustainability',
    challengeType: 'Photo Upload',
    duration: 7,
    budget: 500,
    data: {
      type: ['photo'],
      title: 'Eco Hero Challenge',
      description: 'Be an environmental champion! Share photos of your trash collection efforts and inspire others to protect our planet.',
      location: {
        location_required: false,
        locations: []
      },
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
    image: tacoTuesdayImage,
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
    image: styleShowdownImage,
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
    image: urbanSprintImage,
    industry: 'City',
    challengeType: 'AR Quest',
    duration: 3,
    budget: 600,
    data: {
      type: ['ar_quest'],
      title: 'Urban Sprint Challenge',
      description: 'Race through the city streets in this thrilling AR adventure! Collect virtual items, solve clues, and climb the leaderboard.',
      location: {
        location_required: true,
        locations: []
      },
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
    image: fitnessTransformationImage,
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
    image: travelWanderlustImage,
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
    image: retailUnboxingImage,
    industry: 'Retail',
    challengeType: 'Video Upload',
    duration: 10,
    budget: 500,
    data: {
      type: ['video'],
      title: 'Ultimate Unboxing Experience',
      description: 'Share the excitement of unboxing your favorite products! Create engaging videos that showcase the unboxing experience.',
      location: {
        location_required: false,
        locations: []
      },
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
  },
  // City Clash Templates
  {
    id: 'qr-code-scan',
    title: 'QR-Code Scan Challenge',
    description: 'Scanne einen QR-Code an markierten Spots und lade dein Selfie hoch.',
    image: 'https://images.unsplash.com/photo-1617196033578-6e0a2f8f6b32?auto=format&q=80&w=1600',
    industry: 'City Clash',
    challengeType: 'QR Scan',
    duration: 7,
    budget: 250,
    data: {
      type: ['qr_scan', 'city-clash'],
      title: 'QR-Code Scan Challenge',
      description: 'Scanne einen QR-Code an markierten Spots und lade dein Selfie hoch.',
      contentFormats: ['photo'],
      platforms: ['jillr'],
      hashtags: ['CityClash', 'QR', 'Scan'],
      kpis: ['scans', 'locations_visited', 'coins_earned'],
      minViews: 0,
      minLikes: 0,
      minComments: 0,
      minConversions: 5,
      rewardTypes: ['coins', 'xp']
    }
  },
  {
    id: 'check-in',
    title: 'Check-in Challenge',
    description: 'Checke an einem markierten Ort ein und poste ein Foto.',
    image: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&q=80&w=1600',
    industry: 'City Clash',
    challengeType: 'Location Check-in',
    duration: 7,
    budget: 200,
    data: {
      type: ['geofencing', 'city-clash'],
      title: 'Check-in Challenge',
      description: 'Checke an einem markierten Ort ein und poste ein Foto.',
      contentFormats: ['photo'],
      platforms: ['jillr'],
      hashtags: ['CityClash', 'Checkin', 'Location'],
      kpis: ['checkins', 'locations_visited', 'rewards_unlocked'],
      minViews: 0,
      minLikes: 0,
      minComments: 0,
      minConversions: 3,
      rewardTypes: ['coins', 'discounts', 'xp']
    }
  },
  {
    id: 'selfie',
    title: 'Selfie Challenge',
    description: 'Poste ein kreatives Selfie an einem bekannten Spot deiner Stadt.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&q=80&w=1600',
    industry: 'City Clash',
    challengeType: 'Photo Upload',
    duration: 7,
    budget: 300,
    data: {
      type: ['photo', 'city-clash'],
      title: 'Selfie Challenge',
      description: 'Poste ein kreatives Selfie an einem bekannten Spot deiner Stadt.',
      contentFormats: ['photo'],
      platforms: ['jillr'],
      hashtags: ['CityClash', 'Selfie', 'UGC'],
      kpis: ['ugc_uploads', 'engagement', 'locations_visited'],
      minViews: 0,
      minLikes: 0,
      minComments: 0,
      minConversions: 2,
      rewardTypes: ['coins', 'xp']
    }
  },
  {
    id: 'public-transport',
    title: 'Public Transport Challenge',
    description: 'Nutze Bus, Bahn oder E-Scooter und poste ein Foto/Video von deinem Ride.',
    image: 'https://images.unsplash.com/photo-1605732445886-3baf2d9f13c5?auto=format&q=80&w=1600',
    industry: 'City Clash',
    challengeType: 'Photo/Video Upload',
    duration: 7,
    budget: 350,
    data: {
      type: ['photo', 'video', 'city-clash'],
      title: 'Public Transport Challenge',
      description: 'Nutze Bus, Bahn oder E-Scooter und poste ein Foto/Video von deinem Ride.',
      location: {
        location_required: true,
        locations: []
      },
      contentFormats: ['photo', 'video'],
      platforms: ['instagram', 'tiktok', 'jillr'],
      hashtags: ['CityClash', 'Transport', 'Eco', 'Mobility'],
      kpis: ['submissions', 'completion_rate', 'avg_xp', 'distance_to_station', 'time_of_day'],
      minViews: 150,
      minLikes: 25,
      minComments: 5,
      minConversions: 10,
      rewardTypes: ['xp', 'badge']
    }
  },
  {
    id: 'easter-egg',
    title: 'Easter Egg Hunt',
    description: 'Finde versteckte Easter Eggs in der Stadt und lade ein Foto hoch.',
    image: 'https://images.unsplash.com/photo-1587691592099-230de206b7a3?auto=format&q=80&w=1600',
    industry: 'City Clash',
    challengeType: 'Photo Upload',
    duration: 5,
    budget: 400,
    data: {
      type: ['photo', 'city-clash'],
      title: 'Easter Egg Hunt',
      description: 'Finde versteckte Easter Eggs in der Stadt und lade ein Foto hoch.',
      contentFormats: ['photo'],
      platforms: ['jillr'],
      hashtags: ['CityClash', 'Hunt', 'Game'],
      kpis: ['ugc_uploads', 'engagement', 'discoveries'],
      minViews: 0,
      minLikes: 0,
      minComments: 0,
      minConversions: 5,
      rewardTypes: ['coins', 'xp', 'badges']
    }
  },
  {
    id: 'street-art-bingo',
    title: 'Street Art Bingo',
    description: 'Sammle Fotos von Street-Art-Motiven in deiner Stadt.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&q=80&w=1600',
    industry: 'City Clash',
    challengeType: 'Photo Upload',
    duration: 14,
    budget: 300,
    data: {
      type: ['photo', 'city-clash'],
      title: 'Street Art Bingo',
      description: 'Sammle Fotos von Street-Art-Motiven in deiner Stadt.',
      contentFormats: ['photo'],
      platforms: ['jillr'],
      hashtags: ['CityClash', 'Art', 'Bingo'],
      kpis: ['ugc_uploads', 'engagement', 'discoveries'],
      minViews: 0,
      minLikes: 0,
      minComments: 0,
      minConversions: 4,
      rewardTypes: ['coins', 'xp', 'badges']
    }
  },
  {
    id: 'clan-battle',
    title: 'Clan Battle',
    description: 'Trete mit deinem Clan gegen andere an. Mehr Abschlüsse = mehr Punkte.',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600',
    industry: 'City Clash',
    challengeType: 'Multi-Player Battle',
    duration: 7,
    budget: 500,
    data: {
      type: ['battle', 'city-clash'],
      title: 'Clan Battle',
      description: 'Trete mit deinem Clan gegen andere an. Mehr Abschlüsse = mehr Punkte.',
      contentFormats: ['photo', 'video'],
      platforms: ['jillr'],
      hashtags: ['CityClash', 'Battle', 'Clan'],
      kpis: ['team_performance', 'completions', 'points_earned'],
      minViews: 0,
      minLikes: 0,
      minComments: 0,
      minConversions: 10,
      rewardTypes: ['coins', 'xp', 'badges']
    }
  },
  {
    id: 'influencer-battle',
    title: 'Influencer Battle',
    description: 'Creator treten mit Reels gegeneinander an. Community-Voting entscheidet.',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600',
    industry: 'UGC / Video',
    challengeType: 'Video Battle',
    duration: 7,
    budget: 400,
    data: {
      type: ['video', 'ugc', 'battle'],
      title: 'Influencer Battle',
      description: 'Creator treten mit Reels gegeneinander an. Community-Voting entscheidet.',
      contentFormats: ['video', 'reels'],
      platforms: ['instagram', 'tiktok'],
      hashtags: ['UGC', 'Video', 'Battle', 'Influencer'],
      kpis: ['entries_per_round', 'votes', 'engagement_rate', 'watch_through', 'win_rate'],
      minViews: 500,
      minLikes: 100,
      minComments: 20,
      minConversions: 15,
      rewardTypes: ['xp', 'badge', 'voting']
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
  },
  {
    id: 'city-clash',
    name: 'City Clash',
    icon: 'Zap',
    templates: challengeTemplates.filter(t => t.industry === 'City Clash')
  },
  {
    id: 'ugc-video',
    name: 'UGC / Video',
    icon: 'Video',
    templates: challengeTemplates.filter(t => t.industry === 'UGC / Video')
  }
];