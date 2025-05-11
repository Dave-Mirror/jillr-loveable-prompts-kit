
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  resetFilters: () => void;
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  resetFilters,
  title = "Keine Challenges gefunden",
  description = "Mit deinen aktuellen Filtereinstellungen wurden keine Challenges gefunden. Versuche andere Filter oder schau später wieder vorbei."
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Sparkles className="h-16 w-16 text-jillr-neonPurple mb-4 opacity-50" />
      <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-lg">
        {description}
      </p>
      <Button 
        variant="outline"
        className="border-jillr-neonPurple/30 text-jillr-neonPurple hover:bg-jillr-neonPurple/20"
        onClick={resetFilters}
      >
        Filter zurücksetzen
      </Button>
    </div>
  );
};

export default EmptyState;
