
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Zap } from 'lucide-react';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';

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
  const categoryOptions: FilterOption[] = [
    { value: 'all', label: 'Alle Kategorien' },
    { value: 'time', label: 'Zeit' },
    { value: 'location', label: 'Ort' },
    { value: 'activity', label: 'Aktivität' },
    { value: 'weather', label: 'Wetter' },
    ...(userRole !== 'brand' ? [
      { value: 'mood', label: 'Stimmung' },
      { value: 'social', label: 'Social Media' },
      { value: 'achievement', label: 'Erfolge' }
    ] : [])
  ];
  
  const statusOptions: FilterOption[] = [
    { value: 'all', label: 'Alle Status' },
    { value: 'active', label: 'Aktiv' },
    { value: 'inactive', label: 'Inaktiv' }
  ];
  
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
          <FilterDropdown
            options={categoryOptions} 
            activeValue={categoryFilter}
            onSelect={setCategoryFilter}
            label="Kategorie"
            fullWidth
          />
        </div>
        
        <div className="flex-1 min-w-[150px]">
          <FilterDropdown
            options={statusOptions}
            activeValue={statusFilter}
            onSelect={setStatusFilter}
            label="Status"
            fullWidth
          />
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
