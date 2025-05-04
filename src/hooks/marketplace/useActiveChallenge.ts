
import { useState, useEffect } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAudience: {
    gender: string;
    ageMin: number;
    ageMax: number;
  };
}

export function useActiveChallenge() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real implementation, this would check if there's an active challenge
    // being edited or viewed by the user
    const fetchActiveChallenge = () => {
      setIsLoading(true);
      
      // Simulate API call with mock data
      setTimeout(() => {
        setActiveChallenge({
          id: "challenge-1",
          title: "Summer Beauty Essentials",
          description: "Zeigen Sie Ihre Sommer-Beauty-Essentials und geben Sie Tipps für ein strahlendes Sommer-Look.",
          category: "Beauty",
          targetAudience: {
            gender: "female",
            ageMin: 18,
            ageMax: 34
          }
        });
        setIsLoading(false);
      }, 500);
    };

    fetchActiveChallenge();
  }, []);

  return { activeChallenge, isLoading };
}
