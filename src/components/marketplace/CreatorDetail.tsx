
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Globe, TrendingUp, BarChart2, MessageCircle, CheckCircle } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  niche: string;
  reach: number;
  successRate: number;
  badges: string[];
  engagementRate: number;
  region: string;
  matchScore: number;
  bio?: string;
  previousBrands?: string[];
  socialLinks?: { platform: string; url: string; followers: number }[];
  contentSamples?: { type: string; thumbnail: string; engagement: number }[];
}

interface CreatorDetailProps {
  creator: Creator;
}

const CreatorDetail: React.FC<CreatorDetailProps> = ({ creator }) => {
  const isPriorityMatch = creator.matchScore >= 80;

  return (
    <Card className="h-full border-jillr-neonPurple/30 bg-jillr-darkBlue/30">
      <CardHeader className={`pb-4 ${isPriorityMatch ? 'bg-gradient-to-r from-jillr-neonPurple/20 to-transparent' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={creator.avatar} 
              alt={creator.name}
              className={`h-16 w-16 rounded-full object-cover border-2 ${isPriorityMatch ? 'border-jillr-neonPurple' : 'border-jillr-neonPurple/50'}`}
            />
            <div 
              className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center 
                ${isPriorityMatch ? 'bg-jillr-neonPurple text-white' : 'bg-jillr-darkBlue border border-jillr-neonPurple text-white'} 
                text-xs font-bold`}
              title="KI-Match Score"
            >
              {creator.matchScore}%
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{creator.name}</CardTitle>
              {isPriorityMatch && <Sparkles size={16} className="text-jillr-neonPurple" />}
            </div>
            <CardDescription className="flex items-center gap-1">
              <Globe className="h-3 w-3" /> {creator.region}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 space-y-4">
        {/* Bio */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-1">Über den Creator</h4>
          <p className="text-sm">
            {creator.bio || `${creator.name} ist ein ${creator.niche}-Creator aus ${creator.region} mit einer Reichweite von ${formatNumber(creator.reach)} Followern.`}
          </p>
        </div>
        
        {/* Performance Metrics */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Performance</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-jillr-darkBlue p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Reichweite</div>
              <div className="flex items-center justify-center gap-1 font-semibold">
                <Globe className="h-3 w-3 text-jillr-neonPurple" />
                {formatNumber(creator.reach)}
              </div>
            </div>
            <div className="bg-jillr-darkBlue p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Engagement</div>
              <div className="flex items-center justify-center gap-1 font-semibold">
                <TrendingUp className="h-3 w-3 text-jillr-neonPurple" />
                {creator.engagementRate}%
              </div>
            </div>
            <div className="bg-jillr-darkBlue p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Erfolgsrate</div>
              <div className="flex items-center justify-center gap-1 font-semibold">
                <BarChart2 className="h-3 w-3 text-jillr-neonPurple" />
                {creator.successRate}%
              </div>
            </div>
          </div>
        </div>
        
        {/* Badges */}
        {creator.badges && creator.badges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-1">
              {creator.badges.map((badge, idx) => (
                <Badge key={idx} variant="outline" className="bg-jillr-darkBlue text-xs">
                  {badge.includes('Challenge Match') ? (
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-jillr-neonPurple" />
                      {badge}
                    </span>
                  ) : badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Previous Brand Collaborations */}
        {creator.previousBrands && creator.previousBrands.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Frühere Kollaborationen</h4>
            <div className="flex flex-wrap gap-1">
              {creator.previousBrands.map((brand, idx) => (
                <Badge key={idx} className="bg-jillr-darkBlue/50 text-xs">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  {brand}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Social Links */}
        {creator.socialLinks && creator.socialLinks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Social Media</h4>
            <div className="flex flex-wrap gap-3">
              {creator.socialLinks.map((link, idx) => (
                <div key={idx} className="flex items-center gap-1 text-sm">
                  <span className="font-semibold">{link.platform}</span>
                  <span className="text-gray-400">{formatNumber(link.followers)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Content Samples */}
        {creator.contentSamples && creator.contentSamples.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Content Beispiele</h4>
            <div className="grid grid-cols-3 gap-2">
              {creator.contentSamples.map((sample, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-md">
                  <img 
                    src={sample.thumbnail} 
                    alt={`Content Sample ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1">
                    <span className="text-xs text-white">{sample.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full space-y-2">
          <Button className="w-full bg-jillr-neonPurple hover:bg-jillr-neonPurple/90">
            <MessageCircle className="mr-2 h-4 w-4" />
            Kooperationsanfrage senden
          </Button>
          <Button variant="outline" className="w-full border-jillr-neonPurple/50 hover:bg-jillr-neonPurple/10">
            Volles Profil ansehen
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreatorDetail;
