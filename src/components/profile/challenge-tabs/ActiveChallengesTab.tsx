
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Zap, Award, Clock, Map, Flag, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';

interface ActiveChallengeProps {
  activeChallenges: any[];
}

const ActiveChallengesTab: React.FC<ActiveChallengeProps> = ({ activeChallenges }) => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const handleUploadContent = (challengeId?: string) => {
    if (challengeId) {
      navigate(`/upload/${challengeId}`);
    } else {
      navigate('/content-editor');
    }
  };

  const handleViewCityClash = () => {
    navigate('/city-clash');
  };

  const statusFilterOptions: FilterOption[] = [
    { value: 'all', label: 'Alle Status', icon: <Zap className="h-4 w-4" /> },
    { value: 'in_progress', label: 'In Progress', icon: <Clock className="h-4 w-4" /> },
    { value: 'not_started', label: 'Nicht gestartet', icon: <Flag className="h-4 w-4" /> }
  ];
  
  const typeFilterOptions: FilterOption[] = [
    { value: 'all', label: 'Alle Typen', icon: <Zap className="h-4 w-4" /> },
    { value: 'video', label: 'Video Challenges', icon: <Upload className="h-4 w-4" /> },
    { value: 'city_clash', label: 'City Clash', icon: <Map className="h-4 w-4" /> },
    { value: 'team_battle', label: 'Team Battles', icon: <Shield className="h-4 w-4" /> },
    { value: 'community', label: 'Community', icon: <Users className="h-4 w-4" /> }
  ];
  
  const filteredChallenges = activeChallenges.filter(challenge => {
    // Filter by status
    if (statusFilter !== 'all' && challenge.status !== statusFilter) {
      return false;
    }
    
    // Filter by type
    if (typeFilter !== 'all') {
      // Handle special case for city_clash
      if (typeFilter === 'city_clash' && 
          (challenge.type?.includes('city') || challenge.tags?.includes('city_clash'))) {
        return true;
      }
      
      // Handle special case for team_battle
      if (typeFilter === 'team_battle' && 
          (challenge.type?.includes('team') || challenge.tags?.includes('team_battle'))) {
        return true;
      }
      
      if (challenge.type !== typeFilter && 
          !challenge.tags?.includes(typeFilter)) {
        return false;
      }
    }
    
    return true;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 mb-4">
        <FilterDropdown 
          options={statusFilterOptions}
          activeValue={statusFilter}
          onSelect={setStatusFilter}
          label="Status"
        />
        
        <FilterDropdown 
          options={typeFilterOptions}
          activeValue={typeFilter}
          onSelect={setTypeFilter}
          label="Typ"
        />
      </div>
      
      {typeFilter === 'city_clash' && (
        <Card className="border-jillr-neonPurple/30 bg-gradient-to-br from-jillr-dark to-jillr-neonPurple/10 mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-jillr-neonPurple/20 p-3 rounded-full">
                  <Map className="h-6 w-6 text-jillr-neonPurple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">City Clash Challenges</h3>
                  <p className="text-sm text-gray-400">Erobere Stadtgebiete, gewinne Belohnungen und battle mit anderen Teams!</p>
                </div>
              </div>
              <Button onClick={handleViewCityClash} className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/90 whitespace-nowrap">
                City Clash entdecken
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {filteredChallenges.map(challenge => (
        <Card key={challenge.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{challenge.title}</CardTitle>
                  {challenge.tags?.includes('city_clash') && (
                    <Badge variant="outline" className="bg-jillr-neonPurple/20 text-jillr-neonPurple">
                      City Clash
                    </Badge>
                  )}
                  {challenge.tags?.includes('team_battle') && (
                    <Badge variant="outline" className="bg-jillr-neonPink/20 text-jillr-neonPink">
                      Team Battle
                    </Badge>
                  )}
                </div>
                <CardDescription>By {challenge.brand}</CardDescription>
              </div>
              <Badge variant={challenge.status === 'in_progress' ? 'default' : 'outline'}>
                {challenge.status === 'in_progress' ? 'In Progress' : 'Not Started'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <Zap size={16} className="text-jillr-neonPurple" />
                  <span>{challenge.xpReward} XP</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Award size={16} className="text-yellow-500" />
                  <span>{challenge.coinReward} Coins</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock size={16} className="text-red-400" />
                  <span>{challenge.deadline}</span>
                </div>
              </div>
              
              <Button 
                size="sm" 
                className="flex gap-2 items-center" 
                onClick={() => handleUploadContent(challenge.id)}
              >
                {challenge.tags?.includes('city_clash') ? (
                  <>
                    <Map size={14} />
                    Teilnehmen
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    Upload Content
                  </>
                )}
              </Button>
            </div>
            
            {challenge.status === 'in_progress' && (
              <div className="w-full bg-jillr-darkBlue/50 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-jillr-neonPurple h-full rounded-full" 
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      {filteredChallenges.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Keine Challenges in dieser Kategorie gefunden.</p>
        </div>
      )}
    </div>
  );
};

export default ActiveChallengesTab;
