
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface AudienceKpiCardProps {
  data: any;
}

const AudienceKpiCard: React.FC<AudienceKpiCardProps> = ({ data }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="font-medium flex items-center gap-2">
          <Target className="h-5 w-5 text-jillr-neonPurple" />
          Audience & KPIs
        </h4>
        
        <div className="mt-4 space-y-2 text-sm">
          {data.gender.length > 0 && (
            <p>Gender: {data.gender.join(', ')}</p>
          )}
          
          {data.ageRange && (
            <p>Age range: {data.ageRange[0]} - {data.ageRange[1]}</p>
          )}
          
          {data.kpis.length > 0 && (
            <p>KPIs: {data.kpis.join(', ')}</p>
          )}
          
          {(data.minViews > 0 || data.minLikes > 0 || data.minComments > 0) && (
            <p>
              Minimums: 
              {data.minViews > 0 ? ` ${data.minViews} views` : ''}
              {data.minLikes > 0 ? ` ${data.minLikes} likes` : ''}
              {data.minComments > 0 ? ` ${data.minComments} comments` : ''}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienceKpiCard;
