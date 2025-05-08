
import { UserReward, Challenge, Company, IndustryType } from './types';
import { mockChallenges, mockCompanies, getAllMockRewards, getChallengesByIndustry, getCompaniesByIndustry } from './mockData';

// Mock function to simulate API call for user rewards
export const getUserRewards = async (userId: string): Promise<UserReward[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data
  return [
    {
      id: 'reward-101',
      name: 'VIP Concert Ticket',
      description: 'Exklusives Ticket für das nächste große Konzert in deiner Stadt',
      type: 'ticket',
      challengeId: 'challenge-1',
      challengeName: 'Summer Dance Challenge',
      claimed: false,
      unlocked: true,
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Concert+Ticket',
      details: 'Dieses Ticket gibt dir Zugang zum VIP-Bereich beim nächsten großen Konzert in deiner Stadt. Zeige deinen QR-Code am Eingang vor.',
      claimUrl: '/events/concert-vip'
    },
    {
      id: 'reward-102',
      name: '30% Fashion Rabatt',
      description: '30% Rabatt auf deine nächste Bestellung bei ASOS',
      type: 'voucher',
      challengeId: 'challenge-1',
      challengeName: 'Summer Dance Challenge',
      claimed: true,
      unlocked: true,
      claimCode: 'JILLR30DANCE',
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Fashion+Voucher',
      details: 'Einmaliger 30% Rabattcode für deine nächste Bestellung bei ASOS. Gib den Code beim Checkout ein.',
      claimUrl: 'https://asos.com'
    },
    {
      id: 'reward-103',
      name: 'Dance Master Badge',
      description: 'Offizielles Dance Master Badge für dein Profil',
      type: 'badge',
      challengeId: 'challenge-1',
      challengeName: 'Summer Dance Challenge',
      claimed: true,
      unlocked: true,
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Dance+Badge'
    },
    {
      id: 'reward-201',
      name: 'Exclusive Sneakers',
      description: 'Eine Chance auf limitierte Edition Sneakers',
      type: 'product',
      challengeId: 'challenge-2',
      challengeName: 'Urban Photography Challenge',
      claimed: false,
      unlocked: false,
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Exclusive+Sneakers',
      details: 'Nimm an der Verlosung für ein Paar limitierte Edition Sneakers teil. Die Gewinner werden am Ende des Monats bekanntgegeben.'
    },
    {
      id: 'reward-202',
      name: 'Photography Workshop',
      description: 'Teilnahme an einem exklusiven Photography Workshop',
      type: 'ticket',
      challengeId: 'challenge-2',
      challengeName: 'Urban Photography Challenge',
      claimed: false,
      unlocked: false,
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Photography+Workshop',
      details: 'Dieser Workshop wird von professionellen Fotografen geleitet und findet am 15. Juni statt.',
      claimUrl: '/events/photo-workshop'
    },
    // Füge weitere Rewards aus unseren Mock-Daten hinzu
    ...getAllMockRewards()
  ];
};

// Function to simulate claiming a reward
export const claimReward = async (userId: string, rewardId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simulate success (in a real app, this would verify eligibility, etc.)
  return true;
};

// Neue Funktionen für Challenges und Unternehmen

// Funktion zum Abrufen aller Challenges
export const getChallenges = async (industry: IndustryType | 'all' = 'all'): Promise<Challenge[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return getChallengesByIndustry(industry);
};

// Funktion zum Abrufen einer einzelnen Challenge
export const getChallenge = async (id: string): Promise<Challenge | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const challenge = mockChallenges.find(c => c.id === id);
  return challenge || null;
};

// Funktion zum Abrufen aller Unternehmen/Marken
export const getCompanies = async (industry: IndustryType | 'all' = 'all'): Promise<Company[]> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return getCompaniesByIndustry(industry);
};

// Funktion zum Abrufen eines einzelnen Unternehmens
export const getCompany = async (id: string): Promise<Company | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const company = mockCompanies.find(c => c.id === id);
  return company || null;
};

// Funktion zum Abrufen der Rewards eines Unternehmens
export const getCompanyRewards = async (companyId: string): Promise<UserReward[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const allRewards = getAllMockRewards();
  return allRewards.filter(reward => reward.companyId === companyId);
};
