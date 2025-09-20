import React, { createContext, useContext, useState, useCallback } from 'react';

// Utility function to create slug from title
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[àáäâ]/g, 'a')
    .replace(/[èéëê]/g, 'e')
    .replace(/[ìíïî]/g, 'i')
    .replace(/[òóöô]/g, 'o')
    .replace(/[ùúüû]/g, 'u')
    .replace(/[ýÿ]/g, 'y')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Normalize challenge data to ensure proper id and slug
export const normalizeChallenge = (item: any) => {
  const id = item.id ?? crypto.randomUUID();
  const title = item.challengeInfo?.title ?? item.title ?? "Untitled Challenge";
  const slug = item.slug ?? createSlug(title);
  
  return {
    id,
    slug,
    title,
    description: item.caption ?? item.description ?? "",
    category: item.category ?? (item.type === 'challenge' ? 'city-clash' : item.type) ?? "city-clash",
    type: item.type ?? item.category ?? "challenge", 
    xp: parseInt(item.challengeInfo?.reward?.replace(' XP', '') ?? item.xp ?? '100'),
    thumbnailUrl: item.mediaUrl ?? item.thumbnailUrl ?? item.imageUrl ?? "",
    thumbnailAlt: item.thumbnailAlt ?? title ?? "Challenge thumbnail",
    tags: item.hashtags ?? item.tags ?? [],
    stats: { 
      likes: item.likes ?? 0, 
      comments: item.commentCount ?? 0, 
      shares: item.shares ?? 0 
    },
    challengeId: item.challengeId ?? id,
    reward: item.challengeInfo?.reward ?? `${item.xp ?? 100} XP`,
    expiresIn: item.expiresIn,
    imageUrl: item.mediaUrl ?? item.thumbnailUrl ?? item.imageUrl ?? "", // Fallback for legacy support
    // Additional challenge detail fields
    start_date: item.start_date ?? new Date().toISOString(),
    end_date: item.end_date ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    coin_reward: item.coin_reward ?? 100,
    xp_reward: item.xp_reward ?? item.xp ?? 100,
    brand_name: item.brand_name ?? "Jillr",
    status: item.status ?? "active"
  };
};

interface ChallengeContextType {
  challenges: any[];
  setChallenges: (challenges: any[]) => void;
  findBySlug: (slug: string) => any | null;
  findById: (id: string) => any | null;
  addOrUpdateChallenge: (challenge: any) => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<any[]>([]);

  const findBySlug = useCallback((slug: string) => {
    return challenges.find(challenge => challenge.slug === slug) ?? null;
  }, [challenges]);

  const findById = useCallback((id: string) => {
    return challenges.find(challenge => challenge.id === id) ?? null;
  }, [challenges]);

  const addOrUpdateChallenge = useCallback((challenge: any) => {
    const normalized = normalizeChallenge(challenge);
    setChallenges(prev => {
      const existingIndex = prev.findIndex(c => c.id === normalized.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = normalized;
        return updated;
      }
      return [...prev, normalized];
    });
  }, []);

  return (
    <ChallengeContext.Provider value={{
      challenges,
      setChallenges,
      findBySlug,
      findById,
      addOrUpdateChallenge
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallengeStore = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallengeStore must be used within a ChallengeProvider');
  }
  return context;
};