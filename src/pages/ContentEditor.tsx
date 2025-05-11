
import React, { useState } from 'react';
import EditorHeader from '@/components/content-editor/EditorHeader';
import EditorSidebar from '@/components/content-editor/EditorSidebar';
import EditorCanvas from '@/components/content-editor/EditorCanvas';
import EditorToolbar from '@/components/content-editor/EditorToolbar';
import EditorControls from '@/components/content-editor/EditorControls';
import EditorStepNavigation, { Step } from '@/components/content-editor/EditorStepNavigation';

const ContentEditor = () => {
  const [selectedTool, setSelectedTool] = useState('video');
  const [mediaSource, setMediaSource] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Workflow state
  const [currentStep, setCurrentStep] = useState(0);
  
  // Define editor workflow steps
  const editorSteps: Step[] = [
    {
      id: 1,
      title: "Medien wählen",
      description: "Wähle ein Video oder Foto aus oder nehme ein neues auf."
    },
    {
      id: 2,
      title: "Bearbeiten",
      description: "Bearbeite deinen Content mit Filtern, Effekten, Text und mehr."
    },
    {
      id: 3,
      title: "KI-Optimierung",
      description: "Lass die KI deinen Content für maximales Engagement optimieren."
    },
    {
      id: 4,
      title: "Veröffentlichen",
      description: "Füge finale Details hinzu und teile deinen Content."
    }
  ];

  // Handle step change with logic for step requirements
  const handleStepChange = (step: number) => {
    // Require media selection before moving past step 0
    if (step > 0 && !mediaSource && currentStep === 0) {
      return;
    }
    
    setCurrentStep(step);
    
    // Automatically select appropriate tool based on step
    switch(step) {
      case 0:
        setSelectedTool('video');
        break;
      case 1:
        setSelectedTool('effects');
        break;
      case 2:
        setSelectedTool('templates');
        break;
      case 3:
        setSelectedTool('text');
        break;
      default:
        break;
    }
  };
  
  // Move to next step
  const handleNextStep = () => {
    if (currentStep < editorSteps.length - 1) {
      handleStepChange(currentStep + 1);
    }
  };

  return (
    <div className="container py-6 max-w-4xl mx-auto">
      <EditorHeader />
      
      <EditorStepNavigation 
        steps={editorSteps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        allowSkip={true}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-4 mt-6">
        <EditorSidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        
        <div className="flex flex-col">
          <EditorCanvas 
            mediaSource={mediaSource} 
            isProcessing={isProcessing}
            currentStep={currentStep}
          />
          
          <EditorToolbar 
            selectedTool={selectedTool} 
            setMediaSource={setMediaSource}
            setIsProcessing={setIsProcessing}
          />
          
          <EditorControls 
            mediaSource={mediaSource} 
            isProcessing={isProcessing}
            onNextStep={handleNextStep}
            currentStep={currentStep}
            totalSteps={editorSteps.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
