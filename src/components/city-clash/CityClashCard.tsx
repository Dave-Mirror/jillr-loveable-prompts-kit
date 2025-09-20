
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, Trophy, Users, MapPin, 
  Zap, Timer, Shield, Flag,
  Puzzle, Leaf, Video, Camera,
  Sparkles, Key, Moon, Brain
} from 'lucide-react';
import { CityChallenge } from '@/hooks/useCityClashData';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CityClashCardProps {
  challenge: CityChallenge;
}

const getChallengeIcon = (type: CityChallenge['type']) => {
  switch (type) {
    case 'time_rush': return <Timer className="h-4 w-4" />;
    case 'team_battle': return <Shield className="h-4 w-4" />;
    case 'digital_heist': return <Key className="h-4 w-4" />;
    case 'mystery_card': return <Sparkles className="h-4 w-4" />;
    case 'shadow_quest': return <Moon className="h-4 w-4" />;
    case 'secret_society': return <Brain className="h-4 w-4" />;
    case 'urban_legend': return <Flag className="h-4 w-4" />;
    default: return <Zap className="h-4 w-4" />;
  }
};

const getChallengeTypeLabel = (type: CityChallenge['type']) => {
  switch (type) {
    case 'time_rush': return 'Time Rush';
    case 'team_battle': return 'Team Battle';
    case 'digital_heist': return 'Digital Heist';
    case 'mystery_card': return 'Mystery Card';
    case 'shadow_quest': return 'Shadow Quest';
    case 'secret_society': return 'Secret Society';
    case 'urban_legend': return 'Urban Legend';
    default: return type;
  }
};

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'location': return <MapPin className="h-4 w-4" />;
    case 'social': return <Video className="h-4 w-4" />;
    case 'team': return <Users className="h-4 w-4" />;
    case 'eco': return <Leaf className="h-4 w-4" />;
    case 'mystery': return <Puzzle className="h-4 w-4" />;
    default: return null;
  }
};

const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'location': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
    case 'social': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
    case 'team': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
    case 'eco': return 'text-green-400 border-green-400/30 bg-green-400/10';
    case 'mystery': return 'text-red-400 border-red-400/30 bg-red-400/10';
    default: return '';
  }
};

const getDifficultyColor = (difficulty: CityChallenge['difficulty']) => {
  switch (difficulty) {
    case 'easy': return 'text-green-400 border-green-400/30 bg-green-400/10';
    case 'medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    case 'hard': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
    case 'expert': return 'text-red-400 border-red-400/30 bg-red-400/10';
    default: return '';
  }
};

const CityClashCard: React.FC<CityClashCardProps> = ({ challenge }) => {
  const navigate = useNavigate();
  
  const handleJoinChallenge = () => {
    toast({
      title: "Challenge beigetreten!",
      description: `Du nimmst jetzt an "${challenge.title}" teil.`,
    });
    
    // In a real app, this would navigate to the challenge details or start the challenge
    // For now, we'll just simulate this with a timeout and navigate to the challenge detail
    setTimeout(() => {
      navigate(`/challenge/${challenge.id}`);
    }, 1000);
  };
  
  return (
    <Card className="glass-card border border-white/20 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.01] hover:shadow-neon-intense hover:border-jillr-neonCyan/60 max-w-sm">
      {/* Thumbnail Image */}
      <div className="relative">
        {challenge.thumbnailUrl ? (
          <img 
            src={challenge.thumbnailUrl} 
            alt={challenge.thumbnailAlt || challenge.title}
            loading="lazy"
            className="w-full aspect-video object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-video rounded-t-xl bg-gradient-to-br from-jillr-neonCyan/20 via-jillr-neonPurple/20 to-jillr-neonPink/20 flex items-center justify-center">
            {getChallengeIcon(challenge.type)}
          </div>
        )}
        
        {/* Category Chips - Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {challenge.category && (
            <Badge variant="hologram" className="bg-gradient-to-r from-jillr-neonCyan to-jillr-neonPurple text-white font-medium border-0 shadow-glow-cyan text-xs">
              {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
            </Badge>
          )}
          <Badge variant="hologram" className="bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink text-white font-medium border-0 shadow-glow-purple text-xs">
            {getChallengeTypeLabel(challenge.type)}
          </Badge>
        </div>
        
        {/* XP Reward - Top Right */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink text-white text-xs font-bold shadow-glow-purple border border-white/30">
            <Zap className="h-3 w-3" />
            <span>+{challenge.reward.xp} XP</span>
          </div>
        </div>
        
        {/* Subtle hologram gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-jillr-neonCyan/5 via-transparent to-jillr-neonPurple/5 opacity-60 group-hover:opacity-80 transition-opacity duration-300 rounded-t-xl" />
      </div>
      
      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-[var(--txt)] text-lg leading-tight group-hover:text-jillr-neonCyan transition-colors duration-300">
          {challenge.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-[var(--txt-dim)] line-clamp-2 leading-relaxed">
          {challenge.description}
        </p>
        
        {/* Challenge Stats */}
        <div className="flex flex-wrap gap-2 text-xs text-[var(--txt-dim)]">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-jillr-neonCyan" />
            <span>{challenge.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-jillr-neonPurple" />
            <span>{challenge.districtName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-jillr-neonPink" />
            <span>{challenge.participants}</span>
          </div>
        </div>
        
        {/* Footer with CTA and Stats */}
        <div className="flex items-center justify-between gap-4 pt-2">
          {/* CTA Button */}
          <Button 
            variant="hologram" 
            size="sm" 
            className="flex-1"
            onClick={handleJoinChallenge}
          >
            Challenge teilnehmen
          </Button>
          
          {/* Compact Stats */}
          <div className="flex items-center gap-3 text-xs text-[var(--txt-dim)]">
            <div className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-jillr-neonPink" />
              <span>{challenge.reward.xp}</span>
            </div>
            {challenge.reward.coins && (
              <div className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-jillr-neonCyan" />
                <span>{challenge.reward.coins}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CityClashCard;
