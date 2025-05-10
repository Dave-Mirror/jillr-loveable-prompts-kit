
import React from 'react';

interface ChallengePreviewUrlProps {
  title: string;
}

const ChallengePreviewUrl: React.FC<ChallengePreviewUrlProps> = ({ title }) => {
  const formattedUrl = title 
    ? `jillr.app/challenge/${title.toLowerCase().replace(/\s+/g, '-')}`
    : 'jillr.app/challenge/your-challenge-name';
    
  return (
    <div className="mt-2">
      <p className="text-sm font-medium mb-1">Challenge Preview URL</p>
      <div className="p-3 bg-muted rounded-md text-sm">
        {formattedUrl}
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        This URL will be automatically generated for marketing & social media sharing
      </p>
    </div>
  );
};

export default ChallengePreviewUrl;
