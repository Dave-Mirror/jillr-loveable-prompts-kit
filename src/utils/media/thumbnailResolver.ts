// ============= Thumbnail Resolver with Category Defaults =============

export interface MediaItem {
  id?: string;
  slug?: string;
  title?: string;
  category?: string;
  mediaType?: 'image' | 'video' | null;
  mediaUrl?: string | null;
  posterUrl?: string | null;
  thumbnailUrl?: string | null;
}

// Slug-specific thumbnail mapping (highest priority)
const slugThumbMap: Record<string, string> = {
  "qr-code-scan-challenge": "https://images.unsplash.com/photo-1617196033578-6e0a2f8f6b32?auto=format&q=80&w=1600",
  "qr-code-checkpoint-race": "https://images.unsplash.com/photo-1617196033578-6e0a2f8f6b32?auto=format&q=80&w=1600",
  "qr-code-scan": "https://images.unsplash.com/photo-1617196033578-6e0a2f8f6b32?auto=format&q=80&w=1600",
  "check-in-challenge": "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&q=80&w=1600",
  "city-check-in-challenge": "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&q=80&w=1600",
  "check-in": "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&q=80&w=1600",
  "public-transport": "https://images.unsplash.com/photo-1605732445886-3baf2d9f13c5?auto=format&q=80&w=1600",
  "selfie-challenge": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&q=80&w=1600",
  "selfie": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&q=80&w=1600",
  "street-art-bingo": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&q=80&w=1600",
  "easter-egg": "https://images.unsplash.com/photo-1587691592099-230de206b7a3?auto=format&q=80&w=1600",
  "clan-battle": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&q=80&w=1600",
  "influencer-battle": "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600"
};

// Category-specific thumbnail mapping
const categoryThumbMap: Record<string, string> = {
  "city-clash": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&q=80&w=1600",
  "ugc": "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600",
  "video": "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600"
};

/**
 * Get effective thumbnail using priority: posterUrl → thumbnailUrl → slugThumbMap → categoryThumbMap
 */
export function getEffectiveThumb(item: MediaItem): string | null {
  // For videos, posterUrl takes priority
  if (item.mediaType === 'video' && item.posterUrl) {
    return item.posterUrl;
  }
  
  // Use existing thumbnailUrl if available
  if (item.thumbnailUrl) {
    return item.thumbnailUrl;
  }
  
  // Check slug-specific mapping
  if (item.slug && slugThumbMap[item.slug]) {
    return slugThumbMap[item.slug];
  }
  
  // Check category mapping
  if (item.category && categoryThumbMap[item.category]) {
    return categoryThumbMap[item.category];
  }
  
  return null;
}

/**
 * Get default thumbnail URL based on title/category keywords (legacy fallback)
 */
export function defaultThumbFor(item: MediaItem): string | null {
  const title = (item.title || "").toLowerCase();
  const category = (item.category || "").toLowerCase();

  // Title-based matching (most specific)
  if (title.includes("qr") || title.includes("scan")) {
    return "https://images.unsplash.com/photo-1617196033578-6e0a2f8f6b32?auto=format&q=80&w=1600";
  }

  if (title.includes("check-in") || title.includes("check in")) {
    return "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&q=80&w=1600";
  }

  if (title.includes("public transport") || title.includes("transport")) {
    return "https://images.unsplash.com/photo-1605732445886-3baf2d9f13c5?auto=format&q=80&w=1600";
  }

  if (title.includes("selfie")) {
    return "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&q=80&w=1600";
  }

  if (title.includes("easter egg") || title.includes("hunt")) {
    return "https://images.unsplash.com/photo-1587691592099-230de206b7a3?auto=format&q=80&w=1600";
  }

  if (title.includes("street art") || title.includes("bingo")) {
    return "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&q=80&w=1600";
  }

  if (title.includes("clan battle") || title.includes("battle")) {
    return "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600";
  }

  if (title.includes("influencer") || title.includes("reels")) {
    return "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600";
  }

  // Category-based fallbacks
  if (category.includes("city-clash")) {
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&q=80&w=1600";
  }

  if (category.includes("video") || category.includes("ugc")) {
    return "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&q=80&w=1600";
  }

  if (category.includes("photo")) {
    return "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&q=80&w=1600";
  }

  return null;
}

/**
 * Resolve the best thumbnail URL for display with proper fallback order
 * Priority: posterUrl → thumbnailUrl → slugThumbMap → categoryThumbMap → hologram
 * @param item - Media item with potential thumbnail sources
 * @returns string - Best available thumbnail URL or empty string for hologram fallback
 */
export function resolveThumbnailUrl(item: MediaItem): string {
  return getEffectiveThumb(item) || '';
}

/**
 * Normalize media fields according to rules
 */
export function normalizeMediaFields(item: MediaItem): MediaItem {
  const normalized = { ...item };

  // Ensure mediaType is set
  if (!normalized.mediaType) {
    // Infer from URLs if possible
    if (normalized.mediaUrl) {
      const url = normalized.mediaUrl.toLowerCase();
      if (url.includes('.mp4') || url.includes('.webm') || url.includes('.mov')) {
        normalized.mediaType = 'video';
      } else if (url.includes('.jpg') || url.includes('.png') || url.includes('.webp')) {
        normalized.mediaType = 'image';
      }
    }
  }

  // Apply normalization rules
  if (normalized.mediaType === 'video') {
    // If posterUrl missing, it should be generated elsewhere
    // If thumbnailUrl empty and posterUrl exists, sync them
    if (!normalized.thumbnailUrl && normalized.posterUrl) {
      normalized.thumbnailUrl = normalized.posterUrl;
    }
  } else if (normalized.mediaType === 'image') {
    // If thumbnailUrl missing, use mediaUrl
    if (!normalized.thumbnailUrl && normalized.mediaUrl) {
      normalized.thumbnailUrl = normalized.mediaUrl;
    }
  }

  return normalized;
}

/**
 * Ensure URL is HTTPS and accessible
 */
export async function ensureHttpsUrl(url: string | null | undefined): Promise<string | null> {
  if (!url) return null;

  // Handle Supabase storage URLs
  if (url.startsWith('supabase://')) {
    // This should be resolved by the component using supabase client
    return url; // Return as-is, let component handle
  }

  // Enforce HTTPS
  if (url.startsWith('http://')) {
    console.warn('HTTP URL detected, should be HTTPS:', url);
    return null; // Reject HTTP URLs
  }

  if (!url.startsWith('https://') && !url.startsWith('data:')) {
    console.warn('Invalid URL format:', url);
    return null;
  }

  return url;
}

/**
 * Check if URL is accessible (returns 200)
 */
export async function validateUrlAccessibility(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
    return true; // If no error thrown, assume accessible
  } catch (error) {
    console.warn('URL not accessible:', url, error);
    return false;
  }
}

/**
 * Get items that need thumbnail backfill
 */
export function getItemsNeedingThumbnails(items: MediaItem[]): MediaItem[] {
  return items.filter(item => {
    const normalizedItem = normalizeMediaFields(item);
    const resolvedUrl = resolveThumbnailUrl(normalizedItem);
    
    // Item needs backfill if:
    // 1. It's a video without posterUrl
    // 2. It has no thumbnailUrl and no category default
    return (
      (normalizedItem.mediaType === 'video' && !normalizedItem.posterUrl) ||
      (!resolvedUrl || resolvedUrl === '')
    );
  });
}

/**
 * Apply slug/category defaults to items missing thumbnails
 */
export function applyDefaultThumbnails(items: MediaItem[]): { updated: MediaItem[]; count: number } {
  let updateCount = 0;
  
  const updated = items.map(item => {
    const normalized = normalizeMediaFields(item);
    const currentThumbnail = resolveThumbnailUrl(normalized);
    
    if (!currentThumbnail) {
      const effectiveThumb = getEffectiveThumb(normalized);
      if (effectiveThumb) {
        normalized.thumbnailUrl = effectiveThumb;
        updateCount++;
      }
    }
    
    return normalized;
  });

  return { updated, count: updateCount };
}