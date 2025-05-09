
import React from 'react';
import { useDataPermissions } from '@/hooks/useDataPermissions';
import DataManagerHeader from './DataManagerHeader';
import DataPermissionToggle from './DataPermissionToggle';
import DataExportSection from './DataExportSection';
import { Skeleton } from '@/components/ui/skeleton';

const DataManager: React.FC = () => {
  const { 
    permissions, 
    isLoading, 
    totalXpRewarded, 
    updatePermission, 
    getPermissionStatus 
  } = useDataPermissions();
  
  // XP for next reward (e.g., product drop)
  const nextRewardXp = 2000;
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-24 w-full mb-6" />
        
        {Array(4).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full mb-4" />
        ))}
      </div>
    );
  }
  
  const dataTypes = ['location', 'tracking', 'ugc', 'activity'] as const;
  
  return (
    <div>
      <DataManagerHeader 
        totalXpRewarded={totalXpRewarded}
        nextRewardXp={nextRewardXp}
      />
      
      <div className="grid grid-cols-1 gap-4">
        {dataTypes.map(type => (
          <DataPermissionToggle 
            key={type}
            type={type}
            enabled={getPermissionStatus(type)}
            onToggle={updatePermission}
            isLoading={isLoading}
          />
        ))}
      </div>
      
      <DataExportSection />
    </div>
  );
};

export default DataManager;
