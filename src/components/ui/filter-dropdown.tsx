
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter, ListFilter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterDropdownProps {
  options: FilterOption[];
  activeValue: string;
  onSelect: (value: string) => void;
  label?: string;
  className?: string;
  buttonVariant?: 'default' | 'outline' | 'ghost';
  showFilterIcon?: boolean;
  fullWidth?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  activeValue,
  onSelect,
  label = 'Filter',
  className = '',
  buttonVariant = 'outline',
  showFilterIcon = true,
  fullWidth = false
}) => {
  const activeOption = options.find(opt => opt.value === activeValue) || options[0];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={buttonVariant} 
          className={`flex items-center gap-2 ${fullWidth ? 'w-full justify-between' : ''} ${className}`}
          size="sm"
        >
          {showFilterIcon && (
            buttonVariant === 'default' ? 
              <ListFilter className="h-4 w-4" /> : 
              <Filter className="h-4 w-4" />
          )}
          {label}: {activeOption?.label}
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-jillr-dark border border-jillr-neonPurple/30 min-w-[200px] z-50"
        align="end"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`cursor-pointer flex items-center ${
              activeValue === option.value ? 'bg-jillr-neonPurple/20 text-jillr-neonPurple' : ''
            }`}
          >
            {option.icon && <span className="mr-2">{option.icon}</span>}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
