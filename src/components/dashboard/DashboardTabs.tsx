
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Challenge, Product, DashboardStats } from '@/types/dashboard';
import ChallengesTab from './ChallengesTab';
import ShopTab from './ShopTab';
import StatsTab from './StatsTab';

interface DashboardTabsProps {
  challenges: Challenge[];
  products: Product[];
  stats: DashboardStats;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ challenges, products, stats }) => {
  return (
    <Tabs defaultValue="challenges" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="challenges">Meine Challenges</TabsTrigger>
        <TabsTrigger value="shop">TikTok Shop</TabsTrigger>
        <TabsTrigger value="stats">Statistiken</TabsTrigger>
      </TabsList>
      
      <TabsContent value="challenges">
        <ChallengesTab challenges={challenges} />
      </TabsContent>
      
      <TabsContent value="shop">
        <ShopTab products={products} />
      </TabsContent>
      
      <TabsContent value="stats">
        <StatsTab stats={stats} products={products} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
