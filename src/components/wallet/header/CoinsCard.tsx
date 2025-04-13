
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Coins, TrendingUp } from 'lucide-react';

interface CoinsCardProps {
  coinsTotal: number;
}

const CoinsCard: React.FC<CoinsCardProps> = ({ coinsTotal }) => {
  return (
    <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonGreen/20 border-jillr-neonGreen/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="text-jillr-neonGreen" />
          Coins
        </CardTitle>
        <CardDescription>Dein aktuelles Guthaben</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-2">{coinsTotal}</div>
        <div className="text-sm text-gray-400">Für Prämien und Belohnungen einlösbar</div>
        {coinsTotal >= 5000 && (
          <div className="mt-2 text-xs flex items-center gap-1 text-jillr-neonGreen">
            <TrendingUp className="h-3 w-3" />
            Genug für Premium-Belohnungen
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoinsCard;
