
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, FileText } from 'lucide-react';

interface ChallengeHeaderProps {
  onSaveDraft: () => void;
  onUseTemplate: () => void;
}

const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({ onSaveDraft, onUseTemplate }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Challenge Editor</h1>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onUseTemplate}>
          <FileText className="mr-2 h-4 w-4" />
          Use Template
        </Button>
        <Button variant="outline" onClick={onSaveDraft}>
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </div>
    </div>
  );
};

export default ChallengeHeader;
