
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Rocket } from 'lucide-react';

const LevelBoostCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/10">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="text-jillr-neonPurple" />
              Boost dein Level!
            </h3>
            <p className="text-muted-foreground mb-4 md:mb-0">
              Nimm an mehreren Challenges teil, um schneller XP zu sammeln und exklusive Vorteile freizuschalten.
            </p>
          </div>
          <Button size="lg" className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80" asChild>
            <Link to="/explore">
              <Rocket className="mr-2 h-4 w-4" />
              Zu den Top Challenges
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelBoostCard;
