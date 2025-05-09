
import React from 'react';
import { FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface MusicSelectionProps {
  value: string;
  onChange: (value: string) => void;
  trendingSongs: Array<{ id: string; title: string; artist: string }>;
}

const MusicSelectionSection: React.FC<MusicSelectionProps> = ({ 
  value, 
  onChange,
  trendingSongs 
}) => {
  return (
    <FormItem>
      <FormLabel>Music Selection & Sound Recommendations</FormLabel>
      <FormDescription>
        Choose recommended music for participants to use
      </FormDescription>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a music option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No music recommendation</SelectItem>
          <SelectItem value="trending">Trending TikTok Sounds</SelectItem>
          <SelectItem value="brand">Use brand sounds</SelectItem>
          <SelectItem value="library">Jillr Sound Library</SelectItem>
        </SelectContent>
      </Select>
      
      {value === 'trending' && (
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-medium">Trending Songs</h4>
          {trendingSongs.map(song => (
            <Card key={song.id} className="cursor-pointer hover:bg-accent">
              <CardContent className="p-3 flex justify-between">
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
                <Checkbox />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </FormItem>
  );
};

export default MusicSelectionSection;
