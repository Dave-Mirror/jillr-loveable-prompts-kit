
import React from 'react';

interface UploadHeaderProps {
  title: string;
  challengeTitle: string | undefined;
  isLoading: boolean;
}

const UploadHeader: React.FC<UploadHeaderProps> = ({ title, challengeTitle, isLoading }) => {
  if (isLoading) {
    return (
      <>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <h2 className="text-xl neon-text mb-6">Loading challenge details...</h2>
      </>
    );
  }
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <h2 className="text-xl neon-text mb-6">{challengeTitle}</h2>
    </>
  );
};

export default UploadHeader;
