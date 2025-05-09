
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { DataPermissionSetting, DataType, DATA_PERMISSION_DEFAULTS } from '@/utils/data-vault/types';

export const useDataPermissions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<DataPermissionSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalXpRewarded, setTotalXpRewarded] = useState(0);

  // Local storage key for storing permissions in development mode
  const LOCAL_STORAGE_KEY = 'jillr_data_permissions';

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!user) {
        // Use demo data for non-authenticated users
        const demoPermissions = Object.entries(DATA_PERMISSION_DEFAULTS).map(([key, value]) => ({
          user_id: 'demo',
          data_type: key as DataType,
          status: false,
          xp_rewarded: 0,
          date_given: null
        }));
        setPermissions(demoPermissions);
        setTotalXpRewarded(0);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Since the user_data_permissions table may not exist yet, we're using localStorage as a fallback
        // In a production environment, this would be replaced with actual database queries
        const storedPermissions = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${user.id}`);
        
        if (storedPermissions) {
          const parsedPermissions = JSON.parse(storedPermissions) as DataPermissionSetting[];
          setPermissions(parsedPermissions);
          
          // Calculate total XP rewarded
          const total = parsedPermissions.reduce((sum, permission) => sum + (permission.xp_rewarded || 0), 0);
          setTotalXpRewarded(total);
        } else {
          // No permissions found, create default entries
          const defaultPermissions = Object.entries(DATA_PERMISSION_DEFAULTS).map(([key, value]) => ({
            user_id: user.id,
            data_type: key as DataType,
            status: false,
            xp_rewarded: 0,
            date_given: null
          }));

          // Save to localStorage
          localStorage.setItem(`${LOCAL_STORAGE_KEY}_${user.id}`, JSON.stringify(defaultPermissions));
          setPermissions(defaultPermissions);
        }
      } catch (error) {
        console.error('Error fetching data permissions:', error);
        toast({
          title: 'Fehler',
          description: 'Deine Datenfreigaben konnten nicht geladen werden.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissions();
  }, [user, toast]);

  const updatePermission = async (dataType: DataType, status: boolean): Promise<boolean> => {
    if (!user) {
      // For demo mode, just update the local state
      setPermissions(prevPermissions => 
        prevPermissions.map(p => 
          p.data_type === dataType 
            ? { ...p, status, date_given: status ? new Date().toISOString() : null } 
            : p
        )
      );
      return true;
    }

    try {
      const permissionToUpdate = permissions.find(p => p.data_type === dataType);
      
      if (!permissionToUpdate) return false;
      
      const xpToAward = status && !permissionToUpdate.status 
        ? DATA_PERMISSION_DEFAULTS[dataType].xpReward 
        : 0;
      
      // Update local state
      const updatedPermissions = permissions.map(p => 
        p.data_type === dataType 
          ? { 
              ...p, 
              status, 
              date_given: status ? new Date().toISOString() : null,
              xp_rewarded: status ? xpToAward : 0
            } 
          : p
      );
      
      setPermissions(updatedPermissions);
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_${user.id}`, JSON.stringify(updatedPermissions));

      // Update total XP rewarded
      if (status && xpToAward > 0) {
        setTotalXpRewarded(prev => prev + xpToAward);

        // In a real implementation, we would update the user's XP in the wallet table
        // For now, we'll just show a toast
        toast({
          title: 'XP erhalten!',
          description: `Du hast ${xpToAward} XP für die Datenfreigabe erhalten.`,
          variant: 'default'
        });
      } else if (!status) {
        // If revoking permission, reduce XP from total
        const xpToRemove = permissionToUpdate.xp_rewarded || 0;
        if (xpToRemove > 0) {
          setTotalXpRewarded(prev => prev - xpToRemove);
        }
      }

      return true;
    } catch (error) {
      console.error('Error updating data permission:', error);
      toast({
        title: 'Fehler',
        description: 'Die Datenfreigabe konnte nicht aktualisiert werden.',
        variant: 'destructive'
      });
      return false;
    }
  };

  const getPermissionStatus = (dataType: DataType): boolean => {
    const permission = permissions.find(p => p.data_type === dataType);
    return permission?.status || false;
  };

  const getXpReward = (dataType: DataType): number => {
    return DATA_PERMISSION_DEFAULTS[dataType].xpReward;
  };

  return {
    permissions,
    isLoading,
    totalXpRewarded,
    updatePermission,
    getPermissionStatus,
    getXpReward
  };
};
