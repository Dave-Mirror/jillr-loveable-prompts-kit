
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

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!user) {
        // Use demo data for non-authenticated users
        const demoPermissions = Object.entries(DATA_PERMISSION_DEFAULTS).map(([key, value]) => ({
          user_id: 'demo',
          data_type: key as DataType,
          status: false,
          xp_rewarded: value.xpReward,
          date_given: null
        }));
        setPermissions(demoPermissions);
        setTotalXpRewarded(0);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('user_data_permissions')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        if (!data || data.length === 0) {
          // No permissions found, create default entries
          const defaultPermissions = Object.entries(DATA_PERMISSION_DEFAULTS).map(([key, value]) => ({
            user_id: user.id,
            data_type: key as DataType,
            status: false,
            xp_rewarded: 0,
            date_given: null
          }));

          // Insert defaults into database
          const { error: insertError } = await supabase
            .from('user_data_permissions')
            .insert(defaultPermissions);

          if (insertError) throw insertError;
          setPermissions(defaultPermissions);
        } else {
          setPermissions(data);
          
          // Calculate total XP rewarded
          const total = data.reduce((sum, permission) => sum + (permission.xp_rewarded || 0), 0);
          setTotalXpRewarded(total);
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

  const updatePermission = async (dataType: DataType, status: boolean) => {
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
      
      const { error } = await supabase
        .from('user_data_permissions')
        .update({
          status,
          date_given: status ? new Date().toISOString() : null,
          xp_rewarded: status ? xpToAward : 0
        })
        .eq('user_id', user.id)
        .eq('data_type', dataType);

      if (error) throw error;

      // Update local state
      setPermissions(prevPermissions => 
        prevPermissions.map(p => 
          p.data_type === dataType 
            ? { 
                ...p, 
                status, 
                date_given: status ? new Date().toISOString() : null,
                xp_rewarded: status ? xpToAward : 0
              } 
            : p
        )
      );

      // Update wallet XP if permission was granted
      if (status && xpToAward > 0) {
        const { data: wallet, error: walletError } = await supabase
          .from('wallets')
          .select('xp_total')
          .eq('user_id', user.id)
          .single();

        if (walletError) throw walletError;

        if (wallet) {
          const { error: updateError } = await supabase
            .from('wallets')
            .update({ xp_total: wallet.xp_total + xpToAward })
            .eq('user_id', user.id);

          if (updateError) throw updateError;
        }

        // Update total XP rewarded
        setTotalXpRewarded(prev => prev + xpToAward);

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
