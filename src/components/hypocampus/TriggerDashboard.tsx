
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import TriggerFilter from './dashboard/TriggerFilter';
import TriggerList from './dashboard/TriggerList';
import useTriggerDashboard from '@/hooks/useTriggerDashboard';

interface TriggerDashboardProps {
  userRole?: 'personal' | 'brand';
}

const TriggerDashboard: React.FC<TriggerDashboardProps> = ({ userRole = 'personal' }) => {
  const { user } = useAuth();
  const {
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
  } = useTriggerDashboard(userRole);

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl bg-jillr-dark border-jillr-neonBlue/30">
        <CardHeader>
          <CardTitle className="text-xl text-white">Meine Trigger</CardTitle>
          <CardDescription>Lädt...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl bg-jillr-dark border-jillr-neonBlue/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">
          {userRole === 'brand' ? 'Marken-Trigger' : 'Meine Trigger'}
        </CardTitle>
        <CardDescription>
          {filteredTriggers.length > 0
            ? `${user ? 'Du hast' : 'Beispiel:'} ${filteredTriggers.length} Trigger, davon ${filteredTriggers.filter(t => t.active).length} aktiv`
            : user ? 'Du hast noch keine Trigger erstellt' : 'Keine Beispiel-Trigger verfügbar'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TriggerFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          resetFilters={resetFilters}
          userRole={userRole}
        />
        
        <TriggerList
          filteredTriggers={filteredTriggers}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          resetFilters={resetFilters}
          handleToggleTrigger={handleToggleTrigger}
          user={user}
        />
      </CardContent>
    </Card>
  );
};

export default TriggerDashboard;
