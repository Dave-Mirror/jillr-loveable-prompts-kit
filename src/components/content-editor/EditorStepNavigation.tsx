
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  id: number;
  title: string;
  description: string;
}

interface EditorStepNavigationProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  allowSkip?: boolean;
}

const EditorStepNavigation: React.FC<EditorStepNavigationProps> = ({
  steps,
  currentStep,
  onStepChange,
  allowSkip = false
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Content-Erstellung</h2>
        {allowSkip && currentStep < steps.length && (
          <Button 
            variant="ghost" 
            onClick={() => onStepChange(currentStep + 1)}
            className="text-xs"
          >
            Überspringen
          </Button>
        )}
      </div>

      <div className="flex items-center w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col items-center justify-center h-20 flex-1 rounded-lg transition-colors border",
                currentStep === index 
                  ? "bg-jillr-neonPurple/20 border-jillr-neonPurple" 
                  : currentStep > index
                  ? "bg-green-600/10 border-green-600/30"
                  : "border-gray-700 hover:bg-gray-700/20"
              )}
              onClick={() => currentStep >= index && onStepChange(index)}
            >
              <div className="flex items-center justify-center w-6 h-6 mb-1">
                {currentStep > index ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : currentStep === index ? (
                  <Circle className="w-5 h-5 text-jillr-neonPurple" fill="currentColor" fillOpacity={0.2} />
                ) : (
                  <Circle className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <span className={cn(
                "text-sm font-medium",
                currentStep === index 
                  ? "text-jillr-neonPurple" 
                  : currentStep > index
                  ? "text-green-500"
                  : "text-gray-400"
              )}>
                {step.title}
              </span>
            </Button>
            
            {index < steps.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-500 mx-1" />
            )}
          </React.Fragment>
        ))}
      </div>

      <Card className="mt-4 bg-gray-800/50 border-gray-700 p-4">
        <h3 className="font-medium mb-1">{steps[currentStep]?.title}</h3>
        <p className="text-sm text-gray-400">{steps[currentStep]?.description}</p>
      </Card>
    </div>
  );
};

export default EditorStepNavigation;
