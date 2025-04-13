
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface HeaderTitleProps {
  level: number;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ level }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Meine Wallet</h1>
      
      <div className="flex items-center gap-2">
        <StatusBadge level={level} />
        
        <Button variant="outline" size="sm" asChild>
          <Link to="/shop">
            <Coins className="mr-2 h-4 w-4 text-jillr-neonGreen" />
            Shop
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderTitle;
