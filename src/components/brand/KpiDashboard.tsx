
import React from 'react';
import StatsCards from './dashboard/StatsCards';
import ChallengeViewsChart from './dashboard/ChallengeViewsChart';
import ChallengeParticipationChart from './dashboard/ChallengeParticipationChart';
import UgcUtilizationChart from './dashboard/UgcUtilizationChart';
import ConversionRateChart from './dashboard/ConversionRateChart';

const KpiDashboard = () => {
  return (
    <div className="space-y-6">
      <StatsCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChallengeViewsChart />
        <ChallengeParticipationChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UgcUtilizationChart />
        <ConversionRateChart />
      </div>
    </div>
  );
};

export default KpiDashboard;
