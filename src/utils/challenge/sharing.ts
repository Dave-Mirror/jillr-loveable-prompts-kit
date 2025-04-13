
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
 * Share on a specific platform
 */
export const shareOnPlatform = (challenge: Challenge, platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp'): void => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(challenge?.title || '');
  const text = encodeURIComponent(`Check out this challenge: ${challenge?.title}`);
  
  let shareUrl = '';
  
  switch(platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    toast({
      title: "Geteilt!",
      description: `Du hast die Challenge auf ${platform} geteilt und erhältst 50 XP!`,
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

/**
 * Share challenge result
 */
export const shareResult = (challenge: Challenge, result: any): void => {
  const message = `Ich habe gerade die "${challenge?.title}" Challenge auf Jillr abgeschlossen! ${window.location.href}`;
  
  if (navigator.share) {
    navigator.share({
      title: "Mein Challenge-Ergebnis",
      text: message,
      url: window.location.href,
    })
    .then(() => {
      toast({
        title: "Ergebnis geteilt!",
        description: "Du erhältst 100 XP für das Teilen deines Ergebnisses!",
      });
    })
    .catch(console.error);
  } else {
    navigator.clipboard.writeText(message);
    toast({
      title: "Link kopiert!",
      description: "Der Ergebnislink wurde in die Zwischenablage kopiert.",
    });
  }
};

/**
 * Get sharing count for a challenge
 */
export const getSharingStats = async (challengeId: string): Promise<{ count: number, platforms: Record<string, number> }> => {
  // In einer echten Implementierung würde hier ein API-Aufruf erfolgen
  // Für dieses Beispiel verwenden wir Dummy-Daten
  return {
    count: Math.floor(Math.random() * 100) + 10,
    platforms: {
      facebook: Math.floor(Math.random() * 30) + 5,
      twitter: Math.floor(Math.random() * 20) + 3,
      instagram: Math.floor(Math.random() * 40) + 7,
      other: Math.floor(Math.random() * 10) + 1,
    }
  };
};
