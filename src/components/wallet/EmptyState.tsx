
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, Wallet as WalletIcon } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="text-center max-w-md p-6 bg-card rounded-lg border shadow-md">
        <WalletIcon className="h-12 w-12 mx-auto mb-4 text-jillr-neonPurple" />
        <h2 className="text-xl font-bold mb-4">Wallet Vorschau</h2>
        <p className="text-muted-foreground mb-6">
          Dies ist eine Vorschau Ihrer Wallet. Melden Sie sich an, um Ihre persönlichen Belohnungen, XP und Münzen zu sehen.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button size="lg" className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80" asChild>
            <Link to="/auth">
              <LogIn className="mr-2 h-4 w-4" />
              Jetzt anmelden
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" asChild>
            <Link to="/explore">
              Mehr entdecken
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
