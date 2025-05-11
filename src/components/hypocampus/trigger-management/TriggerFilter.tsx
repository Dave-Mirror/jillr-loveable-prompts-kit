
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface TriggerFilterProps {
  userRole: 'personal' | 'brand';
}

const TriggerFilter: React.FC<TriggerFilterProps> = ({ userRole }) => {
  const [isContentTypeOpen, setIsContentTypeOpen] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [effectivenessRange, setEffectivenessRange] = useState<number[]>([30]);
  
  const contentCategoryOptions: FilterOption[] = [
    { value: 'all', label: 'Alle Kategorien' },
    { value: 'video', label: 'Video' },
    { value: 'image', label: 'Bild' },
    { value: 'text', label: 'Text' },
    { value: 'audio', label: 'Audio' },
  ];
  
  const audienceOptions: FilterOption[] = [
    { value: 'all', label: 'Alle Zielgruppen' },
    { value: 'gen-z', label: 'Gen Z' },
    { value: 'millennials', label: 'Millennials' },
    { value: 'gen-x', label: 'Gen X' },
    { value: 'boomers', label: 'Baby Boomers' },
  ];
  
  const industryOptions = userRole === 'brand' ? [
    { value: 'all', label: 'Alle Branchen' },
    { value: 'retail', label: 'Einzelhandel' },
    { value: 'tech', label: 'Technologie' },
    { value: 'finance', label: 'Finanzen' },
    { value: 'health', label: 'Gesundheit' },
    { value: 'food', label: 'Lebensmittel' },
    { value: 'fashion', label: 'Mode' },
  ] : [];
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Kategorie</Label>
        <FilterDropdown
          options={contentCategoryOptions}
          activeValue="all"
          onSelect={() => {}}
          label="Kategorie"
          fullWidth
        />
      </div>
      
      {userRole === 'brand' && (
        <div className="space-y-4">
          <Label>Zielgruppe</Label>
          <FilterDropdown
            options={audienceOptions}
            activeValue="all"
            onSelect={() => {}}
            label="Zielgruppe"
            fullWidth
          />
        </div>
      )}
      
      <div className="space-y-4">
        <Label>Effektivität (mind. %)</Label>
        <Slider
          value={effectivenessRange}
          onValueChange={setEffectivenessRange}
          min={0}
          max={100}
          step={5}
          className="w-full"
        />
        <div className="text-right text-sm text-gray-400">
          {effectivenessRange[0]}%
        </div>
      </div>
      
      <Collapsible open={isContentTypeOpen} onOpenChange={setIsContentTypeOpen} className="space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center justify-between w-full">
            <span>Content-Typen</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isContentTypeOpen ? 'transform rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="videos" className="accent-jillr-neonPurple" />
              <Label htmlFor="videos">Videos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="stories" className="accent-jillr-neonPurple" />
              <Label htmlFor="stories">Stories</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="posts" className="accent-jillr-neonPurple" />
              <Label htmlFor="posts">Posts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="shorts" className="accent-jillr-neonPurple" />
              <Label htmlFor="shorts">Shorts</Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {userRole === 'brand' && (
        <Collapsible open={isIndustryOpen} onOpenChange={setIsIndustryOpen} className="space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center justify-between w-full">
              <span>Branche</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isIndustryOpen ? 'transform rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Branche auswählen" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>
      )}
      
      <div className="pt-2">
        <Button className="w-full" variant="outline">
          Filter zurücksetzen
        </Button>
      </div>
    </div>
  );
};

export default TriggerFilter;
