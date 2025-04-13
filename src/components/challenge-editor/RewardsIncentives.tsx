
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const rewardTypes = [
  { id: 'instant', label: 'Instant Reward', description: 'Discount code, coupon, product code, NFT', icon: '🎁' },
  { id: 'coins', label: 'Coins & XP', description: 'In-game currency convertible to money/products', icon: '🪙' },
  { id: 'exclusive', label: 'Exclusive Products/Experiences', description: 'VIP tickets, events, trips', icon: '🎭' },
  { id: 'longterm', label: 'Long-term Cooperation', description: 'Brand partnerships, sponsorship deals', icon: '🤝' },
  { id: 'cashout', label: 'Cashout for Top Creators', description: 'Direct payout via PayPal/Stripe', icon: '💸' },
];

const RewardsIncentives = ({ data, onChange }) => {
  const handleRewardTypeChange = (typeId) => {
    const newTypes = data.rewardTypes.includes(typeId)
      ? data.rewardTypes.filter(id => id !== typeId)
      : [...data.rewardTypes, typeId];
    
    onChange({ rewardTypes: newTypes });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Reward Types</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select what types of rewards you want to offer (multiple selection possible).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewardTypes.map((reward) => (
            <Card key={reward.id} className={`
              cursor-pointer transition-all
              ${data.rewardTypes.includes(reward.id) ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
            `}>
              <CardContent className="p-4 flex items-start gap-3">
                <Checkbox 
                  id={`reward-${reward.id}`}
                  checked={data.rewardTypes.includes(reward.id)}
                  onCheckedChange={() => handleRewardTypeChange(reward.id)}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{reward.icon}</span>
                    <label 
                      htmlFor={`reward-${reward.id}`}
                      className="font-medium text-base cursor-pointer"
                    >
                      {reward.label}
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Reward Distribution & Limitations</h3>
        
        <FormItem className="space-y-3">
          <FormLabel>Reward immediately after upload?</FormLabel>
          <RadioGroup 
            defaultValue={data.instantReward ? "yes" : "no"}
            onValueChange={(value) => onChange({ instantReward: value === "yes" })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="instant-yes" />
              <label htmlFor="instant-yes" className="cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="instant-no" />
              <label htmlFor="instant-no" className="cursor-pointer">No</label>
            </div>
          </RadioGroup>
        </FormItem>
        
        <FormItem className="space-y-3">
          <FormLabel>Reward after reaching KPIs?</FormLabel>
          <RadioGroup 
            defaultValue={data.kpiBasedReward ? "yes" : "no"}
            onValueChange={(value) => onChange({ kpiBasedReward: value === "yes" })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="kpi-yes" />
              <label htmlFor="kpi-yes" className="cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="kpi-no" />
              <label htmlFor="kpi-no" className="cursor-pointer">No</label>
            </div>
          </RadioGroup>
        </FormItem>
        
        <FormItem className="space-y-3">
          <FormLabel>Limited number of rewards?</FormLabel>
          <RadioGroup 
            defaultValue={data.limitedRewards ? "yes" : "no"}
            onValueChange={(value) => onChange({ limitedRewards: value === "yes" })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="limited-yes" />
              <label htmlFor="limited-yes" className="cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="limited-no" />
              <label htmlFor="limited-no" className="cursor-pointer">No</label>
            </div>
          </RadioGroup>
          
          {data.limitedRewards && (
            <div className="mt-2">
              <FormField
                name="rewardLimit"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Maximum number of rewards"
                        min={1}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </FormItem>
        
        <FormItem className="space-y-3">
          <FormLabel>Do rewards expire?</FormLabel>
          <RadioGroup 
            defaultValue={data.rewardExpiration ? "yes" : "no"}
            onValueChange={(value) => onChange({ rewardExpiration: value === "yes" })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="expire-yes" />
              <label htmlFor="expire-yes" className="cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="expire-no" />
              <label htmlFor="expire-no" className="cursor-pointer">No</label>
            </div>
          </RadioGroup>
          
          {data.rewardExpiration && (
            <div className="mt-2">
              <FormField
                name="expirationDays"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Days until expiration"
                        min={1}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </FormItem>
      </div>
    </div>
  );
};

export default RewardsIncentives;
