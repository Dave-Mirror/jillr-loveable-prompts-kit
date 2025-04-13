
import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Challenge } from '@/types/dashboard';

interface ChallengesTabProps {
  challenges: Challenge[];
}

const ChallengesTab: React.FC<ChallengesTabProps> = ({ challenges }) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">Meine Challenges</h2>
      
      {challenges.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Teilnehmer</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell className="font-medium">{challenge.title}</TableCell>
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
