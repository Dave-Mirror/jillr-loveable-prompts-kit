
import { useState, useEffect } from 'react';
import { ContextTrigger } from '@/types/hypocampus';
import { getTriggersForUser, getTriggersForBrand, updateTrigger } from '@/services/hypocampus/triggerService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useTriggerDashboard = (userRole: 'personal' | 'brand' = 'personal') => {
  const [triggers, setTriggers] = useState<ContextTrigger[]>([]);
  const [filteredTriggers, setFilteredTriggers] = useState<ContextTrigger[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTriggers = async () => {
      try {
        setIsLoading(true);
        let data;
        
        if (user) {
          // If user is logged in, fetch their triggers
          if (userRole === 'brand' && user?.email?.includes('brand')) {
            // For brand users, fetch brand triggers (using email as a workaround)
            data = await getTriggersForBrand(user.id);
          } else {
            // For personal users, fetch their personal triggers
            data = await getTriggersForUser(user.id);
          }
        } else {
          // For non-authenticated users, show demo triggers
          data = await getTriggersForUser('demo-user');
        }
        
        setTriggers(data);
        setFilteredTriggers(data);
      } catch (error) {
        console.error('Error fetching triggers:', error);
        toast({
          title: "Fehler beim Laden der Trigger",
          description: "Deine Trigger konnten nicht geladen werden. Bitte versuche es später erneut.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTriggers();
  }, [user, toast, userRole]);

  // Filter-Logik
  useEffect(() => {
    let result = [...triggers];
    
    // Textsuche
    if (searchQuery) {
      result = result.filter(
        trigger => 
          trigger.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (trigger.description && trigger.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Kategorie-Filter
    if (categoryFilter !== 'all') {
      result = result.filter(trigger => trigger.category === categoryFilter);
    }
    
    // Status-Filter
    if (statusFilter !== 'all') {
      result = result.filter(trigger => {
        if (statusFilter === 'active') return trigger.active;
        if (statusFilter === 'inactive') return !trigger.active;
        return true;
      });
    }
    
    setFilteredTriggers(result);
  }, [triggers, searchQuery, categoryFilter, statusFilter]);

  const handleToggleTrigger = async (id: string, currentActive: boolean) => {
    try {
      // Only allow authenticated users to modify triggers
      if (!user) {
        toast({
          title: "Anmeldung erforderlich",
          description: "Um Trigger zu aktivieren oder deaktivieren, musst du dich anmelden.",
          variant: "default"
        });
        return;
      }
      
      await updateTrigger(id, { active: !currentActive });

      // Update local state
      setTriggers(triggers.map(trigger => 
        trigger.id === id ? { ...trigger, active: !currentActive } : trigger
      ));

      toast({
        title: `Trigger ${!currentActive ? 'aktiviert' : 'deaktiviert'}`,
        description: `Der Trigger wurde erfolgreich ${!currentActive ? 'aktiviert' : 'deaktiviert'}.`,
      });
    } catch (error) {
      console.error('Error updating trigger:', error);
      toast({
        title: "Fehler",
        description: "Der Status des Triggers konnte nicht geändert werden.",
        variant: "destructive"
      });
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  return {
    triggers,
    filteredTriggers,
    isLoading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    resetFilters,
    handleToggleTrigger
  };
};

export default useTriggerDashboard;
