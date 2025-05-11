
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TriggerMatchingSectionProps {
  userRole: 'personal' | 'brand';
}

const TriggerMatchingSection: React.FC<TriggerMatchingSectionProps> = ({ userRole }) => {
  // Sample data - in real app, this would come from backend analysis
  const matchingData = userRole === 'personal' ? [
    { category: 'Fitness', matchScore: 92, recommended: true },
    { category: 'Travel', matchScore: 78, recommended: true },
    { category: 'Tech', matchScore: 65, recommended: false },
    { category: 'Food', matchScore: 45, recommended: false },
  ] : [
    { category: 'Gen Z', matchScore: 89, recommended: true },
    { category: 'Millennials', matchScore: 72, recommended: true },
    { category: 'Fashion Enthusiasts', matchScore: 68, recommended: true },
    { category: 'Tech Early Adopters', matchScore: 55, recommended: false },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {userRole === 'personal' ? 'Deine perfekten Matches' : 'Zielgruppen-Matching'}
        </CardTitle>
        <CardDescription>
          {userRole === 'personal' 
            ? 'Diese Kategorien passen am besten zu deinem Profil' 
            : 'Diese Zielgruppen haben die höchste Übereinstimmung mit Ihren Trigger-Einstellungen'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matchingData.map((match, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center p-3 rounded-lg ${
                match.recommended 
                  ? 'bg-jillr-neonPurple/10 border border-jillr-neonPurple/30' 
                  : 'bg-jillr-darkBlue/20 border border-jillr-border/20'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium text-lg">{match.category}</h3>
                  {match.recommended && (
                    <Badge className="ml-2 bg-jillr-neonPurple/80">Empfohlen</Badge>
                  )}
                </div>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        match.matchScore > 80 
                          ? 'bg-jillr-neonPurple' 
                          : match.matchScore > 60 
                            ? 'bg-jillr-neonBlue' 
                            : 'bg-jillr-neonGreen'
                      }`}
                      style={{ width: `${match.matchScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400">{match.matchScore}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-center text-gray-400">
          {userRole === 'personal' 
            ? 'Basierend auf deinen bisherigen Interaktionen und Präferenzen'
            : 'Basierend auf der Analyse von Nutzerinteraktionen und Trigger-Performance'
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerMatchingSection;
