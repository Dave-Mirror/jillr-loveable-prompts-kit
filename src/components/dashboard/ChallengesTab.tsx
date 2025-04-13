
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Eye, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Challenge } from '@/types/dashboard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChallengesTabProps {
  challenges: Challenge[];
}

const challengeTypeIcons: Record<string, string> = {
  'photo': '📸',
  'video': '🎥',
  'ar': '🥽',
  'geofencing': '📍',
  'fitness': '💪',
  'sustainability': '♻️',
  'gamification': '🎮',
  'community': '👥',
  'battle': '⚔️',
  'review': '⭐',
  'travel': '✈️',
  'food': '🍔',
  'fashion': '👕',
  'beauty': '💄',
  'dance': '💃',
  'lifestyle': '🏡',
  'comedy': '😂',
  'transformation': '✨',
  'tutorial': '📚',
  'product': '🛍️',
  'default': '🎯'
};

const getTypeIcon = (type: string | undefined): string => {
  if (!type) return challengeTypeIcons['default'];
  
  const lowerType = type.toLowerCase();
  for (const [key, value] of Object.entries(challengeTypeIcons)) {
    if (lowerType.includes(key)) return value;
  }
  
  return challengeTypeIcons['default'];
};

const ChallengesTab: React.FC<ChallengesTabProps> = ({ challenges }) => {
  const [filterType, setFilterType] = useState<string>('all');
  
  const filteredChallenges = filterType === 'all' 
    ? challenges 
    : challenges.filter(challenge => 
        challenge.type?.toLowerCase().includes(filterType.toLowerCase())
      );
  
  // Extract unique challenge types
  const uniqueTypes = ['all', ...new Set(challenges
    .map(challenge => challenge.type || '')
    .filter(type => type !== '')
  )];
  
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-semibold">Meine Challenges</h2>
        
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Filter size={16} />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {uniqueTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === 'all' ? 'All Types' : `${getTypeIcon(type)} ${type}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredChallenges.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Teilnehmer</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChallenges.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell className="font-medium">{challenge.title}</TableCell>
                  <TableCell>
                    {challenge.type && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getTypeIcon(challenge.type)} {challenge.type}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={challenge.status === 'active' ? 'default' : 'outline'}>
                      {challenge.status === 'active' ? 'Aktiv' : 'Beendet'}
                    </Badge>
                  </TableCell>
                  <TableCell>{challenge.views || 0}</TableCell>
                  <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
                  <TableCell>
                    <Link to={`/challenge/${challenge.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye size={14} className="mr-1" /> Anzeigen
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center p-8 bg-muted/20 rounded-lg">
          <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Keine Challenges gefunden</h3>
          <p className="text-muted-foreground mb-4">Du hast noch keine eigenen Challenges erstellt.</p>
          <Link to="/challenge-builder">
            <Button>Erste Challenge erstellen</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ChallengesTab;
