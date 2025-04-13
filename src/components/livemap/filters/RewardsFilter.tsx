
import React from 'react';
import FilterSection from './FilterSection';
import FilterCheckboxItem from './FilterCheckboxItem';
import { MapFilters } from '@/types/livemap';

interface RewardsFilterProps {
  filters: MapFilters;
  onChange: (category: string, value: string) => void;
}

const RewardsFilter: React.FC<RewardsFilterProps> = ({ filters, onChange }) => {
  return (
    <FilterSection title="Rewards">
      <div className="space-y-3">
        <FilterCheckboxItem 
          id="limited-products" 
          label="Limited Products"
          checked={filters.rewardFilters?.includes('limitedProducts')}
          onChange={() => onChange('rewardFilters', 'limitedProducts')}
        />
        
        <FilterCheckboxItem 
          id="cash-rewards" 
          label="Cash Rewards"
          checked={filters.rewardFilters?.includes('cashRewards')}
          onChange={() => onChange('rewardFilters', 'cashRewards')}
        />
        
        <FilterCheckboxItem 
          id="vip-access" 
          label="VIP Access"
          checked={filters.rewardFilters?.includes('vipAccess')}
          onChange={() => onChange('rewardFilters', 'vipAccess')}
        />
      </div>
    </FilterSection>
  );
};

export default RewardsFilter;
