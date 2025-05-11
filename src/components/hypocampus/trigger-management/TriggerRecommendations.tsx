
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, Clock, Users } from 'lucide-react';

interface TriggerRecommendationsProps {
  userRole: 'personal' | 'brand';
}

const TriggerRecommendations: React.FC<TriggerRecommendationsProps> = ({ userRole }) => {
  const recommendations = userRole === 'personal' ? [
    {
      title: "Morgens aktiv",
      description: "Erhalte Belohnungen für morgendliche Aktivität",
      type: "time",
      performance: 87,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Aktivitäts-Streak",
      description: "Bonus für Aktivität an 3 Tagen in Folge",
      type: "activity",
      performance: 92,
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Social Sharing",
      description: "XP für geteilte Inhalte",
      type: "social",
      performance: 76,
      icon: <Users className="h-4 w-4" />,
    },
  ] : [
    {
      title: "Gen Z Engagement",
      description: "Morgendliche Coupons für Gen Z",
      type: "audience",
      performance: 91,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Weekend Challenges",
      description: "Höheres Engagement am Wochenende",
      type: "timing",
      performance: 88,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Location Rewards",
      description: "Ortsbasierte Aktionen",
      type: "location",
      performance: 82,
      icon: <Zap className="h-4 w-4" />,
    },
  ];
  
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <div 
          key={index}
          className="p-3 border border-jillr-neonPurple/30 rounded-lg hover:border-jillr-neonPurple/50 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-jillr-neonPurple/20 p-1.5 rounded-md">
                {rec.icon}
              </div>
              <h3 className="font-medium">{rec.title}</h3>
            </div>
            <Badge variant="outline" className="bg-jillr-neonPurple/10">
              {rec.performance}% Effektiv
            </Badge>
          </div>
          <p className="text-sm text-gray-400 mb-3">{rec.description}</p>
          <Button variant="outline" size="sm" className="w-full">
            Erstellen
          </Button>
        </div>
      ))}
      
      <div className="text-center pt-2">
        <Button variant="link" size="sm" className="text-jillr-neonPurple">
          Alle Empfehlungen anzeigen
        </Button>
      </div>
    </div>
  );
};

export default TriggerRecommendations;
