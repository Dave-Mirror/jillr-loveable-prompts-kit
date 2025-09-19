import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, Target, Gift, Play } from 'lucide-react';
import { ChallengeTemplate } from '@/types/template';

interface TemplateCardProps {
  template: ChallengeTemplate;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const getKpiIcons = (kpis: string[]) => {
    const icons: { [key: string]: string } = {
      'engagement': '👍',
      'ugc_uploads': '📸',
      'community_votes': '🗳️',
      'conversions': '💰',
      'leaderboard_xp': '🏆'
    };
    return kpis.map(kpi => icons[kpi] || '📊').join(' ');
  };

  const getRewardIcons = (rewards: string[]) => {
    const icons: { [key: string]: string } = {
      'coins': '🪙',
      'badges': '🏅',
      'discounts': '🏷️',
      'vip_tickets': '🎫',
      'raffle_entries': '🎰',
      'coupons': '🎟️',
      'leaderboard_xp': '⭐'
    };
    return rewards.map(reward => icons[reward] || '🎁').join(' ');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="aspect-video rounded-lg mb-3 overflow-hidden">
          <img 
            src={template.image} 
            alt={template.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-lg">{template.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex gap-2 mb-3">
          <Badge variant="secondary">{template.industry}</Badge>
          <Badge variant="outline">{template.challengeType}</Badge>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{template.duration} days</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${template.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{getKpiIcons(template.data.kpis)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-muted-foreground" />
            <span>{getRewardIcons(template.data.rewardTypes)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            Hashtags: {template.data.hashtags.slice(0, 3).map(tag => `#${tag}`).join(' ')}
          </div>
          
          <Button 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            variant="outline"
            onClick={onSelect}
          >
            Use This Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;