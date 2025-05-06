
import { useState, useEffect } from 'react';

export interface TargetAudience {
  gender: string;
  ageMin: number;
  ageMax: number;
  region?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAudience: TargetAudience;
  brandId?: string;
  brandName?: string;
  createdAt?: string;
  deadline?: string;
  xpReward?: number;
  coinReward?: number;
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
            ageMax: 34,
            region: "Deutschland"
          },
          brandId: "brand-123",
          brandName: "GlamCo",
          createdAt: "2023-05-15",
          deadline: "2023-06-15",
          xpReward: 350,
          coinReward: 200
        });
        setIsLoading(false);
      }, 500);
    };

    fetchActiveChallenge();
  }, []);

  return { activeChallenge, isLoading };
}
