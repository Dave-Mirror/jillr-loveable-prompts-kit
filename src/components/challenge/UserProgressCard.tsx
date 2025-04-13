
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Coins } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type UserProgressCardProps = {
  user: any;
  challenge: any;
  submissions: any[];
}

export const UserProgressCard: React.FC<UserProgressCardProps> = ({ 
  user, 
  challenge, 
  submissions 
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Dein aktueller Stand</CardTitle>
        <CardDescription>
          Deine XP und Coins für diese Challenge
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg glassmorphism">
              <div className="flex items-center">
                <Zap size={20} className="text-jillr-neonPurple mr-2" />
                <span>XP für diese Challenge</span>
              </div>
              <div className="font-bold text-jillr-neonPurple">+{challenge.xp_reward || 250} XP</div>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg glassmorphism">
              <div className="flex items-center">
                <Coins size={20} className="text-yellow-500 mr-2" />
                <span>Coins für diese Challenge</span>
              </div>
              <div className="font-bold text-yellow-500">+{challenge.coin_reward || 100} Coins</div>
            </div>
            
            {submissions.length === 0 && (
              <div className="text-center py-3 text-muted-foreground text-sm">
                Du hast noch nicht an dieser Challenge teilgenommen.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="mb-4 text-muted-foreground">
              Melde dich an, um deine Belohnungen zu sehen
            </p>
            <Link to="/auth">
              <Button>Anmelden</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
