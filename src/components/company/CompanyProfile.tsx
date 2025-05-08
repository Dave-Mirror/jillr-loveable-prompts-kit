
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCompany, getChallenge } from '@/utils/challenge/rewards/api';
import { Challenge, Company } from '@/utils/challenge/rewards/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ChallengeCard from '@/components/ChallengeCard';
import { industryIcons } from '@/utils/challenge/rewards/mockData';

const CompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Lade die Unternehmensdaten
        const companyData = await getCompany(id);
        setCompany(companyData);
        
        // Lade die zugehörigen Challenges
        if (companyData && companyData.challenges.length > 0) {
          const challengePromises = companyData.challenges.map(challengeId => 
            getChallenge(challengeId)
          );
          
          const challengeResults = await Promise.all(challengePromises);
          const validChallenges = challengeResults.filter(challenge => challenge !== null) as Challenge[];
          setChallenges(validChallenges);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Unternehmensdaten:', error);
        toast({
          title: 'Fehler beim Laden',
          description: 'Die Unternehmensdaten konnten nicht geladen werden.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanyData();
  }, [id, toast]);

  // Formatieren der Challenges für die ChallengeCard-Komponente
  const formattedChallenges = challenges.map(challenge => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    type: challenge.type,
    hashtags: challenge.hashtags,
    xpReward: challenge.xpReward,
    endDate: challenge.endDate,
    imageUrl: challenge.imageUrl
  }));

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl py-12 text-center">
        <div className="w-12 h-12 border-4 border-jillr-neonPurple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Unternehmensdaten werden geladen...</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto max-w-6xl py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Unternehmen nicht gefunden</h2>
        <p className="text-muted-foreground">Das gesuchte Unternehmen konnte nicht gefunden werden.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-12">
      {/* Header mit Logo und Informationen */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-shrink-0">
          <img 
            src={company.logoUrl} 
            alt={`${company.name} Logo`} 
            className="w-32 h-32 object-contain rounded-lg"
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-jillr-neonPurple/20 text-jillr-neonPurple flex items-center">
              {industryIcons[company.industry]}
              <span className="ml-1">{company.industry}</span>
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{company.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {company.targetAudience.map((audience, index) => (
              <span key={index} className="px-2 py-1 rounded-full bg-jillr-darkBlue text-jillr-neonBlue text-xs">
                {audience}
              </span>
            ))}
          </div>
          
          <a 
            href={company.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-jillr-neonBlue hover:underline"
          >
            Website besuchen
          </a>
        </div>
      </div>
      
      {/* Tabs mit Challenges, Belohnungen usw. */}
      <Tabs defaultValue="challenges">
        <TabsList>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="rewards">Belohnungen</TabsTrigger>
          <TabsTrigger value="about">Über uns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges" className="pt-6">
          {challenges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formattedChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} {...challenge} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Keine aktiven Challenges verfügbar.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rewards" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {company.availableResources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Verfügbare Ressource</CardTitle>
                  <CardDescription>{resource}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Über {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">Beschreibung</h3>
                  <p>{company.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Tonalität</h3>
                  <p>{company.tone}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Zielgruppe</h3>
                  <ul className="list-disc pl-5">
                    {company.targetAudience.map((audience, index) => (
                      <li key={index}>{audience}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Verfügbare Ressourcen</h3>
                  <ul className="list-disc pl-5">
                    {company.availableResources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Markenfarben</h3>
                  <div className="flex gap-2 mt-2">
                    {company.colorPalette.map((color, index) => (
                      <div 
                        key={index} 
                        className="w-8 h-8 rounded" 
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyProfile;
