
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Zap, ArrowUp, ArrowDown, Gift, Calendar } from 'lucide-react';

// Mock transaction data - in a real app this would come from the database
const mockTransactions = [
  { 
    id: 1, 
    type: 'reward', 
    subtype: 'xp',
    amount: 250, 
    description: 'Challenge "Summer Fashion" abgeschlossen', 
    date: '2023-07-15T14:23:00Z' 
  },
  { 
    id: 2, 
    type: 'reward', 
    subtype: 'coins',
    amount: 100, 
    description: 'Täglicher Login Bonus', 
    date: '2023-07-14T09:15:00Z' 
  },
  { 
    id: 3, 
    type: 'spend', 
    subtype: 'coins',
    amount: 500, 
    description: 'Gutschein eingelöst', 
    date: '2023-07-10T16:45:00Z' 
  },
  { 
    id: 4, 
    type: 'reward', 
    subtype: 'physical',
    amount: 0, 
    description: 'T-Shirt für "Dance Challenge" erhalten', 
    date: '2023-07-05T11:30:00Z' 
  },
  { 
    id: 5, 
    type: 'reward', 
    subtype: 'xp',
    amount: 500, 
    description: 'Level 5 erreicht', 
    date: '2023-07-01T18:20:00Z' 
  },
];

interface TransactionHistoryProps {
  walletData: {
    xp_total: number;
    coins_total: number;
  };
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ walletData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="text-jillr-neonBlue" />
            Transaktionsverlauf
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4 text-jillr-neonGreen" />
              <span>{walletData.coins_total} Coins</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-jillr-neonPurple" />
              <span>{walletData.xp_total} XP</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransactions.map(transaction => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'reward' 
                    ? 'bg-green-500/10' 
                    : 'bg-amber-500/10'
                }`}>
                  {transaction.type === 'reward' ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-amber-500" />
                  )}
                </div>
                
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('de-DE', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {transaction.subtype === 'xp' && (
                  <Badge className="bg-jillr-neonPurple/80">
                    <Zap className="h-3 w-3 mr-1" />
                    +{transaction.amount} XP
                  </Badge>
                )}
                
                {transaction.subtype === 'coins' && (
                  <Badge className={transaction.type === 'reward' ? 'bg-jillr-neonGreen' : 'bg-amber-500'}>
                    <Coins className="h-3 w-3 mr-1" />
                    {transaction.type === 'reward' ? '+' : '-'}{transaction.amount} Coins
                  </Badge>
                )}
                
                {transaction.subtype === 'physical' && (
                  <Badge className="bg-jillr-neonBlue">
                    <Gift className="h-3 w-3 mr-1" />
                    Physischer Reward
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
