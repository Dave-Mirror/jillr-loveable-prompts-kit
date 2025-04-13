
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const levelOptions = [
  { value: 'open', label: 'Open for all' },
  { value: 'level2', label: 'Level 2+ (5K+ followers, medium engagement)' },
  { value: 'level3', label: 'Level 3+ (15K+ followers, 50K+ views, active creators)' },
  { value: 'level4', label: 'Level 4/5 only (Influencers, VIP participants, brand ambassadors)' },
];

const languages = [
  { value: 'auto', label: 'Auto-detect based on location' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'German' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'it', label: 'Italian' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
];

const TargetAudience = ({ data, onChange }) => {
  const handleGenderChange = (genderId) => {
    const newGenders = data.gender.includes(genderId)
      ? data.gender.filter(id => id !== genderId)
      : [...data.gender, genderId];
    
    onChange({ gender: newGenders });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Target Audience</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Define who can participate in your challenge.
        </p>
        
        <div className="space-y-6">
          <FormField
            name="ageRange"
            render={() => (
              <FormItem>
                <FormLabel>Age Range</FormLabel>
                <FormDescription>
                  Select the age range for participants (18-65)
                </FormDescription>
                <FormControl>
                  <div className="space-y-4">
                    <Slider 
                      defaultValue={[18, 65]} 
                      min={13} 
                      max={99} 
                      step={1}
                      value={data.ageRange}
                      onValueChange={(value) => onChange({ ageRange: value })}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm">{data.ageRange[0]} years</span>
                      <span className="text-sm">{data.ageRange[1]} years</span>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            name="gender"
            render={() => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormDescription>
                  Select target genders (multiple selection possible)
                </FormDescription>
                <div className="flex flex-wrap gap-4 mt-2">
                  <Card className={`
                    cursor-pointer transition-all flex-grow
                    ${data.gender.includes('male') ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
                  `}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Checkbox 
                        id="gender-male"
                        checked={data.gender.includes('male')}
                        onCheckedChange={() => handleGenderChange('male')}
                      />
                      <div>
                        <span className="text-lg mr-2">🟢</span>
                        <label 
                          htmlFor="gender-male"
                          className="font-medium cursor-pointer"
                        >
                          Male
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`
                    cursor-pointer transition-all flex-grow
                    ${data.gender.includes('female') ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
                  `}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Checkbox 
                        id="gender-female"
                        checked={data.gender.includes('female')}
                        onCheckedChange={() => handleGenderChange('female')}
                      />
                      <div>
                        <span className="text-lg mr-2">🔵</span>
                        <label 
                          htmlFor="gender-female"
                          className="font-medium cursor-pointer"
                        >
                          Female
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`
                    cursor-pointer transition-all flex-grow
                    ${data.gender.includes('diverse') ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
                  `}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Checkbox 
                        id="gender-diverse"
                        checked={data.gender.includes('diverse')}
                        onCheckedChange={() => handleGenderChange('diverse')}
                      />
                      <div>
                        <span className="text-lg mr-2">🟠</span>
                        <label 
                          htmlFor="gender-diverse"
                          className="font-medium cursor-pointer"
                        >
                          Diverse
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="location"
              render={() => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Berlin, Germany or Europe"
                      value={data.location}
                      onChange={(e) => onChange({ location: e.target.value })}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a city, country, or region for geo-targeting
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              name="language"
              render={() => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select 
                    value={data.language} 
                    onValueChange={(value) => onChange({ language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the language for your challenge
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Level Restriction for Participants</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Set minimum level requirements for participants.
        </p>
        
        <Select 
          value={data.levelRestriction} 
          onValueChange={(value) => onChange({ levelRestriction: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select level restriction" />
          </SelectTrigger>
          <SelectContent>
            {levelOptions.map(level => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-2">
          Restricting by level ensures your challenge reaches creators with the appropriate reach and engagement.
        </p>
      </div>
    </div>
  );
};

export default TargetAudience;
