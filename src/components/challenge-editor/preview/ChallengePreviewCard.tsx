
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Flag, Globe, Hash, Medal, Music, Video, Award } from 'lucide-react';
import PreviewMedia from './PreviewMedia';

interface ChallengePreviewCardProps {
  data: any;
  previewMedia: {
    type: string;
    url: string;
  };
  setPreviewMedia: React.Dispatch<React.SetStateAction<{
    type: string;
    url: string;
  }>>;
  onChange: (data: any) => void;
}

const ChallengePreviewCard: React.FC<ChallengePreviewCardProps> = ({
  data,
  previewMedia,
  setPreviewMedia,
  onChange
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="text-xl font-bold">{data.title || "Challenge Title"}</h4>
        <p className="mt-2 text-muted-foreground">{data.description || "Challenge description will appear here."}</p>
        
        <PreviewMedia 
          previewMedia={previewMedia}
          setPreviewMedia={setPreviewMedia}
          onChange={onChange}
        />
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-jillr-neonPurple" />
            <span>
              {data.startDate ? data.startDate.toLocaleDateString() : "Start date"} - {data.endDate ? data.endDate.toLocaleDateString() : "End date"}
            </span>
          </div>
          
          {data.type.length > 0 && (
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-jillr-neonPurple" />
              <span>
                {data.type.map((t: string, i: number) => (
                  <span key={t}>
                    {i > 0 && ", "}
                    {t.charAt(0).toUpperCase() + t.slice(1)} Challenge
                  </span>
                ))}
              </span>
            </div>
          )}
          
          {data.contentFormats.length > 0 && (
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-jillr-neonPurple" />
              <span>
                Required: {data.contentFormats.join(', ')}
              </span>
            </div>
          )}
          
          {data.hashtags.length > 0 && (
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-jillr-neonPurple" />
              <span>
                Hashtags: {data.hashtags.join(' ')}
              </span>
            </div>
          )}
          
          {data.musicSelection && (
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-jillr-neonPurple" />
              <span>
                Music: {data.musicSelection === 'trending' ? 'Trending sounds' : 
                       data.musicSelection === 'brand' ? 'Brand sounds' :
                       data.musicSelection === 'library' ? 'Jillr library' : 'None'}
              </span>
            </div>
          )}
          
          {data.location && (
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-jillr-neonPurple" />
              <span>
                Location: {data.location}
              </span>
            </div>
          )}
          
          {data.levelRestriction !== 'open' && (
            <div className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-jillr-neonPurple" />
              <span>
                Level: {data.levelRestriction === 'level2' ? 'Level 2+' : 
                       data.levelRestriction === 'level3' ? 'Level 3+' : 'Level 4/5 only'}
              </span>
            </div>
          )}
          
          {data.rewardTypes.length > 0 && (
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-jillr-neonPurple" />
              <span>
                Rewards: {data.rewardTypes.map((r: string) => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengePreviewCard;
