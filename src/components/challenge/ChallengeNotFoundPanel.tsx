import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Search, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChallengeNotFoundPanelProps {
  slug?: string;
  id?: string;
}

const ChallengeNotFoundPanel: React.FC<ChallengeNotFoundPanelProps> = ({ slug, id }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cosmic-dark flex items-center justify-center p-4">
      <Card className="challenge-card w-full max-w-md text-center">
        <CardContent className="p-8">
          {/* Hologram icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-jillr-neonCyan/20 via-jillr-neonPurple/20 to-jillr-neonPink/20 rounded-full flex items-center justify-center">
            <Search className="h-10 w-10 text-jillr-neonCyan" />
          </div>
          
          {/* Error message */}
          <h1 className="text-2xl font-bold text-[var(--txt)] mb-4">
            Challenge nicht gefunden
          </h1>
          
          <p className="text-[var(--txt-dim)] mb-6 leading-relaxed">
            Die angeforderte Challenge existiert nicht oder wurde entfernt. 
            {(slug || id) && (
              <span className="block text-xs mt-2 font-mono text-jillr-neonCyan/70">
                ({slug ? `slug: ${slug}` : `id: ${id}`})
              </span>
            )}
          </p>
          
          {/* Action buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/challenge-feed')}
              className="w-full bg-gradient-to-r from-jillr-neonCyan/20 to-jillr-neonPurple/20 border border-white/30 backdrop-blur-xl text-white font-semibold hover:from-jillr-neonCyan/30 hover:to-jillr-neonPurple/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Übersicht
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/city-clash')}
              className="w-full filter-chip"
            >
              <Zap className="h-4 w-4 mr-2" />
              Alle Challenges anzeigen
            </Button>
          </div>
          
          {/* Additional help text */}
          <p className="text-xs text-[var(--txt-dim)] mt-6">
            Wenn du glaubst, dass dies ein Fehler ist, kontaktiere uns über den Support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeNotFoundPanel;