
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const contentFormats = [
  { id: 'photo', label: 'Photo' },
  { id: 'video', label: 'Video', config: 'duration' },
  { id: 'story', label: 'Story Format (Instagram, Snapchat)' },
  { id: 'reels', label: 'Reels/TikTok Videos', config: 'duration' },
  { id: 'livestream', label: 'Livestream Interaction' },
];

const platforms = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'youtube', label: 'YouTube Shorts' },
  { id: 'snapchat', label: 'Snapchat' },
  { id: 'jillr', label: 'Jillr App (Exclusive)' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'twitter', label: 'Twitter/X' },
  { id: 'linkedin', label: 'LinkedIn' },
];

const trendingSongs = [
  { id: 'song1', title: 'Trending Song 1', artist: 'Artist 1' },
  { id: 'song2', title: 'Trending Song 2', artist: 'Artist 2' },
  { id: 'song3', title: 'Trending Song 3', artist: 'Artist 3' },
];

const ContentRequirements = ({ data, onChange }) => {
  // Access the form context
  const formMethods = useFormContext();

  const handleFormatChange = (formatId) => {
    const newFormats = data.contentFormats.includes(formatId)
      ? data.contentFormats.filter(id => id !== formatId)
      : [...data.contentFormats, formatId];
    
    onChange({ contentFormats: newFormats });
  };

  const handlePlatformChange = (platformId) => {
    const newPlatforms = data.platforms.includes(platformId)
      ? data.platforms.filter(id => id !== platformId)
      : [...data.platforms, platformId];
    
    onChange({ platforms: newPlatforms });
  };

  const handleHashtagsChange = (value) => {
    const hashtags = value.split(/[,\s]+/).filter(tag => tag.trim() !== '');
    onChange({ hashtags });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Required Content Formats</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select the content formats participants should submit (multiple selection possible).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contentFormats.map((format) => (
            <Card key={format.id} className={`
              cursor-pointer transition-all
              ${data.contentFormats.includes(format.id) ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
            `}>
              <CardContent className="p-4 flex items-start gap-3">
                <Checkbox 
                  id={`format-${format.id}`}
                  checked={data.contentFormats.includes(format.id)}
                  onCheckedChange={() => handleFormatChange(format.id)}
                />
                <div className="w-full">
                  <label 
                    htmlFor={`format-${format.id}`}
                    className="font-medium text-base cursor-pointer"
                  >
                    {format.label}
                  </label>
                  
                  {format.config === 'duration' && data.contentFormats.includes(format.id) && (
                    <div className="mt-2">
                      <label className="text-sm text-muted-foreground">Duration (seconds)</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          placeholder="Min"
                          className="w-20"
                          min={1}
                        />
                        <span>to</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          className="w-20"
                          min={1}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Platforms for Posting</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select the platforms where participants should post their content.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map((platform) => (
            <Card key={platform.id} className={`
              cursor-pointer transition-all
              ${data.platforms.includes(platform.id) ? 'border-jillr-neonPurple bg-jillr-neonPurple/5' : ''}
            `}>
              <CardContent className="p-4 flex items-start gap-3">
                <Checkbox 
                  id={`platform-${platform.id}`}
                  checked={data.platforms.includes(platform.id)}
                  onCheckedChange={() => handlePlatformChange(platform.id)}
                />
                <label 
                  htmlFor={`platform-${platform.id}`}
                  className="font-medium cursor-pointer"
                >
                  {platform.label}
                </label>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        <FormItem>
          <FormLabel>Required Hashtags & Mentions</FormLabel>
          <FormControl>
            <Input 
              placeholder="#SpringStyleRefresh #MySalonMunich @mysalonmunich" 
              value={data.hashtags.join(' ')}
              onChange={(e) => handleHashtagsChange(e.target.value)}
              name="hashtags"
            />
          </FormControl>
          <FormDescription>
            Separate hashtags and mentions with spaces
          </FormDescription>
        </FormItem>

        <div className="space-y-3">
          <FormLabel>Automatic Branding Integration</FormLabel>
          <FormDescription>
            Automatically add your brand logos to uploaded content
          </FormDescription>
          <RadioGroup 
            defaultValue={data.brandingIntegration ? "yes" : "no"}
            onValueChange={(value) => onChange({ brandingIntegration: value === "yes" })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="branding-yes" />
              <label htmlFor="branding-yes" className="cursor-pointer">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="branding-no" />
              <label htmlFor="branding-no" className="cursor-pointer">No</label>
            </div>
          </RadioGroup>
        </div>

        <FormItem>
          <FormLabel>Music Selection & Sound Recommendations</FormLabel>
          <FormDescription>
            Choose recommended music for participants to use
          </FormDescription>
          <Select 
            value={data.musicSelection} 
            onValueChange={(value) => onChange({ musicSelection: value })}
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
          
          {data.musicSelection === 'trending' && (
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
      </div>
    </div>
  );
};

export default ContentRequirements;
