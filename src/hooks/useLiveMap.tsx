
import { useContext } from 'react';
import { LiveMapContext } from '@/contexts/LiveMapContext';

export const useLiveMap = () => {
  const context = useContext(LiveMapContext);
  
  if (context === undefined) {
    throw new Error('useLiveMap must be used within a LiveMapProvider');
  }
  
  return context;
};
