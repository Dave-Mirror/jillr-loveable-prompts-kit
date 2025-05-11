
import { ReactNode, useEffect } from 'react';
import { useHypocampusSystem } from '@/hooks/useHypocampusSystem';

interface HypocampusProviderProps {
  children: ReactNode;
}

const HypocampusProvider = ({ children }: HypocampusProviderProps) => {
  // Initialize the hypocampus system
  const { captureSnapshot } = useHypocampusSystem();

  // Log that the system has been initialized
  useEffect(() => {
    console.log('Hypocampus system initialized');
  }, []);

  return <>{children}</>;
};

export default HypocampusProvider;
