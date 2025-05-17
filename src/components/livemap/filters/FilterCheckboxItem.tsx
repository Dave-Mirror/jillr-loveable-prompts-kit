
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
      />
      <label 
        htmlFor={id}
        className="text-sm flex items-center space-x-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{label}</span>
      </label>
    </div>
  );
};

export default FilterCheckboxItem;
