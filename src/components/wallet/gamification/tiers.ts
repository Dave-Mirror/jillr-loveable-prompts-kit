
export interface Tier {
  name: string;
  level: number;
  color: string;
  bgColor: string;
  benefits: string[];
}

export const vipTiers: Tier[] = [
  { name: "Starter", level: 1, color: "text-gray-400", bgColor: "bg-gray-400/20", benefits: ["Grundlegende Challenges", "Standard Belohnungen"] },
  { name: "Bronze", level: 3, color: "text-amber-700", bgColor: "bg-amber-700/20", benefits: ["10% Bonus XP", "Früher Zugang zu neuen Challenges"] },
  { name: "Silber", level: 5, color: "text-slate-400", bgColor: "bg-slate-400/20", benefits: ["20% Bonus XP", "Exklusive digitale Belohnungen", "Premium Challenges"] },
  { name: "Gold", level: 8, color: "text-yellow-500", bgColor: "bg-yellow-500/20", benefits: ["35% Bonus XP", "Monatliche Überraschungsbelohnungen", "VIP Challenges"] },
  { name: "Platin", level: 12, color: "text-blue-300", bgColor: "bg-blue-300/20", benefits: ["50% Bonus XP", "Früher Zugang zu exklusiven Events", "Produkttests"] },
  { name: "Diamond", level: 15, color: "text-cyan-300", bgColor: "bg-cyan-300/20", benefits: ["75% Bonus XP", "Persönlicher Concierge Service", "Geldprämien für Challenge-Gewinne"] },
];

export const findCurrentTier = (level: number): Tier => {
  return vipTiers.reduce((prev, current) => (level >= current.level ? current : prev), vipTiers[0]);
};

export const findNextTier = (currentTier: Tier): Tier | null => {
  const nextTierIndex = vipTiers.findIndex(tier => tier.name === currentTier.name) + 1;
  return nextTierIndex < vipTiers.length ? vipTiers[nextTierIndex] : null;
};

export const calculateProgressToNextTier = (level: number, currentTier: Tier, nextTier: Tier | null): number => {
  return nextTier 
    ? Math.min(100, ((level - currentTier.level) / (nextTier.level - currentTier.level)) * 100)
    : 100;
};
