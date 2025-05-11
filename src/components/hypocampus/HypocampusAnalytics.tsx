
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import AnalyticsHeader from './analytics/AnalyticsHeader';
import PerformanceChart from './analytics/PerformanceChart';
import CategoryPieChart from './analytics/CategoryPieChart';
import BrandInsightsChart from './analytics/BrandInsightsChart';
import { 
  triggerPerformanceData, 
  triggerCategoryData, 
  brandTriggerData 
} from './analytics/mockData';

const HypocampusAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');
  
  // For guest users, we'll show demo data
  const showDemoData = !user;
  
  return (
    <div className="space-y-6">
      <AnalyticsHeader 
        showDemoData={showDemoData} 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="categories">Kategorien</TabsTrigger>
          {!showDemoData && user?.email?.includes('brand') && <TabsTrigger value="brand">Marken-Insights</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="performance">
          <PerformanceChart data={triggerPerformanceData} />
        </TabsContent>
        
        <TabsContent value="categories">
          <CategoryPieChart data={triggerCategoryData} showDemoData={showDemoData} />
        </TabsContent>
        
        {!showDemoData && user?.email?.includes('brand') && (
          <TabsContent value="brand">
            <BrandInsightsChart data={brandTriggerData} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default HypocampusAnalytics;
