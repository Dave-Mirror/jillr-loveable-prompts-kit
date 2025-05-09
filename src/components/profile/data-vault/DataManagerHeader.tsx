
import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DataManagerHeaderProps {
  totalXpRewarded: number;
  nextRewardXp: number;
}

const DataManagerHeader: React.FC<DataManagerHeaderProps> = ({ 
  totalXpRewarded,
  nextRewardXp
}) => {
  const progressPercentage = Math.min(100, (totalXpRewarded / nextRewardXp) * 100);
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="h-5 w-5 text-jillr-neonPurple" />
        <h2 className="text-xl font-bold">Meine Daten</h2>
      </div>
      
      <p className="text-muted-foreground mb-4">
        Bei Jillr behältst du die Kontrolle über deine Daten – und wirst dafür belohnt.
        Entscheide selbst, welche Daten du teilen möchtest und erhalte XP als Belohnung.
      </p>
      
      <div className="p-4 border border-jillr-neonPurple/30 rounded-lg bg-jillr-dark/50 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-jillr-neonPurple" />
            <span className="font-semibold">Deine XP durch Datenfreigaben</span>
          </div>
          <span className="text-lg font-bold text-jillr-neonPurple">
            {totalXpRewarded} XP
          </span>
        </div>
        
        <div className="mb-1">
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0 XP</span>
          <span>{nextRewardXp} XP für nächsten Produktdrop</span>
        </div>
      </div>
    </div>
  );
};

export default DataManagerHeader;
