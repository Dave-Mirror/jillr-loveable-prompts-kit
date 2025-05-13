
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  children,
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-jillr-border pb-4">
      <div 
        className="flex justify-between items-center py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-base">{title}</h3>
        {isOpen ? 
          <ChevronUp className="h-4 w-4" /> : 
          <ChevronDown className="h-4 w-4" />
        }
      </div>
      
      {isOpen && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
