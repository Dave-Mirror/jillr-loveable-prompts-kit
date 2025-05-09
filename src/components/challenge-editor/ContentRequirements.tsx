
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ContentFormatCard from './content-requirements/ContentFormatCard';
import PlatformCard from './content-requirements/PlatformCard';
import HashtagsMentionsInput from './content-requirements/HashtagsMentionsInput';
import BrandingIntegrationControl from './content-requirements/BrandingIntegrationControl';
import MusicSelectionSection from './content-requirements/MusicSelectionSection';
import { contentFormats, platforms, trendingSongs } from './content-requirements/constants';

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
            <ContentFormatCard
              key={format.id}
              format={format}
              selected={data.contentFormats.includes(format.id)}
              onToggle={handleFormatChange}
            />
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
            <PlatformCard
              key={platform.id}
              platform={platform}
              selected={data.platforms.includes(platform.id)}
              onToggle={handlePlatformChange}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        <HashtagsMentionsInput
          value={data.hashtags.join(' ')}
          onChange={handleHashtagsChange}
        />

        <BrandingIntegrationControl
          value={data.brandingIntegration}
          onChange={(value) => onChange({ brandingIntegration: value })}
        />

        <MusicSelectionSection
          value={data.musicSelection}
          onChange={(value) => onChange({ musicSelection: value })}
          trendingSongs={trendingSongs}
        />
      </div>
    </div>
  );
};

export default ContentRequirements;
