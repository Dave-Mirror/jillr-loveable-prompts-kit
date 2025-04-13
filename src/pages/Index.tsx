
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/navigation/PageContainer';

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageContainer nextPage="/explore">
      <div className="container mx-auto max-w-6xl pt-4">
        <div className="flex flex-col space-y-8">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Willkommen bei Jillr</h1>
            <p className="text-lg text-muted-foreground">
              Deine Plattform für spannende Challenges und Belohnungen
            </p>
            
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => navigate('/explore')} 
                className="mt-4 gap-2 bg-jillr-neonPurple hover:bg-jillr-neonPurple/90"
              >
                <span>Entdecken</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </section>
          
          {/* Tutorial for swipe gesture */}
          <div className="bg-muted/50 p-4 rounded-lg border border-border mt-8">
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
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
