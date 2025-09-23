// ============= Video Poster Backfill Utility =============

import { toast } from 'sonner';
import { batchGeneratePosters, createLocalUploadHandler } from './posterGeneration';

export interface BackfillItem {
  id: string;
  mediaType: string;
  mediaUrl: string;
  posterUrl?: string;
  thumbnailUrl?: string;
}

export interface BackfillProgress {
  total: number;
  completed: number;
  currentItem: string;
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{ id: string; error: string }>;
}

/**
 * Backfill video thumbnails for existing challenges
 * @param items - Array of challenge items to process
 * @param updateCallback - Function to update each item with new poster URL
 * @param onProgress - Progress callback
 * @returns Promise with backfill results
 */
export const backfillVideoThumbnails = async (
  items: BackfillItem[],
  updateCallback: (id: string, posterUrl: string) => Promise<void>,
  onProgress?: (progress: BackfillProgress) => void
): Promise<BackfillProgress> => {
  const progress: BackfillProgress = {
    total: items.length,
    completed: 0,
    currentItem: '',
    created: 0,
    updated: 0,
    skipped: 0,
    errors: []
  };

  // Filter video items that need poster generation
  const videoItemsToProcess = items.filter(item => 
    item.mediaType === 'video' && 
    item.mediaUrl && 
    !item.posterUrl
  );

  console.log(`Starting backfill for ${videoItemsToProcess.length} video items...`);

  if (videoItemsToProcess.length === 0) {
    progress.completed = progress.total;
    progress.skipped = progress.total;
    onProgress?.(progress);
    return progress;
  }

  const uploadHandler = createLocalUploadHandler();

  // Process items in batches to avoid overwhelming the system
  const batchSize = 3;
  for (let i = 0; i < videoItemsToProcess.length; i += batchSize) {
    const batch = videoItemsToProcess.slice(i, i + batchSize);
    
    try {
      const results = await batchGeneratePosters(
        batch.map(item => ({ 
          id: item.id, 
          videoUrl: item.mediaUrl, 
          mediaType: item.mediaType 
        })),
        uploadHandler,
        (completed, total, currentItem) => {
          progress.completed = i + completed;
          progress.currentItem = currentItem;
          onProgress?.(progress);
        }
      );

      // Update items with generated posters
      for (const result of results) {
        const originalItem = batch.find(item => item.id === result.id);
        if (!originalItem) continue;

        if (result.posterUrl) {
          try {
            await updateCallback(result.id, result.posterUrl);
            progress.created++;
            console.log(`✓ Generated poster for ${result.id}`);
          } catch (error) {
            progress.errors.push({ 
              id: result.id, 
              error: `Update failed: ${error}` 
            });
            console.error(`Failed to update ${result.id}:`, error);
          }
        } else {
          progress.errors.push({ 
            id: result.id, 
            error: result.error || 'Unknown poster generation error' 
          });
          console.error(`Failed to generate poster for ${result.id}:`, result.error);
        }
      }
    } catch (error) {
      // Handle batch errors
      batch.forEach(item => {
        progress.errors.push({ 
          id: item.id, 
          error: `Batch processing failed: ${error}` 
        });
      });
      console.error('Batch processing failed:', error);
    }
  }

  // Count skipped items
  progress.skipped = items.filter(item => 
    item.mediaType !== 'video' || 
    !item.mediaUrl || 
    item.posterUrl
  ).length;

  progress.completed = progress.total;
  progress.currentItem = 'Complete';

  console.log('Backfill completed:', {
    total: progress.total,
    created: progress.created,
    skipped: progress.skipped,
    errors: progress.errors.length
  });

  onProgress?.(progress);
  return progress;
};

/**
 * Run backfill for feed items specifically
 */
export const backfillFeedItemPosters = async (
  feedItems: any[],
  onProgress?: (progress: BackfillProgress) => void
): Promise<BackfillProgress> => {
  const backfillItems: BackfillItem[] = feedItems.map(item => ({
    id: item.id,
    mediaType: item.mediaType || 'image',
    mediaUrl: item.mediaUrl || '',
    posterUrl: item.posterUrl,
    thumbnailUrl: item.thumbnailUrl
  }));

  const updateCallback = async (id: string, posterUrl: string) => {
    // In a real app, this would update the database
    // For now, update the in-memory items
    const item = feedItems.find(item => item.id === id);
    if (item) {
      item.posterUrl = posterUrl;
      item.thumbnailUrl = posterUrl; // Keep in sync
    }
    console.log(`Updated feed item ${id} with poster URL`);
  };

  return backfillVideoThumbnails(backfillItems, updateCallback, onProgress);
};

/**
 * React hook for managing backfill operations
 */
export const useVideoBackfill = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [progress, setProgress] = React.useState<BackfillProgress | null>(null);

  const runBackfill = async (items: BackfillItem[], updateCallback: (id: string, posterUrl: string) => Promise<void>) => {
    if (isRunning) return;

    setIsRunning(true);
    setProgress({
      total: items.length,
      completed: 0,
      currentItem: 'Starting...',
      created: 0,
      updated: 0,
      skipped: 0,
      errors: []
    });

    try {
      const result = await backfillVideoThumbnails(items, updateCallback, setProgress);
      
      // Show results toast
      const successCount = result.created + result.updated;
      if (successCount > 0) {
        toast.success(`Backfill abgeschlossen: ${successCount} Poster generiert`);
      }
      if (result.errors.length > 0) {
        toast.warning(`${result.errors.length} Fehler bei der Poster-Generierung`);
      }
      if (result.skipped > 0) {
        toast.info(`${result.skipped} Elemente übersprungen (bereits vorhanden oder kein Video)`);
      }

      return result;
    } catch (error) {
      console.error('Backfill failed:', error);
      toast.error('Backfill fehlgeschlagen');
      throw error;
    } finally {
      setIsRunning(false);
    }
  };

  return {
    isRunning,
    progress,
    runBackfill
  };
};

// Import React for the hook
import React from 'react';