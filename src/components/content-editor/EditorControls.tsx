
import React, { useState } from 'react';
import EditorControlButtons from './controls/EditorControlButtons';
import EditorActionButtons from './controls/EditorActionButtons';
import AnalyticsPanel from './controls/AnalyticsPanel';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface EditorControlsProps {
  mediaSource: string | null;
  isProcessing: boolean;
  onNextStep: () => void;
  currentStep: number;
  totalSteps: number;
}

const EditorControls: React.FC<EditorControlsProps> = ({ 
  mediaSource, 
  isProcessing,
  onNextStep,
  currentStep,
  totalSteps
}) => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const handleToggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };
  
  // Bestimme Schaltflächentext basierend auf aktuellem Schritt
  const getButtonText = () => {
    switch(currentStep) {
      case 0:
        return "Weiter zur Bearbeitung";
      case 1:
        return "KI-Optimierung starten";
      case 2:
        return "Vorbereitungen abschließen";
      case 3:
        return "Veröffentlichen";
      default:
        return "Weiter";
    }
  };

  // Bestimme, ob der Button deaktiviert werden soll
  const isNextButtonDisabled = () => {
    if (isProcessing) return true;
    if (currentStep === 0 && !mediaSource) return true;
    return false;
  };

  return (
    <div className="relative mt-4 p-4">
      <div className="flex justify-between mb-4">
        <EditorControlButtons 
          mediaSource={mediaSource}
          isProcessing={isProcessing}
          showAnalytics={showAnalytics}
          onToggleAnalytics={handleToggleAnalytics}
        />
        
        {/* Next Step Button */}
        <Button
          onClick={onNextStep}
          disabled={isNextButtonDisabled()}
          className={`gap-2 ${
            currentStep === totalSteps - 1 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-jillr-neonPurple hover:bg-jillr-neonPurple/90"
          }`}
        >
          {getButtonText()}
          {currentStep === totalSteps - 1 ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      {/* Analytik-Panel */}
      <AnalyticsPanel isVisible={showAnalytics} />
      
      {/* Action Buttons basierend auf aktuellem Schritt */}
      {currentStep === totalSteps - 1 && (
        <EditorActionButtons 
          mediaSource={mediaSource}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default EditorControls;
