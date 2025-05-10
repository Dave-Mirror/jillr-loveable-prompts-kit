
import React from 'react';
import ChallengeTypeSelector from './basics/ChallengeTypeSelector';
import ChallengeInfoFields from './basics/ChallengeInfoFields';
import ChallengePreviewUrl from './basics/ChallengePreviewUrl';

interface ChallengeBasicsProps {
  data: {
    type: string[];
    title: string;
    description: string;
    [key: string]: any;
  };
  onChange: (data: any) => void;
}

const ChallengeBasics: React.FC<ChallengeBasicsProps> = ({ data, onChange }) => {
  const handleTypeChange = (typeId: string) => {
    const newTypes = data.type.includes(typeId)
      ? data.type.filter(id => id !== typeId)
      : [...data.type, typeId];
    
    onChange({ type: newTypes });
  };

  const handleInfoChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <ChallengeTypeSelector 
        selectedTypes={data.type}
        onTypeChange={handleTypeChange}
      />

      <ChallengeInfoFields 
        title={data.title}
        description={data.description}
        onChange={handleInfoChange}
      />

      <ChallengePreviewUrl title={data.title} />
    </div>
  );
};

export default ChallengeBasics;
