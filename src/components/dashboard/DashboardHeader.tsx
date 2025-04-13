
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Creator Dashboard</h1>
        <p className="text-muted-foreground">Verwalte deine Challenges, Produkte und Statistiken</p>
      </div>
      <Link to="/challenge-builder">
        <Button className="mt-4 md:mt-0 bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
          <Video className="mr-2 h-4 w-4" /> Challenge starten
        </Button>
      </Link>
    </div>
  );
};

export default DashboardHeader;
