import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

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
const normalizeChallenge = (item: any) => {
  const id = item.id ?? crypto.randomUUID();
  const title = item.challengeInfo?.title ?? item.title ?? "Untitled Challenge";
  const slug = item.slug ?? createSlug(title);
  
  // Determine media type and URLs from legacy fields
  let mediaType: 'image' | 'video' = 'image';
  let mediaUrl = '';
  let posterUrl = null;
  let thumbnailUrl = '';

  // Handle legacy fields - map image, video, thumbnail_url to new structure
  if (item.video || item.videoUrl || (item.type === 'video') || (item.category === 'video')) {
    mediaType = 'video';
    mediaUrl = item.video || item.videoUrl || item.mediaUrl || '';
    posterUrl = item.thumbnail || item.thumbnailUrl || item.imageUrl || item.poster || null;
  } else {
    mediaType = 'image';
    mediaUrl = item.image || item.imageUrl || item.mediaUrl || item.thumbnailUrl || '';
  }
  
  thumbnailUrl = item.thumbnail || item.thumbnailUrl || item.imageUrl || mediaUrl || '';
  
  return {
    id,
    slug,
    title,
    description: item.caption ?? item.description ?? "",
    category: item.category ?? (item.type === 'challenge' ? 'city-clash' : item.type) ?? "city-clash",
    type: item.type ?? item.category ?? "challenge", 
    xp: parseInt(item.challengeInfo?.reward?.replace(' XP', '') ?? item.xp ?? '100'),
    
    // New media fields
    mediaType,
    mediaUrl,
    posterUrl,
    thumbnailUrl,
    
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
    
    // Legacy support - keep these for backward compatibility
    imageUrl: mediaUrl,
    
    // Additional challenge detail fields
    start_date: item.start_date ?? new Date().toISOString(),
    end_date: item.end_date ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    coin_reward: item.coin_reward ?? 100,
    xp_reward: item.xp_reward ?? item.xp ?? 100,
    brand_name: item.brand_name ?? "Jillr",
    status: item.status ?? "active"
  };
};

interface LoadChallengeParams {
  slug?: string;
  id?: string;
}

interface UseChallengeLoaderResult {
  challenge: any | null;
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
}

// Simple in-memory store to avoid circular dependency
const challengeCache = new Map<string, any>();

export const useChallengeLoader = (params: LoadChallengeParams): UseChallengeLoaderResult => {
  const [challenge, setChallenge] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadChallenge = async () => {
      if (!params.slug && !params.id) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setNotFound(false);

      try {
        // First try to get from cache
        let cacheKey = params.slug ? `slug:${params.slug}` : `id:${params.id}`;
        let cachedChallenge = challengeCache.get(cacheKey);
        
        if (cachedChallenge) {
          setChallenge(cachedChallenge);
          setIsLoading(false);
          
          // If we found by ID but have a slug, redirect to slug URL
          if (params.id && !params.slug && cachedChallenge.slug) {
            navigate(`/challenges/${cachedChallenge.slug}`, { replace: true });
          }
          return;
        }

        // Try to fetch from API/DB or create mock data
        let fetchedChallenge = null;

        // For demo purposes, create mock challenges for all IDs
        if (params.id || params.slug) {
          const challengeId = params.id || params.slug || 'unknown';
          const isVideo = Math.random() > 0.5; // 50% chance for video
          fetchedChallenge = {
            id: challengeId,
            title: `Challenge ${challengeId}`,
            description: 'Dies ist eine Demo-Challenge für Test-Zwecke. Du kannst hier verschiedene Aktionen durchführen und XP sammeln.',
            category: isVideo ? 'video' : 'city-clash',
            type: isVideo ? 'video' : 'Community',
            xp: Math.floor(Math.random() * 500) + 100,
            
            // Use different media based on type
            mediaUrl: isVideo 
              ? `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
              : `https://images.unsplash.com/photo-1558898499-98b1b19b1c36?auto=format&fit=crop&q=80&w=1600&h=900`,
            thumbnailUrl: `https://images.unsplash.com/photo-1558898499-98b1b19b1c36?auto=format&fit=crop&q=80&w=1600&h=900`,
            posterUrl: isVideo ? `https://images.unsplash.com/photo-1558898499-98b1b19b1c36?auto=format&fit=crop&q=80&w=1600&h=900` : null,
            
            thumbnailAlt: `Challenge ${challengeId} thumbnail`,
            stats: { likes: Math.floor(Math.random() * 500), comments: Math.floor(Math.random() * 100), shares: Math.floor(Math.random() * 50) },
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            coin_reward: Math.floor(Math.random() * 200) + 50,
            xp_reward: Math.floor(Math.random() * 500) + 100,
            brand_name: 'Jillr',
            status: 'active'
          };
        }

        if (!fetchedChallenge) {
          console.warn('Challenge missing:', { slug: params.slug, id: params.id });
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        // Normalize and cache the challenge
        const normalized = normalizeChallenge(fetchedChallenge);
        challengeCache.set(`slug:${normalized.slug}`, normalized);
        challengeCache.set(`id:${normalized.id}`, normalized);
        setChallenge(normalized);

        // If we fetched by ID and now have a slug, redirect to slug URL
        if (params.id && !params.slug && normalized.slug) {
          navigate(`/challenges/${normalized.slug}`, { replace: true });
        }

      } catch (err) {
        console.error('Error loading challenge:', err);
        setError('Netzwerkfehler beim Laden der Challenge');
        toast({
          title: "Fehler",
          description: "Challenge konnte nicht geladen werden. Überprüfe deine Internetverbindung.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadChallenge();
  }, [params.slug, params.id, navigate]);

  return {
    challenge,
    isLoading,
    error,
    notFound
  };
};