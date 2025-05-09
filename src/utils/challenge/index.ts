
// Export all challenge utilities from this barrel file
export * from './sharing';
export * from './formatting';
export * from './rewards';
export * from './coachTips';
export * from './fetching';
// Handle the joinChallenge collision by using a specific import/export
import { joinChallenge } from './feed';
export { joinChallenge };
export * from './feed';
export * from './database-types'; // Add our new database types

// Add a specific shareChallenge function for convenience
export const shareChallenge = (challengeId: string) => {
  try {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this challenge!',
        text: 'I found this amazing challenge. Join me!',
        url: `${window.location.origin}/challenge/${challengeId}`,
      });
      return true;
    } else {
      // Copy to clipboard as fallback
      navigator.clipboard.writeText(`${window.location.origin}/challenge/${challengeId}`);
      return true;
    }
  } catch (error) {
    console.error('Error sharing challenge:', error);
    return false;
  }
};
