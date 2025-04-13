
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles, Stars, Zap, Flame } from 'lucide-react';

const EffectsTool: React.FC = () => {
  // Predefined effects
  const effectCategories = [
    {
      id: 'transition',
      name: 'Übergänge',
      effects: [
        { id: 'fade', name: 'Fade', icon: '🌫️' },
        { id: 'slide', name: 'Slide', icon: '↔️' },
        { id: 'zoom', name: 'Zoom', icon: '🔍' },
        { id: 'spin', name: 'Spin', icon: '🔄' },
      ]
    },
    {
      id: 'viral',
      name: 'Viral Effects',
      effects: [
        { id: 'glitch', name: 'Glitch', icon: '⚡' },
        { id: 'duet', name: 'Duet', icon: '👯' },
        { id: 'slowmo', name: 'Slow-Mo', icon: '🐢' },
        { id: 'timelapse', name: 'Timelapse', icon: '⏱️' },
      ]
    },
    {
      id: 'filters',
      name: 'Filter',
      effects: [
        { id: 'retro', name: 'Retro', icon: '📺' },
        { id: 'cinematic', name: 'Cinematic', icon: '🎬' },
        { id: 'summer', name: 'Summer', icon: '☀️' },
        { id: 'winter', name: 'Winter', icon: '❄️' },
      ]
    }
  ];

  return (
    <div>
      <Tabs defaultValue="transition">
        <TabsList className="mb-4">
          {effectCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {effectCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {category.effects.map(effect => (
                <Button 
                  key={effect.id}
                  variant="outline"
                  className="flex flex-col items-center justify-center py-3 h-auto"
                >
                  <div className="text-2xl mb-1">{effect.icon}</div>
                  <span>{effect.name}</span>
                </Button>
              ))}
            </div>
            
            {category.id === 'filters' && (
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Helligkeit</Label>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Slider defaultValue={[75]} max={100} step={1} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Kontrast</Label>
                    <span className="text-sm text-muted-foreground">50%</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Sättigung</Label>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </div>
                  <Slider defaultValue={[65]} max={100} step={1} />
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-4 border-t border-gray-700 pt-4">
        <h3 className="font-medium mb-2">KI-Effekte</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button className="justify-start gap-2 bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 text-jillr-neonPurple">
            <Sparkles className="h-4 w-4" />
            <span>Auto-Enhance</span>
          </Button>
          <Button className="justify-start gap-2 bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 text-jillr-neonPurple">
            <Stars className="h-4 w-4" />
            <span>Beauty Filter</span>
          </Button>
          <Button className="justify-start gap-2 bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 text-jillr-neonPurple">
            <Zap className="h-4 w-4" />
            <span>Trend Boost</span>
          </Button>
          <Button className="justify-start gap-2 bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 text-jillr-neonPurple">
            <Flame className="h-4 w-4" />
            <span>Viral Remix</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EffectsTool;
