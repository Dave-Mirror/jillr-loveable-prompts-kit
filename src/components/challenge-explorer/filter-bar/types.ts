
export type ChallengeCategory = 'all' | 'video' | 'photo' | 'fitness' | 'ar' | 'social' | 'geofencing' | 'easter-egg';
export type BrandFilter = 'all' | string;
export type LocationFilter = 'current' | 'city' | 'global';
export type TimeFilter = 'now' | 'today' | 'week' | 'all';

export interface FilterBarProps {
  categoryFilter: ChallengeCategory;
  setCategoryFilter: (value: ChallengeCategory) => void;
  brandFilter: BrandFilter;
  setBrandFilter: (value: BrandFilter) => void;
  locationFilter: LocationFilter;
  setLocationFilter: (value: LocationFilter) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (value: TimeFilter) => void;
}

export interface CategoryFilterProps {
  categoryFilter: ChallengeCategory;
  setCategoryFilter: (value: ChallengeCategory) => void;
}

export interface BrandFilterProps {
  brandFilter: BrandFilter;
  setBrandFilter: (value: BrandFilter) => void;
}

export interface LocationFilterProps {
  locationFilter: LocationFilter;
  setLocationFilter: (value: LocationFilter) => void;
}

export interface TimeFilterProps {
  timeFilter: TimeFilter;
  setTimeFilter: (value: TimeFilter) => void;
}

export interface QuickFiltersProps {
  categoryFilter: ChallengeCategory;
  setCategoryFilter: (value: ChallengeCategory) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (value: TimeFilter) => void;
  locationFilter: LocationFilter;
  setLocationFilter: (value: LocationFilter) => void;
}

// Mock brands for display in the brand filter
export const mockBrands = [
  { id: 'b1', name: 'Nike', logo: '/assets/brands/nike-logo.png' },
  { id: 'b2', name: 'Adidas', logo: '/assets/brands/adidas-logo.png' },
  { id: 'b3', name: 'Starbucks', logo: '/assets/brands/starbucks-logo.png' },
  { id: 'b4', name: 'Jillr', logo: '/assets/brands/jillr-logo.png' },
  { id: 'b5', name: 'Under Armour', logo: '/assets/brands/ua-logo.png' }
];
