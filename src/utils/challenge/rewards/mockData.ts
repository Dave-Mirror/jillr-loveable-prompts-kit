import { Challenge, Company, IndustryType, ChallengeType, UserReward } from './types';

// Industrie-Icons
export const industryIcons: Record<string, string> = {
  'fashion': '👕',
  'beauty': '💄',
  'sport': '💪',
  'food': '🍔',
  'travel': '✈️',
  'gaming': '🎮',
  'mobility': '🚗',
  'sustainability': '♻️',
  'entertainment': '🎬',
  'education': '📚',
  'all': '🔍'
};

// Challenge-Typ-Icons
export const challengeTypeIcons: Record<string, string> = {
  'photo': '📸',
  'video': '🎥',
  'ar': '🥽',
  'geofencing': '📍',
  'fitness': '💪',
  'wearable': '⌚',
  'schnitzeljagd': '🔎',
  'community': '👥',
  'battle': '⚔️',
  'review': '⭐',
  'all': '🔍'
};

// Beispiel-Unternehmen
export const mockCompanies: Company[] = [
  {
    id: 'company-nike',
    name: 'Nike',
    industry: 'sport',
    description: 'Nike motiviert dich zu mehr Bewegung. Gewinne mit jeder Challenge neue Levels!',
    logoUrl: 'https://placehold.co/600x400/f85700/FFFFFF/png?text=Nike',
    website: 'https://nike.com',
    tone: 'motivierend, dynamisch',
    targetAudience: ['18-35 Jahre', 'Sportbegeisterte', 'Fashion-Interessierte'],
    colorPalette: ['#000000', '#ffffff', '#f85700'],
    availableResources: ['Sportkleidung aus älteren Kollektionen', 'Limitierte Sneaker', 'Fitnesskurse'],
    challenges: ['challenge-nike-steps', 'challenge-nike-style']
  },
  {
    id: 'company-hm',
    name: 'H&M',
    industry: 'fashion',
    description: 'H&M bringt Mode für alle mit Fokus auf Nachhaltigkeit und Kreativität.',
    logoUrl: 'https://placehold.co/600x400/ff0000/FFFFFF/png?text=H%26M',
    website: 'https://hm.com',
    tone: 'casual, nachhaltig',
    targetAudience: ['16-40 Jahre', 'Mode-Interessierte', 'Nachhaltigkeitsbewusste'],
    colorPalette: ['#e50000', '#ffffff'],
    availableResources: ['Restposten aus alten Kollektionen', 'Rabattcodes', 'VIP-Einladungen zu Sample Sales'],
    challenges: ['challenge-hm-upcycle']
  },
  {
    id: 'company-sephora',
    name: 'Sephora',
    industry: 'beauty',
    description: 'Sephora bietet Premium-Kosmetik und innovative Beauty-Erlebnisse.',
    logoUrl: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Sephora',
    website: 'https://sephora.com',
    tone: 'luxuriös, trendy',
    targetAudience: ['18-45 Jahre', 'Beauty-Enthusiasten', 'Trend-Follower'],
    colorPalette: ['#000000', '#ffffff', '#d31145'],
    availableResources: ['Produktproben', 'Beauty-Coachings', 'Limitierte Editionen'],
    challenges: ['challenge-sephora-glow']
  },
  {
    id: 'company-starbucks',
    name: 'Starbucks',
    industry: 'food',
    description: 'Starbucks verbindet Kaffeekultur mit Community-Erlebnissen.',
    logoUrl: 'https://placehold.co/600x400/00704A/FFFFFF/png?text=Starbucks',
    website: 'https://starbucks.com',
    tone: 'warm, einladend',
    targetAudience: ['18-55 Jahre', 'Kaffeeliebhaber', 'Urban Professionals'],
    colorPalette: ['#00704A', '#ffffff', '#000000'],
    availableResources: ['Gratis-Getränke', 'Digitale Sammelkarten', 'Bean-Stock'],
    challenges: ['challenge-starbucks-secret']
  },
  {
    id: 'company-hilton',
    name: 'Hilton Hotels',
    industry: 'travel',
    description: 'Hilton bietet erstklassige Hotelerlebnisse weltweit.',
    logoUrl: 'https://placehold.co/600x400/00274c/FFFFFF/png?text=Hilton',
    website: 'https://hilton.com',
    tone: 'elegant, professionell',
    targetAudience: ['25-65 Jahre', 'Business-Reisende', 'Luxus-Urlauber'],
    colorPalette: ['#00274c', '#ffffff', '#daa520'],
    availableResources: ['Nicht ausgebuchte Zimmer', 'Upgrades', 'Wellness-Gutscheine'],
    challenges: ['challenge-hilton-vlog']
  }
];

// Beispiel-Rewards
export const mockRewards: Record<string, UserReward[]> = {
  'nike': [
    {
      id: 'reward-nike-1',
      name: 'Vintage Nike Sneakers',
      description: 'Limitierte Sneakers aus der Vorsaison',
      type: 'product',
      challengeId: 'challenge-nike-style',
      challengeName: 'Nike Style Battle',
      claimed: false,
      unlocked: true,
      imageUrl: 'https://placehold.co/600x400/f85700/FFFFFF/png?text=Nike+Sneakers',
      details: 'Erhalte ein Paar limitierte Nike Sneakers aus der letzten Saison. Verschiedene Größen verfügbar.',
      resourceType: 'surplus',
      companyId: 'company-nike',
      companyName: 'Nike',
      industry: 'sport'
    },
    {
      id: 'reward-nike-2',
      name: '50% Rabatt auf Sportbekleidung',
      description: 'Rabatt auf ausgewählte Sportkleidung',
      type: 'voucher',
      challengeId: 'challenge-nike-steps',
      challengeName: '1000 Steps Daily',
      claimed: false,
      unlocked: false,
      claimCode: 'NIKESTEPS50',
      imageUrl: 'https://placehold.co/600x400/f85700/FFFFFF/png?text=Nike+Voucher',
      details: '50% Rabatt auf ausgewählte Sportbekleidung aus älteren Kollektionen. Gültig in allen Nike Stores.',
      expiryDate: '2025-12-31',
      resourceType: 'surplus',
      companyId: 'company-nike',
      companyName: 'Nike',
      industry: 'sport'
    }
  ],
  'hm': [
    {
      id: 'reward-hm-1',
      name: 'VIP Sample Sale Zugang',
      description: 'Exklusiver Zugang zu H&M Sample Sales',
      type: 'ticket',
      challengeId: 'challenge-hm-upcycle',
      challengeName: 'Upcycle your Fashion',
      claimed: false,
      unlocked: true,
      imageUrl: 'https://placehold.co/600x400/e50000/FFFFFF/png?text=H%26M+VIP',
      details: 'Erhalte exklusiven Zugang zur nächsten H&M Sample Sale mit bis zu 80% Rabatt auf ausgewählte Stücke.',
      resourceType: 'limited',
      companyId: 'company-hm',
      companyName: 'H&M',
      industry: 'fashion'
    }
  ],
  'sephora': [
    {
      id: 'reward-sephora-1',
      name: 'Beauty Box mit Samples',
      description: 'Box mit Premium-Kosmetikproben',
      type: 'product',
      challengeId: 'challenge-sephora-glow',
      challengeName: 'Glow-Up Battle',
      claimed: false,
      unlocked: true,
      imageUrl: 'https://placehold.co/600x400/d31145/FFFFFF/png?text=Sephora+Box',
      details: 'Eine exklusive Beauty Box mit 10 Premium-Samples von Top-Marken.',
      resourceType: 'surplus',
      companyId: 'company-sephora',
      companyName: 'Sephora',
      industry: 'beauty'
    }
  ],
  'starbucks': [
    {
      id: 'reward-starbucks-1',
      name: 'Gratis Getränk',
      description: 'Gratis Getränk deiner Wahl',
      type: 'voucher',
      challengeId: 'challenge-starbucks-secret',
      challengeName: 'Find the Secret Starbucks',
      claimed: false,
      unlocked: true,
      claimCode: 'STARBFREE',
      imageUrl: 'https://placehold.co/600x400/00704A/FFFFFF/png?text=Starbucks+Coffee',
      details: 'Ein kostenloses Getränk deiner Wahl in jeder Starbucks-Filiale.',
      expiryDate: '2025-12-31',
      resourceType: 'unused',
      companyId: 'company-starbucks',
      companyName: 'Starbucks',
      industry: 'food'
    }
  ],
  'hilton': [
    {
      id: 'reward-hilton-1',
      name: 'Suite Upgrade',
      description: 'Kostenloses Upgrade auf eine Suite',
      type: 'voucher',
      challengeId: 'challenge-hilton-vlog',
      challengeName: 'Reise-Vlog Challenge',
      claimed: false,
      unlocked: false,
      claimCode: 'HILTONUPG',
      imageUrl: 'https://placehold.co/600x400/00274c/FFFFFF/png?text=Hilton+Suite',
      details: 'Kostenloses Upgrade auf eine Suite bei deiner nächsten Buchung in einem teilnehmenden Hilton Hotel.',
      expiryDate: '2025-12-31',
      resourceType: 'unused',
      companyId: 'company-hilton',
      companyName: 'Hilton Hotels',
      industry: 'travel'
    }
  ]
};

// Beispiel-Challenges
export const mockChallenges: Challenge[] = [
  {
    id: 'challenge-nike-steps',
    title: '1000 Steps Daily',
    description: 'Tracke täglich deine Schritte mit einer Smartwatch und erreiche 10.000 Schritte.',
    type: 'fitness',
    brandId: 'company-nike',
    brandName: 'Nike',
    industry: 'sport',
    hashtags: ['fitness', 'steps', 'challenge', 'nike'],
    xpReward: 500,
    coinReward: 50,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
    brandLogoUrl: 'https://assets.jillr.com/brands/nike-logo.png',
    locationBased: false,
    status: 'active',
    rewards: mockRewards['nike'].filter(r => r.challengeId === 'challenge-nike-steps'),
    specialFeatures: ['Wearable-Integration', 'Leaderboard', 'Apple Health Integration']
  },
  {
    id: 'challenge-nike-style',
    title: 'Nike Style Battle',
    description: 'Zeige deinen besten Look mit Nike-Produkten und tritt gegen andere an.',
    type: 'photo',
    brandId: 'company-nike',
    brandName: 'Nike',
    industry: 'sport',
    hashtags: ['fashion', 'style', 'nike', 'outfit'],
    xpReward: 800,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
    brandLogoUrl: 'https://assets.jillr.com/brands/nike-logo.png',
    locationBased: false,
    status: 'active',
    rewards: mockRewards['nike'].filter(r => r.challengeId === 'challenge-nike-style'),
    specialFeatures: ['Community Voting', 'Style Templates']
  },
  {
    id: 'challenge-hm-upcycle',
    title: 'Upcycle your Fashion',
    description: 'Gestalte ein altes Kleidungsstück um und zeige deine Kreativität.',
    type: 'photo',
    brandId: 'company-hm',
    brandName: 'H&M',
    industry: 'fashion',
    hashtags: ['upcycling', 'sustainable', 'fashion', 'diy'],
    xpReward: 750,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800',
    brandLogoUrl: 'https://placehold.co/600x400/e50000/FFFFFF/png?text=H%26M',
    locationBased: false,
    status: 'active',
    rewards: mockRewards['hm'].filter(r => r.challengeId === 'challenge-hm-upcycle'),
    specialFeatures: ['Tutorial Templates', 'Sustainability Badge']
  },
  {
    id: 'challenge-sephora-glow',
    title: 'Glow-Up Battle',
    description: 'Zeige deine beste Make-up-Transformation und gewinne Premium-Beauty-Produkte.',
    type: 'video',
    brandId: 'company-sephora',
    brandName: 'Sephora',
    industry: 'beauty',
    hashtags: ['beauty', 'makeup', 'transformation', 'glowup'],
    xpReward: 600,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800',
    brandLogoUrl: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Sephora',
    locationBased: false,
    status: 'active',
    rewards: mockRewards['sephora'].filter(r => r.challengeId === 'challenge-sephora-glow'),
    specialFeatures: ['Before-After Template', 'Beauty Filter']
  },
  {
    id: 'challenge-starbucks-secret',
    title: 'Find the Secret Starbucks',
    description: 'Finde versteckte QR-Codes in Starbucks-Filialen und sammle exklusive Belohnungen.',
    type: 'geofencing',
    brandId: 'company-starbucks',
    brandName: 'Starbucks',
    industry: 'food',
    hashtags: ['coffee', 'starbucks', 'quest', 'treasure'],
    xpReward: 500,
    coinReward: 30,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800',
    brandLogoUrl: 'https://placehold.co/600x400/00704A/FFFFFF/png?text=Starbucks',
    locationBased: true,
    location: 'Berlin, Hamburg, München',
    status: 'active',
    rewards: mockRewards['starbucks'].filter(r => r.challengeId === 'challenge-starbucks-secret'),
    specialFeatures: ['Map with Easter Eggs', 'QR Scan Trigger', 'Leaderboard']
  },
  {
    id: 'challenge-hilton-vlog',
    title: 'Reise-Vlog Challenge',
    description: 'Erstelle einen kreativen Reise-Vlog in einem Hilton Hotel und gewinne ein Suite-Upgrade.',
    type: 'video',
    brandId: 'company-hilton',
    brandName: 'Hilton Hotels',
    industry: 'travel',
    hashtags: ['travel', 'vlog', 'hotel', 'luxury'],
    xpReward: 850,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800',
    brandLogoUrl: 'https://placehold.co/600x400/00274c/FFFFFF/png?text=Hilton',
    locationBased: true,
    location: 'Alle Hilton Hotels',
    status: 'active',
    rewards: mockRewards['hilton'].filter(r => r.challengeId === 'challenge-hilton-vlog'),
    specialFeatures: ['Cinematic Templates', 'Hotel Check-In Validation']
  }
];

// Funktion zum Abrufen von Challenges nach Branche
export const getChallengesByIndustry = (industry: IndustryType | 'all'): Challenge[] => {
  if (industry === 'all') return mockChallenges;
  return mockChallenges.filter(challenge => challenge.industry === industry);
};

// Funktion zum Abrufen von Unternehmen nach Branche
export const getCompaniesByIndustry = (industry: IndustryType | 'all'): Company[] => {
  if (industry === 'all') return mockCompanies;
  return mockCompanies.filter(company => company.industry === industry);
};

// Funktion zum Abrufen aller Rewards
export const getAllMockRewards = (): UserReward[] => {
  return Object.values(mockRewards).flat();
};
