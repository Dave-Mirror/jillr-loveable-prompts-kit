
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export function useMapActions() {
  const navigate = useNavigate();

  const handleClaimReward = useCallback((markerId: string, rewardAmount: number = 50) => {
    toast({
      title: "Reward Claimed!",
      description: `You've successfully claimed ${rewardAmount} XP at location ${markerId}.`,
    });
    // Here you would typically call an API to mark this reward as claimed
  }, []);

  const handleJoinEvent = useCallback((eventId: string) => {
    toast({
      title: "Event Joined!",
      description: `You've successfully registered for the event.`,
    });
    // Here you would typically call an API to register for the event
  }, []);

  const handleJoinChallenge = useCallback((challengeId: string | undefined) => {
    if (!challengeId) {
      toast({
        title: "Error",
        description: "Could not find challenge information.",
        variant: "destructive"
      });
      return false;
    }
    
    // If this is a city clash challenge, navigate to the city clash page
    if (challengeId.startsWith('challenge-city-')) {
      toast({
        title: "City Clash Challenge",
        description: "Öffne City Clash für diese Challenge.",
      });
      
      setTimeout(() => {
        navigate('/city-clash');
      }, 1000);
      
      return true;
    }
    
    toast({
      title: "Challenge Joined",
      description: "You've successfully joined this challenge.",
    });
    
    // Navigate to the challenge detail page
    setTimeout(() => {
      navigate(`/challenge/${challengeId}`);
    }, 1000);
    
    return true;
  }, [navigate]);

  const handleTrackChallenge = useCallback((challengeId: string) => {
    toast({
      title: "Challenge Tracked",
      description: "This challenge has been added to your tracking list.",
    });
    // Here you would typically call an API to track the challenge
  }, []);

  const handleScanQrCode = useCallback(() => {
    toast({
      title: "Camera Access Required",
      description: "Please allow camera access to scan QR codes.",
    });
    // Implement QR code scanning logic here
  }, []);

  const handleCollectEasterEgg = useCallback((eggId: string, xpReward: number = 25) => {
    toast({
      title: "Easter Egg Found!",
      description: `You've discovered a hidden treasure! +${xpReward} XP`,
    });
    // Here you would typically call an API to mark this easter egg as found
  }, []);
  
  const handleJoinCityClash = useCallback((districtId?: string) => {
    toast({
      title: "City Clash",
      description: districtId ? 
        `Du nimmst jetzt an City Clash im District ${districtId} teil!` : 
        "Du nimmst jetzt an City Clash teil!",
    });
    
    setTimeout(() => {
      navigate('/city-clash');
    }, 1000);
    
    return true;
  }, [navigate]);

  return {
    handleClaimReward,
    handleJoinEvent,
    handleJoinChallenge,
    handleTrackChallenge,
    handleScanQrCode,
    handleCollectEasterEgg,
    handleJoinCityClash
  };
}
