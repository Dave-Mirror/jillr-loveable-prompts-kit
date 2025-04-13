
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const kpiOptions = [
  { id: 'reach', label: 'Reach', description: 'Views, impressions', icon: '👁️' },
  { id: 'engagement', label: 'Engagement', description: 'Likes, shares, comments, saves', icon: '❤️' },
  { id: 'conversion', label: 'Clicks & Conversions', description: 'Affiliate links, coupon redemptions', icon: '🔗' },
  { id: 'quality', label: 'UGC Quality', description: 'Brand conformity, aesthetics, creativity', icon: '✨' },
  { id: 'location', label: 'Location-based Visits', description: 'Geofencing tracking, QR code scans', icon: '📍' },
];

const KpiSettings = ({ data, onChange }) => {
  const handleKpiChange = (kpiId) => {
    const newKpis = data.kpis.includes(kpiId)
      ? data.kpis.filter(id => id !== kpiId)
      : [...data.kpis, kpiId];
    
    onChange({ kpis: newKpis });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">KPIs to Measure</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select which key performance indicators you want to track for this challenge.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kpiOptions.map((kpi) => (
            <Card key={kpi.id} className={`
              cursor-pointer transition-all
              ${data.kpis.includes(kpi.id) ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
            `}>
              <CardContent className="p-4 flex items-start gap-3">
                <Checkbox 
                  id={`kpi-${kpi.id}`}
                  checked={data.kpis.includes(kpi.id)}
                  onCheckedChange={() => handleKpiChange(kpi.id)}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{kpi.icon}</span>
                    <label 
                      htmlFor={`kpi-${kpi.id}`}
                      className="font-medium text-base cursor-pointer"
                    >
                      {kpi.label}
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{kpi.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Minimum Requirements for Rewards</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Set minimum thresholds that participants need to reach to qualify for rewards.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="minViews"
            render={() => (
              <FormItem>
                <FormLabel>Minimum Views</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={0}
                    value={data.minViews}
                    onChange={(e) => onChange({ minViews: parseInt(e.target.value) || 0 })}
                  />
                </FormControl>
                <FormDescription>
                  Minimum number of views required
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            name="minLikes"
            render={() => (
              <FormItem>
                <FormLabel>Minimum Likes</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={0}
                    value={data.minLikes}
                    onChange={(e) => onChange({ minLikes: parseInt(e.target.value) || 0 })}
                  />
                </FormControl>
                <FormDescription>
                  Minimum number of likes required
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            name="minComments"
            render={() => (
              <FormItem>
                <FormLabel>Minimum Comments</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={0}
                    value={data.minComments}
                    onChange={(e) => onChange({ minComments: parseInt(e.target.value) || 0 })}
                  />
                </FormControl>
                <FormDescription>
                  Minimum number of comments required
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            name="minConversions"
            render={() => (
              <FormItem>
                <FormLabel>Minimum Conversions</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={0}
                    value={data.minConversions}
                    onChange={(e) => onChange({ minConversions: parseInt(e.target.value) || 0 })}
                  />
                </FormControl>
                <FormDescription>
                  Minimum number of purchases/conversions
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default KpiSettings;
