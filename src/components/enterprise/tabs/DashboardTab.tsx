
import React from 'react';
import KpiDashboard from '@/components/brand/KpiDashboard';
import NotificationCenter from '@/components/brand/NotificationCenter';

const DashboardTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <KpiDashboard />
      </div>
      <div>
        <NotificationCenter />
      </div>
    </div>
  );
};

export default DashboardTab;
