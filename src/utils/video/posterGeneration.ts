// ============= Video Poster Generation Utilities =============

import { toast } from 'sonner';

/**
 * Extract a poster frame from a video file or URL at a specific time
 * @param videoSource - File object or video URL
 * @param timeSeconds - Time in seconds to extract frame (default: 2s)
 * @returns Promise<Blob> - PNG image blob of the extracted frame
 */
export const extractVideoPosterFrame = async (
  videoSource: File | string,
  timeSeconds: number = 2
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';

    const cleanup = () => {
      if (typeof videoSource === 'string') {
        // Don't revoke external URLs
      } else {
        URL.revokeObjectURL(video.src);
      }
    };

    video.onloadedmetadata = () => {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Calculate actual time to seek (don't exceed video duration)
      const seekTime = Math.min(timeSeconds, video.duration * 0.1);
      video.currentTime = seekTime;
    };

    video.onseeked = () => {
      try {
        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            cleanup();
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create poster frame blob'));
            }
          },
          'image/png',
          0.9
        );
      } catch (error) {
        cleanup();
        reject(error);
      }
    };

    video.onerror = () => {
      cleanup();
      reject(new Error('Failed to load video for poster extraction'));
    };

    // Set video source
    if (typeof videoSource === 'string') {
      video.src = videoSource;
    } else {
      video.src = URL.createObjectURL(videoSource);
    }
  });
};

/**
 * Generate and upload a poster frame from a video to a storage service
 * @param videoFile - Video file to extract poster from
 * @param uploadCallback - Function to handle the poster blob upload
 * @returns Promise<string> - URL of the uploaded poster
 */
export const generateAndUploadPoster = async (
  videoFile: File,
  uploadCallback: (blob: Blob, filename: string) => Promise<string>
): Promise<string> => {
  try {
    // Extract poster frame
    const posterBlob = await extractVideoPosterFrame(videoFile, 2);
    
    // Generate filename based on original video name
    const videoName = videoFile.name.replace(/\.[^/.]+$/, '');
    const posterFilename = `${videoName}_poster.png`;
    
    // Upload the poster
    const posterUrl = await uploadCallback(posterBlob, posterFilename);
    
    return posterUrl;
  } catch (error) {
    console.error('Failed to generate poster:', error);
    throw error;
  }
};

/**
 * Validate if a video URL/file is accessible and can generate a poster
 */
export const validateVideoForPoster = async (videoSource: File | string): Promise<boolean> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    
    const cleanup = () => {
      if (typeof videoSource !== 'string') {
        URL.revokeObjectURL(video.src);
      }
    };

    video.onloadedmetadata = () => {
      cleanup();
      resolve(video.duration > 0);
    };

    video.onerror = () => {
      cleanup();
      resolve(false);
    };

    // Set source
    if (typeof videoSource === 'string') {
      video.src = videoSource;
    } else {
      video.src = URL.createObjectURL(videoSource);
    }
  });
};

/**
 * Create a basic upload handler for local development (creates data URLs)
 * Replace this with your actual storage service integration
 */
export const createLocalUploadHandler = () => {
  return async (blob: Blob, filename: string): Promise<string> => {
    // For development - convert to data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to create data URL'));
        }
      };
      reader.onerror = () => reject(new Error('FileReader error'));
      reader.readAsDataURL(blob);
    });
  };
};

/**
 * Batch process multiple video items for poster generation
 */
export const batchGeneratePosters = async (
  videoItems: Array<{ id: string; videoUrl: string; mediaType: string }>,
  uploadCallback: (blob: Blob, filename: string) => Promise<string>,
  onProgress?: (completed: number, total: number, currentItem: string) => void
): Promise<Array<{ id: string; posterUrl: string | null; error?: string }>> => {
  const results = [];
  
  for (let i = 0; i < videoItems.length; i++) {
    const item = videoItems[i];
    
    onProgress?.(i, videoItems.length, item.id);
    
    try {
      if (item.mediaType !== 'video') {
        results.push({ id: item.id, posterUrl: null, error: 'Not a video' });
        continue;
      }

      const posterBlob = await extractVideoPosterFrame(item.videoUrl, 2);
      const posterUrl = await uploadCallback(posterBlob, `poster_${item.id}.png`);
      
      results.push({ id: item.id, posterUrl });
    } catch (error) {
      console.error(`Failed to generate poster for ${item.id}:`, error);
      results.push({ 
        id: item.id, 
        posterUrl: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }
  
  onProgress?.(videoItems.length, videoItems.length, 'Complete');
  
  return results;
};