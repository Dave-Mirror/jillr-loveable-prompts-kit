
import React, { useState } from 'react';
import ChallengePreviewCard from './preview/ChallengePreviewCard';
import AudienceKpiCard from './preview/AudienceKpiCard';
import AdditionalInfoCard from './preview/AdditionalInfoCard';
import PublishingOptions from './preview/PublishingOptions';

const PreviewPublish = ({ data, onChange }) => {
  const [previewMedia, setPreviewMedia] = useState({
    type: data.previewMediaType || 'image',
    url: data.previewMediaUrl || ''
  });
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Challenge Preview</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Review your challenge before publishing.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChallengePreviewCard 
            data={data}
            previewMedia={previewMedia}
            setPreviewMedia={setPreviewMedia}
            onChange={onChange}
          />
          
          <div className="space-y-6">
            <AudienceKpiCard data={data} />
            <AdditionalInfoCard data={data} />
          </div>
        </div>
      </div>

      <PublishingOptions data={data} onChange={onChange} />
    </div>
  );
};

export default PreviewPublish;
