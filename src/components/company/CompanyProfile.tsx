
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
        // Load company data
        const companyData = await getCompany(id);
        setCompany(companyData);
        
        // Load associated challenges
        if (companyData && companyData.challenges.length > 0) {
          const challengePromises = companyData.challenges.map(challengeId => 
            getChallenge(challengeId)
          );
          
          const challengeResults = await Promise.all(challengePromises);
          const validChallenges = challengeResults.filter(challenge => challenge !== null) as Challenge[];
          setChallenges(validChallenges);
        }
      } catch (error) {
        console.error('Error loading company data:', error);
        toast({
          title: 'Error loading',
          description: 'The company data could not be loaded.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanyData();
  }, [id, toast]);

  // Format challenges for the ChallengeCard component
  const formattedChallenges = challenges.map(challenge => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    type: challenge.type,
    imageUrl: challenge.imageUrl || '/placeholder.svg',
    reward: `${challenge.xpReward} XP`,
    expiresIn: new Date(challenge.endDate).toLocaleDateString(),
  }));

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl py-12 text-center">
        <div className="w-12 h-12 border-4 border-jillr-neonPurple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading company data...</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto max-w-6xl py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Company not found</h2>
        <p className="text-muted-foreground">The requested company could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-12">
      {/* Header with logo and information */}
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
            Visit website
          </a>
        </div>
      </div>
      
      {/* Tabs with Challenges, Rewards etc. */}
      <Tabs defaultValue="challenges">
        <TabsList>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="about">About us</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges" className="pt-6">
          {formattedChallenges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formattedChallenges.map(challenge => (
                <ChallengeCard 
                  key={challenge.id} 
                  challenge={challenge}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No active challenges available.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rewards" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {company.availableResources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Available Resource</CardTitle>
                  <CardDescription>{resource}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>About {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">Description</h3>
                  <p>{company.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Tone</h3>
                  <p>{company.tone}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Target Audience</h3>
                  <ul className="list-disc pl-5">
                    {company.targetAudience.map((audience, index) => (
                      <li key={index}>{audience}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Available Resources</h3>
                  <ul className="list-disc pl-5">
                    {company.availableResources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-1">Brand Colors</h3>
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
