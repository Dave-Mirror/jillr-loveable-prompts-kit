
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/navigation/PageContainer';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <PageContainer nextPage="/explore">
      <div className="container mx-auto max-w-6xl pt-4">
        <div className="flex flex-col space-y-8">
          <section className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Willkommen bei Jillr</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Deine Plattform für spannende Challenges und Belohnungen
            </p>
            
            <div className="flex flex-wrap gap-3 mt-2">
              <Button 
                onClick={() => handleNavigate('/explore')} 
                className="gap-2 bg-jillr-neonPurple hover:bg-jillr-neonPurple/90"
              >
                <span>Entdecken</span>
                <ArrowRight size={16} />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleNavigate('/profile')}
                className="gap-2"
              >
                <span>Mein Profil</span>
              </Button>
            </div>
          </section>
          
          {/* Quick Navigation Section */}
          <section className="bg-jillr-darkBlue/50 p-4 rounded-lg border border-jillr-neonPurple/20">
            <h2 className="font-semibold mb-3">Schnellnavigation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Challenges', path: '/explore', color: 'bg-gradient-to-br from-jillr-neonPurple to-jillr-neonPurple/70' },
                { name: 'Leaderboard', path: '/leaderboard', color: 'bg-gradient-to-br from-jillr-neonBlue to-jillr-neonBlue/70' },
                { name: 'Live Map', path: '/livemap', color: 'bg-gradient-to-br from-green-500 to-green-700' },
                { name: 'Wallet', path: '/wallet', color: 'bg-gradient-to-br from-amber-500 to-amber-700' }
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`${item.color} p-3 md:p-4 rounded-lg text-white font-medium text-sm md:text-base hover:opacity-90 transition-opacity`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </section>
          
          {/* Tutorial for swipe gesture - only on mobile */}
          {isMobile && (
            <div className="bg-muted/50 p-4 rounded-lg border border-border mt-4">
              <h3 className="font-medium mb-2">Pro-Tipp: Navigiere mit Swipe-Gesten</h3>
              <p className="text-sm text-muted-foreground">
                Wische nach links, um zur nächsten Seite zu gelangen, und nach rechts, um zurückzukehren.
                Probier es aus!
              </p>
              <div className="flex justify-center mt-4">
                <div className="animate-pulse flex items-center gap-2">
                  <ArrowRight size={20} className="transform rotate-180" />
                  <span className="text-sm font-medium">Wischen</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
