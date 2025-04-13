
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, Award, Coins } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard';

interface StatCardsProps {
  stats: DashboardStats;
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border-jillr-neonPurple/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Eye className="text-jillr-neonPurple" />
            Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Gesamtaufrufe deiner Challenges</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonGreen/20 border-jillr-neonGreen/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Award className="text-jillr-neonGreen" />
            XP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalXp.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Gesamte Erfahrungspunkte</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPink/20 border-jillr-neonPink/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Coins className="text-jillr-neonPink" />
            Coins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalCoins.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Verfügbare Coins</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
