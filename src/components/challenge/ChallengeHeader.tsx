
import React from 'react';
import { Users } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import { Challenge, Submission } from './types';

export interface ChallengeHeaderProps {
  challenge: Challenge;
  submissions: Submission[];
  getChallengeTypeIcon: (type: string | null | undefined) => JSX.Element;
}

export const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({ 
  challenge, 
  submissions, 
  getChallengeTypeIcon 
}) => {
  return (
    <div className="neon-card mb-8" style={{borderColor: challenge.brand_color || '#9b87f5'}}>
      <div className="neon-card-content p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-jillr-neonPurple/20 text-jillr-neonPurple">
                {getChallengeTypeIcon(challenge.type)}
                <span className="ml-1">{challenge.type || 'Challenge'}</span>
              </span>
              {challenge.brand_logo && (
                <img 
                  src={challenge.brand_logo} 
                  alt="Brand logo" 
                  className="h-6 w-auto object-contain" 
                />
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{challenge.title}</h1>
          </div>
          
          <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
            <div className="flex items-center">
              <div className="flex items-center p-2 rounded-lg bg-jillr-darkBlue/50">
                <Users size={18} className="text-jillr-neonGreen" />
                <span className="ml-2 text-sm font-medium">
                  {submissions.length || 0} Teilnehmer
                </span>
              </div>
            </div>
            
            <div>
              <span className="text-sm">Endet in:</span>
              <CountdownTimer endDate={challenge.end_date} />
            </div>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground mb-6">{challenge.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {challenge.hashtags && challenge.hashtags.map((tag: string, index: number) => (
            <span key={index} className="px-2 py-1 rounded-full bg-jillr-darkBlue text-jillr-neonBlue text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
