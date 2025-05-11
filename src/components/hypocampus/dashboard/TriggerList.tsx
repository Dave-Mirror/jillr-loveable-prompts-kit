
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ContextTrigger } from '@/types/hypocampus';
import TriggerListItem from './TriggerListItem';

interface TriggerListProps {
  filteredTriggers: ContextTrigger[];
  searchQuery: string;
  categoryFilter: string;
  statusFilter: string; 
  resetFilters: () => void;
  handleToggleTrigger: (id: string, active: boolean) => void;
  user: any;
}

const TriggerList: React.FC<TriggerListProps> = ({
  filteredTriggers,
  searchQuery,
  categoryFilter,
  statusFilter,
  resetFilters,
  handleToggleTrigger,
  user
}) => {
  if (filteredTriggers.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">
          {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
            ? 'Keine Trigger entsprechen den Filterkriterien.'
            : user ? 'Du hast noch keine Trigger erstellt. Erstelle deinen ersten Trigger, um automatische Reaktionen zu definieren.' : 'Keine Demo-Trigger verfügbar.'}
        </p>
        {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all') && (
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={resetFilters}
          >
            Filter zurücksetzen
          </Button>
        )}
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-3">
        {filteredTriggers.map((trigger) => (
          <TriggerListItem 
            key={trigger.id} 
            trigger={trigger} 
            onToggle={handleToggleTrigger}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default TriggerList;
