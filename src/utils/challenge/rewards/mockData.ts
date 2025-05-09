
import { Challenge, Company, UserReward, IndustryType } from './types';

// Icons for industry types
export const industryIcons: Record<string, string> = {
  all: '🌐',
  fashion: '👗',
  beauty: '💄',
  sport: '🏃',
  food: '🍔',
  travel: '✈️',
  gaming: '🎮',
  mobility: '🚗',
  sustainability: '♻️',
  entertainment: '🎬',
  education: '📚',
  lifestyle: '🌿', // Adding lifestyle as a special case
};

// Icons for challenge types
export const challengeTypeIcons: Record<string, string> = {
  all: '🌐',
  photo: '📷',
  video: '🎥',
  ar: '👓',
  geofencing: '📍',
  fitness: '💪',
  wearable: '⌚',
  schnitzeljagd: '🔍',
  community: '👥',
  battle: '⚔️',
  review: '⭐',
};

// Mock challenges data
export const mockChallenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Summer Dance Challenge',
    description: 'Show off your best dance moves to this trending song',
    type: 'photo',
    brandId: 'company-1',
    brandName: 'FashionBrand',
    industry: 'fashion',
    hashtags: ['dance', 'summer', 'trend'],
    xpReward: 500,
    coinReward: 200,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Dance+Challenge',
    brandLogoUrl: 'https://placehold.co/100x100/9b87f5/FFFFFF/png?text=FB',
    locationBased: false,
    status: 'active',
    rewards: []
  },
  {
    id: 'challenge-2',
    title: 'Urban Photography',
    description: 'Capture the essence of urban life in your city',
    type: 'photo',
    brandId: 'company-2',
    brandName: 'UrbanVibes',
    industry: 'lifestyle' as IndustryType, // Cast to IndustryType to fix the error
    hashtags: ['urban', 'photography', 'city'],
    xpReward: 400,
    coinReward: 150,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Urban+Photography',
    brandLogoUrl: 'https://placehold.co/100x100/9b87f5/FFFFFF/png?text=UV',
    locationBased: false,
    status: 'active',
    rewards: []
  }
];

// Mock companies data
export const mockCompanies: Company[] = [
  {
    id: 'company-1',
    name: 'FashionBrand',
    industry: 'fashion',
    description: 'Trending sustainable fashion brand',
    logoUrl: 'https://placehold.co/100x100/9b87f5/FFFFFF/png?text=FB',
    website: 'https://example.com/fashionbrand',
    tone: 'Trendy, young, sustainable',
    targetAudience: ['18-25', 'fashion-conscious', 'environmentally conscious'],
    colorPalette: ['#9b87f5', '#ff6b6b', '#4ecdc4'],
    availableResources: ['product samples', 'discount codes', 'event tickets'],
    challenges: ['challenge-1']
  },
  {
    id: 'company-2',
    name: 'UrbanVibes',
    industry: 'lifestyle' as IndustryType, // Cast to IndustryType to fix the error
    description: 'Urban lifestyle and photography brand',
    logoUrl: 'https://placehold.co/100x100/9b87f5/FFFFFF/png?text=UV',
    website: 'https://example.com/urbanvibes',
    tone: 'Creative, artistic, edgy',
    targetAudience: ['20-35', 'urban dwellers', 'photographers'],
    colorPalette: ['#2d3436', '#636e72', '#b2bec3'],
    availableResources: ['photography workshops', 'camera gear', 'exhibition space'],
    challenges: ['challenge-2']
  }
];

// Mock rewards
const mockRewards: UserReward[] = [
  {
    id: 'reward-101',
    name: 'VIP Concert Ticket',
    description: 'Exclusive ticket to the next big concert in your city',
    type: 'ticket',
    challengeId: 'challenge-1',
    challengeName: 'Summer Dance Challenge',
    claimed: false,
    unlocked: true,
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Concert+Ticket',
    details: 'This ticket gives you access to the VIP area at the next big concert in your city. Show your QR code at the entrance.',
    claimUrl: '/events/concert-vip'
  },
  {
    id: 'reward-102',
    name: '30% Fashion Discount',
    description: '30% off your next order at ASOS',
    type: 'voucher',
    challengeId: 'challenge-1',
    challengeName: 'Summer Dance Challenge',
    claimed: true,
    unlocked: true,
    claimCode: 'JILLR30DANCE',
    imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Fashion+Voucher',
    details: 'One-time 30% discount code for your next order at ASOS. Enter the code at checkout.',
    claimUrl: 'https://asos.com'
  }
];

// Function to get all mock rewards
export const getAllMockRewards = (): UserReward[] => {
  return mockRewards;
};

// Function to filter challenges by industry
export const getChallengesByIndustry = (industry: IndustryType | 'all' = 'all'): Challenge[] => {
  if (industry === 'all') {
    return mockChallenges;
  }
  return mockChallenges.filter(challenge => challenge.industry === industry);
};

// Function to filter companies by industry
export const getCompaniesByIndustry = (industry: IndustryType | 'all' = 'all'): Company[] => {
  if (industry === 'all') {
    return mockCompanies;
  }
  return mockCompanies.filter(company => company.industry === industry);
};
