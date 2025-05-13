
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterCheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ReactNode;
}

const FilterCheckboxItem: React.FC<FilterCheckboxItemProps> = ({
  id,
  label,
  checked,
  onChange,
  icon
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onChange} 
        className="data-[state=checked]:bg-jillr-neonPurple data-[state=checked]:border-jillr-neonPurple" 
      />
      <label 
        htmlFor={id} 
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
      >
        {icon && icon}
        {label}
      </label>
    </div>
  );
};

export default FilterCheckboxItem;
