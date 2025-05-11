
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
    <Card className="overflow-hidden border border-jillr-border bg-jillr-dark hover:border-jillr-neonPurple/50 transition-all">
      <div className="relative">
        <img 
          src={challenge.imageUrl} 
          alt={challenge.title}
          className="w-full h-48 object-cover"
        />
        
        <div className="absolute top-0 left-0 w-full p-3 flex justify-between">
          <Badge variant="outline" className="bg-black/60 backdrop-blur-sm border-none text-white">
            {challenge.districtName}
          </Badge>
          
          <div className="flex gap-1">
            <Badge variant="outline" className={`backdrop-blur-sm border-none ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
            </Badge>
            
            {challenge.category && (
              <Badge variant="outline" className={`backdrop-blur-sm border-none ${getCategoryColor(challenge.category)}`}>
                <div className="flex items-center gap-1">
                  {getCategoryIcon(challenge.category)}
                  {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
                </div>
              </Badge>
            )}

            <Badge variant="outline" className="bg-jillr-neonPurple/80 backdrop-blur-sm border-none text-white">
              <div className="flex items-center gap-1">
                {getChallengeIcon(challenge.type)}
                {getChallengeTypeLabel(challenge.type)}
              </div>
            </Badge>
          </div>
        </div>
        
        {challenge.teamName && (
          <div className="absolute bottom-0 left-0 w-full p-3">
            <Badge variant="outline" className="bg-black/60 backdrop-blur-sm border-none text-white">
              Team: {challenge.teamName}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{challenge.description}</p>
        
        <div className="flex flex-wrap gap-y-2 gap-x-3 text-xs text-gray-300 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            {challenge.duration}
          </div>
          
          <div className="flex items-center gap-1">
            <Trophy className="h-3.5 w-3.5 text-yellow-400" />
            {challenge.reward.xp} XP
          </div>
          
          {challenge.reward.coins && (
            <div className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-blue-400" />
              {challenge.reward.coins} Coins
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            {challenge.participants} Teilnehmer
          </div>
          
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-red-400" />
            {challenge.districtName}
          </div>
        </div>
        
        {challenge.brandName && (
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
              {challenge.brandLogo ? (
                <img src={challenge.brandLogo} alt={challenge.brandName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs">{challenge.brandName.charAt(0)}</span>
              )}
            </div>
            <span className="text-xs text-gray-400">Gesponsort von {challenge.brandName}</span>
          </div>
        )}
        
        <Button 
          onClick={handleJoinChallenge}
          className="w-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink hover:opacity-90"
        >
          Challenge teilnehmen
        </Button>
      </div>
    </Card>
  );
};

export default CityClashCard;
