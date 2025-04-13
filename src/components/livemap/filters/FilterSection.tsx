
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
      <Separator />
    </div>
  );
};

export default FilterSection;
