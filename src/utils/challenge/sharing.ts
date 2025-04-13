
import { Challenge } from '@/components/challenge/types';
import { toast } from '@/hooks/use-toast';

/**
 * Share a challenge on social media or copy link to clipboard
 */
export const shareChallenge = (challenge: Challenge): void => {
  if (navigator.share) {
    navigator.share({
      title: challenge?.title,
      text: `Check out this challenge: ${challenge?.title}`,
      url: window.location.href,
    })
    .then(() => {
      toast({
        title: "Geteilt!",
        description: "Du erhältst 50 XP für das Teilen!",
      });
    })
    .catch(console.error);
  } else {
    // Fallback for browsers that don't support the Web Share API
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link kopiert!",
      description: "Der Challenge-Link wurde in die Zwischenablage kopiert.",
    });
  }
};

/**
 * Invite friends to join the challenge
 */
export const inviteFriends = (challenge: Challenge): void => {
  const message = `Hey! Schau dir diese Challenge auf Jillr an: ${challenge?.title} ${window.location.href}`;
  
  if (navigator.share) {
    navigator.share({
      title: "Freunde zu Jillr einladen",
      text: message,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(message);
    toast({
      title: "Einladungstext kopiert!",
      description: "Die Einladung wurde in die Zwischenablage kopiert.",
    });
  }
};

/**
 * Handle joining a challenge
 */
export const joinChallenge = (
  challengeId: string,
  user: any,
  navigate: (path: string) => void
): void => {
  if (!user) {
    toast({
      title: "Login erforderlich",
      description: "Bitte melde dich an, um an dieser Challenge teilzunehmen",
      variant: "destructive"
    });
    // Fix here: pass a single path string to navigate
    navigate(`/auth`);
    return;
  }
  
  navigate(`/upload/${challengeId}`);
};
