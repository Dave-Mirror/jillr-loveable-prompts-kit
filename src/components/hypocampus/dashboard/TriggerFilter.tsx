
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Zap } from 'lucide-react';

interface TriggerFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  resetFilters: () => void;
  userRole: 'personal' | 'brand';
}

const TriggerFilter: React.FC<TriggerFilterProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  resetFilters,
  userRole,
}) => {
  return (
    <div className="space-y-4 mb-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Trigger suchen..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow bg-jillr-darkBlue/40 border-gray-700"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-[150px]">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Kategorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Kategorien</SelectItem>
              <SelectItem value="time">Zeit</SelectItem>
              <SelectItem value="location">Ort</SelectItem>
              <SelectItem value="activity">Aktivität</SelectItem>
              <SelectItem value="weather">Wetter</SelectItem>
              {userRole !== 'brand' && (
                <>
                  <SelectItem value="mood">Stimmung</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="achievement">Erfolge</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 min-w-[150px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="active">Aktiv</SelectItem>
              <SelectItem value="inactive">Inaktiv</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={resetFilters}
          className="flex-none"
          title="Filter zurücksetzen"
        >
          <Zap className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TriggerFilter;
