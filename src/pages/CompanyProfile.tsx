
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '@/components/navigation/PageContainer';
import CompanyProfileComponent from '@/components/company/CompanyProfile';
import { Globe, MapPin, Users, Target, Palette, Package, Layout } from 'lucide-react';
import { Company, Challenge } from '@/utils/challenge/rewards/types';
import ChallengeCard from '@/components/ChallengeCard';

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

const CompanyProfile = () => {
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
        <div className="container mx-auto max-w-5xl py-12 px-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-jillr-neonPurple border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!company) {
    return (
      <PageContainer previousPage="/explore" nextPage="/wallet">
        <div className="container mx-auto max-w-5xl py-12 px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Unternehmen nicht gefunden</h2>
          <p className="text-gray-400">Das gesuchte Unternehmen konnte nicht gefunden werden.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer previousPage="/explore" nextPage="/wallet">
      <div className="container mx-auto max-w-5xl py-8 px-4">
        <div className="glassmorphism p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-32 h-32 rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center">
              <img 
                src={company.logoUrl} 
                alt={`${company.name} Logo`} 
                className="w-full h-auto object-contain"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">{company.name}</h1>
                  <div className="flex items-center text-sm text-jillr-neonPurple">
                    <Globe className="h-4 w-4 mr-1.5" />
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {company.website.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  </div>
                </div>
                
                <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-jillr-neonPurple/30 to-jillr-neonPurple/10 border border-jillr-neonPurple/30 text-jillr-neonPurple">
                  {company.industry.charAt(0).toUpperCase() + company.industry.slice(1)}
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">{company.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-jillr-neonGreen mt-0.5" />
                  <div>
                    <div className="font-medium text-white mb-1">Zielgruppe</div>
                    <div className="text-gray-400">
                      {company.targetAudience.join(', ')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Palette className="h-5 w-5 text-jillr-neonPink mt-0.5" />
                  <div>
                    <div className="font-medium text-white mb-1">Marken-Tonalität</div>
                    <div className="text-gray-400">
                      {company.tone}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Package className="h-5 w-5 text-jillr-neonBlue mt-0.5" />
                  <div>
                    <div className="font-medium text-white mb-1">Verfügbare Ressourcen</div>
                    <div className="text-gray-400">
                      {company.availableResources.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: company.colorPalette[0] }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: company.colorPalette[1] }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: company.colorPalette[2] }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: company.colorPalette[3] }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Aktive Challenges */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Layout className="h-6 w-6 text-jillr-neonBlue" />
              Aktive Challenges
            </h2>
            
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <Users className="h-4 w-4" />
              <span>{challenges.length} aktive Challenges</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map(challenge => (
              <ChallengeCard
                key={challenge.id}
                challenge={{
                  id: challenge.id,
                  title: challenge.title,
                  description: challenge.description,
                  type: challenge.type,
                  imageUrl: challenge.imageUrl || '/placeholder.svg',
                  reward: `${challenge.xpReward} XP`,
                  expiresIn: new Date(challenge.endDate).toLocaleDateString(),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CompanyProfile;
