
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import CreatorGrid from '@/components/marketplace/CreatorGrid';
import CreatorFilters from '@/components/marketplace/CreatorFilters';
import CreatorDetail from '@/components/marketplace/CreatorDetail';
import { useCreatorSearch } from '@/hooks/marketplace/useCreatorSearch';
import { useActiveChallenge } from '@/hooks/marketplace/useActiveChallenge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CreatorMarketplace: React.FC = () => {
  const { toast } = useToast();
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [filters, setFilters] = useState({
    niche: [],
    region: [],
    engagement: [0, 100],
    matchScore: 50,
  });

  const { creators, isLoading, error } = useCreatorSearch(filters);
  const { activeChallenge, isLoading: isChallengeLoading } = useActiveChallenge();

  useEffect(() => {
    if (error) {
      toast({
        title: "Fehler beim Laden der Creators",
        description: "Bitte versuche es später erneut.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleCreatorSelect = (creator) => {
    setSelectedCreator(creator);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">Creator-Marktplatz</h1>
        
        {activeChallenge && (
          <Alert className="border-jillr-neonPurple/50 bg-gradient-to-r from-jillr-darkBlue to-jillr-darkBlue/70">
            <Info className="h-4 w-4 text-jillr-neonPurple" />
            <AlertTitle>Aktive Challenge: {activeChallenge.title}</AlertTitle>
            <AlertDescription className="text-sm text-gray-300">
              Das KI-System empfiehlt Creator, die am besten zu deiner Challenge "{activeChallenge.title}" passen. 
              Die Empfehlungen werden basierend auf Kategorie ({activeChallenge.category}) und Zielgruppe optimiert.
            </AlertDescription>
          </Alert>
        )}
        
        <CreatorFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CreatorGrid 
              creators={creators} 
              isLoading={isLoading}
              onSelectCreator={handleCreatorSelect}
              selectedCreatorId={selectedCreator?.id}
            />
          </div>
          
          <div className="lg:col-span-1">
            {selectedCreator ? (
              <CreatorDetail creator={selectedCreator} />
            ) : (
              <Card className="h-full bg-jillr-darkBlue/30 border-jillr-neonPurple/30">
                <CardContent className="h-full flex flex-col items-center justify-center text-center p-6">
                  <AlertCircle className="h-12 w-12 text-jillr-neonPurple/50 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Creator-Details</h3>
                  <p className="text-gray-400 mb-4">
                    Wähle einen Creator aus, um mehr Informationen zu sehen
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorMarketplace;
