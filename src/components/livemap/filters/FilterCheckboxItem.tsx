
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
      <Label htmlFor={id} className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </Label>
    </div>
  );
};

export default FilterCheckboxItem;
