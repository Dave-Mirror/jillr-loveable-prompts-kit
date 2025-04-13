
import { Submission, SubmissionStatus } from '@/components/challenge/types';

/**
 * Format submissions to match the required type
 */
export const formatSubmissions = (submissions: any[]): Submission[] => {
  if (!Array.isArray(submissions)) return [];
  
  return submissions.map(sub => ({
    id: sub.id,
    user_id: sub.user_id,
    username: sub.username || `User_${sub.user_id.substring(0, 5)}`,
    profile_image: sub.profile_image,
    video_url: sub.video_url,
    views: sub.views || 0,
    likes: sub.likes || 0,
    status: validateSubmissionStatus(sub.status),
    verified: sub.verified || false,
    challenge_id: sub.challenge_id,
    submitted_at: sub.submitted_at
  }));
};

/**
 * Validate submission status to ensure it matches the allowed types
 */
export const validateSubmissionStatus = (status: string): SubmissionStatus => {
  const validStatuses: SubmissionStatus[] = ['pending', 'approved', 'rejected', 'verified'];
  return validStatuses.includes(status as SubmissionStatus) 
    ? status as SubmissionStatus 
    : 'pending';
};
