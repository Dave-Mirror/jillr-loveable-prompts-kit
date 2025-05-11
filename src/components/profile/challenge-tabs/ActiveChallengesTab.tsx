
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Zap, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';

interface ActiveChallengeProps {
  activeChallenges: any[];
}

const ActiveChallengesTab: React.FC<ActiveChallengeProps> = ({ activeChallenges }) => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  
  const handleUploadContent = () => {
    navigate('/content-editor');
  };

  const filterOptions: FilterOption[] = [
    { value: 'all', label: 'Alle Challenges' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'not_started', label: 'Nicht gestartet' }
  ];
  
  const filteredChallenges = statusFilter === 'all' 
    ? activeChallenges 
    : activeChallenges.filter(c => c.status === statusFilter);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <FilterDropdown 
          options={filterOptions}
          activeValue={statusFilter}
          onSelect={setStatusFilter}
          label="Status"
        />
      </div>
      
      {filteredChallenges.map(challenge => (
        <Card key={challenge.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{challenge.title}</CardTitle>
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
              
              <Button size="sm" className="flex gap-2 items-center" onClick={handleUploadContent}>
                <Upload size={14} />
                Upload Content
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
