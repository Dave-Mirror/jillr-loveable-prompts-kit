
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/navigation/PageContainer';
import { Company, Challenge } from '@/utils/challenge/rewards/types';
import { CompanyHeader } from '@/components/company/CompanyHeader';
import CompanyChallenges from '@/components/company/CompanyChallenges';
import LoadingState from '@/components/company/LoadingState';
import NotFoundState from '@/components/company/NotFoundState';

// Mock-Daten für die Firmendetails (in Produktion würde dies von einer API kommen)
const mockCompany: Company = {
  id: "nike-123",
  name: "Nike",
  industry: "sport",
  description: "Nike ist ein weltweit führender Sportartikelhersteller, der innovative Produkte, Erlebnisse und Dienstleistungen anbietet.",
  logoUrl: "https://pngimg.com/uploads/nike/nike_PNG11.png",
  website: "https://www.nike.com",
  tone: "Inspirierend, energetisch, motivierend",
  targetAudience: ["Sportbegeisterte", "Athleten", "Modeinteressierte", "Jugendliche"],
  colorPalette: ["#F82C2C", "#F88E2C", "#2CF82C", "#2C2CF8"],
  availableResources: ["Sportbekleidung", "Schuhe", "Fitnesszubehör", "Event-Tickets"],
  challenges: ["challenge-123", "challenge-456"]
};

// Mock-Daten für Challenges des Unternehmens
const mockChallenges: Challenge[] = [
  {
    id: "challenge-123",
    title: "Run for Change",
    description: "Laufe 30 Kilometer in einer Woche und teile deine Erfahrung",
    type: "fitness",
    brandId: "nike-123",
    brandName: "Nike",
    industry: "sport",
    hashtags: ["running", "fitness", "nikerun"],
    xpReward: 500,
    coinReward: 100,
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8",
    brandLogoUrl: "https://pngimg.com/uploads/nike/nike_PNG11.png",
    locationBased: false,
    status: "active",
    rewards: []
  },
  {
    id: "challenge-456",
    title: "Style Your Kicks",
    description: "Zeige uns, wie du deine Nike Sneakers stylst und erhalte exklusive Belohnungen",
    type: "photo",
    brandId: "nike-123",
    brandName: "Nike",
    industry: "sport",
    hashtags: ["nikestyle", "fashion", "sneakers"],
    xpReward: 300,
    startDate: "2025-05-05",
    endDate: "2025-05-30",
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
    brandLogoUrl: "https://pngimg.com/uploads/nike/nike_PNG11.png",
    locationBased: false,
    status: "active",
    rewards: []
  }
];

const CompanyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  // Simuliere API-Aufruf mit den Mock-Daten
  useEffect(() => {
    // In einer realen Anwendung würde hier ein API-Aufruf gemacht werden
    setTimeout(() => {
      setCompany(mockCompany);
      setChallenges(mockChallenges);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <PageContainer previousPage="/explore" nextPage="/wallet">
        <LoadingState />
      </PageContainer>
    );
  }

  if (!company) {
    return (
      <PageContainer previousPage="/explore" nextPage="/wallet">
        <NotFoundState />
      </PageContainer>
    );
  }

  return (
    <PageContainer previousPage="/explore" nextPage="/wallet">
      <div className="container mx-auto max-w-5xl py-8 px-4">
        <CompanyHeader company={company} />
        <CompanyChallenges challenges={challenges} />
      </div>
    </PageContainer>
  );
};

export default CompanyProfile;
