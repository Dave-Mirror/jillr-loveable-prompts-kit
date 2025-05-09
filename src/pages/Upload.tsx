
import React from 'react';
import { useParams } from 'react-router-dom';
import useChallengeData from '@/hooks/useChallengeData';
import useUploadSubmission from '@/hooks/useUploadSubmission';
import UploadHeader from '@/components/upload/UploadHeader';
import UploadFormContainer from '@/components/upload/UploadFormContainer';
import ChallengeNotFound from '@/components/upload/ChallengeNotFound';

const Upload = () => {
  const { id } = useParams<{ id: string }>();
  const { challenge, isLoading } = useChallengeData(id);
  const { isSubmitting, handleSubmit } = useUploadSubmission(id, challenge);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-12">
        <div className="glassmorphism p-8">
          <h1 className="text-2xl font-bold mb-6">Loading challenge details...</h1>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return <ChallengeNotFound />;
  }

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <div className="glassmorphism p-8">
        <UploadHeader 
          title="Upload Your Submission" 
          challengeTitle={challenge.title}
          isLoading={isLoading}
        />
        
        <UploadFormContainer 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default Upload;
