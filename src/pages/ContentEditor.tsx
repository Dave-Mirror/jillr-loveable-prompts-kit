
import React, { useState } from 'react';
import EditorHeader from '@/components/content-editor/EditorHeader';
import EditorSidebar from '@/components/content-editor/EditorSidebar';
import EditorCanvas from '@/components/content-editor/EditorCanvas';
import EditorToolbar from '@/components/content-editor/EditorToolbar';
import EditorControls from '@/components/content-editor/EditorControls';

const ContentEditor = () => {
  const [selectedTool, setSelectedTool] = useState('video');
  const [mediaSource, setMediaSource] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  return (
    <div className="container py-6 max-w-screen-2xl">
      <EditorHeader />
      
      <div className="mt-6 flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-200px)]">
        <EditorSidebar 
          selectedTool={selectedTool} 
          setSelectedTool={setSelectedTool} 
        />
        
        <div className="flex-1 flex flex-col">
          <EditorCanvas 
            mediaSource={mediaSource} 
            isProcessing={isProcessing} 
          />
          
          <EditorToolbar 
            selectedTool={selectedTool}
            setMediaSource={setMediaSource}
            setIsProcessing={setIsProcessing}
          />
        </div>
      </div>
      
      <EditorControls 
        mediaSource={mediaSource} 
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default ContentEditor;
