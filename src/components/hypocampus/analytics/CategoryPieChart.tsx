
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import AnalyticsDemoPrompt from './AnalyticsDemoPrompt';

interface CategoryPieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  showDemoData: boolean;
}

const COLORS = ['#8B5CF6', '#EC4899', '#10B981', '#3B82F6', '#F59E0B', '#6366F1'];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data, showDemoData }) => {
  return (
    <Card className="bg-jillr-dark border-jillr-neonPurple/30">
      <CardHeader>
        <CardTitle className="text-xl">Trigger-Kategorien</CardTitle>
        <CardDescription>Verteilung der Trigger nach Kategorien</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  borderColor: '#6e56cf',
                  borderRadius: '6px',
                }}
                formatter={(value) => [`${value} Trigger`, 'Anzahl']}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-300">{entry.name}</span>
            </div>
          ))}
        </div>
        
        {showDemoData && <AnalyticsDemoPrompt />}
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
