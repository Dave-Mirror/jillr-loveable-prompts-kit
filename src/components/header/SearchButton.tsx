
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchButton: React.FC = () => {
  return (
    <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-white/10">
      <Search size={18} />
    </Button>
  );
};

export default SearchButton;
