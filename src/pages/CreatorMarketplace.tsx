
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import CreatorGrid from '@/components/marketplace/CreatorGrid';
import CreatorFilters from '@/components/marketplace/CreatorFilters';
import CreatorDetail from '@/components/marketplace/CreatorDetail';
import { useCreatorSearch } from '@/hooks/marketplace/useCreatorSearch';
import { useActiveChallenge } from '@/hooks/marketplace/useActiveChallenge';

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
  const { activeChallenge } = useActiveChallenge();

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
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">Creator-Marktplatz</h1>
        
        {activeChallenge && (
          <div className="p-4 rounded-lg bg-jillr-darkBlue border border-jillr-neonPurple/30">
            <h2 className="text-lg font-semibold mb-2">Aktive Challenge: {activeChallenge.title}</h2>
            <p className="text-sm text-gray-300">
              Creator-Empfehlungen basieren auf dieser Challenge
            </p>
          </div>
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
              <div className="h-full bg-jillr-darkBlue/50 rounded-lg border border-jillr-neonPurple/30 p-6 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-medium mb-2">Creator-Details</h3>
                <p className="text-gray-400 mb-4">
                  Wähle einen Creator aus, um mehr Informationen zu sehen
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorMarketplace;
