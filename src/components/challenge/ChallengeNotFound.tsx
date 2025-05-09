
import React from 'react';
import { Button } from '@/components/ui/button';

export const ChallengeNotFound: React.FC = () => {
  return (
    <div className="container py-24 text-center">
      <h2 className="text-2xl font-bold mb-4">Challenge nicht gefunden</h2>
      <p className="text-muted-foreground mb-8">Die gesuchte Challenge konnte nicht gefunden werden.</p>
      <Button variant="default" asChild>
        <a href="/explore">Zurück zur Übersicht</a>
      </Button>
    </div>
  );
};
