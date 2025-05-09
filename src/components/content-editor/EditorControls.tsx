
import React, { useState } from 'react';
import EditorControlButtons from './controls/EditorControlButtons';
import AnalyticsPanel from './controls/AnalyticsPanel';
import EditorActionButtons from './controls/EditorActionButtons';

interface EditorControlsProps {
  mediaSource: string | null;
  isProcessing: boolean;
}

const EditorControls: React.FC<EditorControlsProps> = ({ mediaSource, isProcessing }) => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const handleToggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };
  
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 relative">
        <EditorControlButtons 
          mediaSource={mediaSource}
          isProcessing={isProcessing}
          showAnalytics={showAnalytics}
          onToggleAnalytics={handleToggleAnalytics}
        />
        
        <AnalyticsPanel isVisible={showAnalytics && !!mediaSource} />
      </div>
      
      <EditorActionButtons 
        mediaSource={mediaSource}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default EditorControls;
