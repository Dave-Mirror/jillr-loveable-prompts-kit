
import React from 'react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Gift, Package, Target, Users, MapPin, Flame, Award } from 'lucide-react';

const LiveMapFilters = () => {
  const { filters, setFilters, resetFilters } = useLiveMap();

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      
      if (!newFilters[category]) {
        newFilters[category] = [];
      }
      
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      
      return newFilters;
    });
  };

  const handleRadiusChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      radius: value[0]
    }));
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Map Elements</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="easter-eggs" 
              checked={filters.mapElements?.includes('easteregg')}
              onCheckedChange={() => handleCheckboxChange('mapElements', 'easteregg')}
            />
            <Label htmlFor="easter-eggs" className="flex items-center">
              <Gift className="h-4 w-4 mr-2 text-yellow-500" /> Easter Eggs
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="product-drops" 
              checked={filters.mapElements?.includes('drop')}
              onCheckedChange={() => handleCheckboxChange('mapElements', 'drop')}
            />
            <Label htmlFor="product-drops" className="flex items-center">
              <Package className="h-4 w-4 mr-2 text-blue-500" /> Product Drops
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="challenges" 
              checked={filters.mapElements?.includes('challenge')}
              onCheckedChange={() => handleCheckboxChange('mapElements', 'challenge')}
            />
            <Label htmlFor="challenges" className="flex items-center">
              <Target className="h-4 w-4 mr-2 text-red-500" /> Challenges
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="team-events" 
              checked={filters.mapElements?.includes('teamevent')}
              onCheckedChange={() => handleCheckboxChange('mapElements', 'teamevent')}
            />
            <Label htmlFor="team-events" className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-purple-500" /> Team Events
            </Label>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Easter Egg Types</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="ar-object" 
              checked={filters.easterEggTypes?.includes('ar')}
              onCheckedChange={() => handleCheckboxChange('easterEggTypes', 'ar')}
            />
            <Label htmlFor="ar-object">AR Objects</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="qr-code" 
              checked={filters.easterEggTypes?.includes('qr')}
              onCheckedChange={() => handleCheckboxChange('easterEggTypes', 'qr')}
            />
            <Label htmlFor="qr-code">QR Codes</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="geofencing" 
              checked={filters.easterEggTypes?.includes('geofencing')}
              onCheckedChange={() => handleCheckboxChange('easterEggTypes', 'geofencing')}
            />
            <Label htmlFor="geofencing">Geofencing Zones</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="nfc-tag" 
              checked={filters.easterEggTypes?.includes('nfc')}
              onCheckedChange={() => handleCheckboxChange('easterEggTypes', 'nfc')}
            />
            <Label htmlFor="nfc-tag">NFC Tags</Label>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Location</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label>Distance radius: {filters.radius} km</Label>
            </div>
            <Slider 
              defaultValue={[5]} 
              max={20} 
              step={1}
              value={[filters.radius || 5]}
              onValueChange={handleRadiusChange}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="nearby" 
                checked={filters.locationFilters?.includes('nearby')}
                onCheckedChange={() => handleCheckboxChange('locationFilters', 'nearby')}
              />
              <Label htmlFor="nearby" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" /> In my area
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="popular" 
                checked={filters.locationFilters?.includes('popular')}
                onCheckedChange={() => handleCheckboxChange('locationFilters', 'popular')}
              />
              <Label htmlFor="popular" className="flex items-center">
                <Flame className="h-4 w-4 mr-2" /> Popular locations
              </Label>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Rewards</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="limited-products" 
              checked={filters.rewardFilters?.includes('limitedProducts')}
              onCheckedChange={() => handleCheckboxChange('rewardFilters', 'limitedProducts')}
            />
            <Label htmlFor="limited-products">Limited Products</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="cash-rewards" 
              checked={filters.rewardFilters?.includes('cashRewards')}
              onCheckedChange={() => handleCheckboxChange('rewardFilters', 'cashRewards')}
            />
            <Label htmlFor="cash-rewards">Cash Rewards</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="vip-access" 
              checked={filters.rewardFilters?.includes('vipAccess')}
              onCheckedChange={() => handleCheckboxChange('rewardFilters', 'vipAccess')}
            />
            <Label htmlFor="vip-access">VIP Access</Label>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
      </div>
    </div>
  );
};

export default LiveMapFilters;
