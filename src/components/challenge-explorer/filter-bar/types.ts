
import { ChallengeCategory, BrandFilter, LocationFilter, TimeFilter } from '@/pages/ChallengeExplorer';

export interface FilterBarProps {
  categoryFilter: ChallengeCategory;
  setCategoryFilter: (filter: ChallengeCategory) => void;
  brandFilter: BrandFilter;
  setBrandFilter: (filter: BrandFilter) => void;
  locationFilter: LocationFilter;
  setLocationFilter: (filter: LocationFilter) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
}

export interface CategoryFilterProps {
  categoryFilter: ChallengeCategory;
  setCategoryFilter: (filter: ChallengeCategory) => void;
}

export interface BrandFilterProps {
  brandFilter: BrandFilter;
  setBrandFilter: (filter: BrandFilter) => void;
}

export interface LocationFilterProps {
  locationFilter: LocationFilter;
  setLocationFilter: (filter: LocationFilter) => void;
}

export interface TimeFilterProps {
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
}

export interface QuickFiltersProps {
  categoryFilter: ChallengeCategory;
  setCategoryFilter: (filter: ChallengeCategory) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  locationFilter: LocationFilter;
  setLocationFilter: (filter: LocationFilter) => void;
}

// Mock brand data
export const mockBrands = [
  { id: 'b1', name: 'Nike', logo: '/assets/brands/nike-logo.png' },
  { id: 'b2', name: 'Adidas', logo: '/assets/brands/adidas-logo.png' },
  { id: 'b3', name: 'Starbucks', logo: '/assets/brands/starbucks-logo.png' },
  { id: 'b4', name: 'Sephora', logo: '/assets/brands/sephora-logo.png' },
  { id: 'b5', name: 'Under Armour', logo: '/assets/brands/under-armour-logo.png' }
];
