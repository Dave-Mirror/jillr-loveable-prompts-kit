
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  data: Array<{
    name: string;
    ausgelöst: number;
    belohnungen: number;
    conversions: number;
  }>;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <Card className="bg-jillr-dark border-jillr-neonPurple/30">
      <CardHeader>
        <CardTitle className="text-xl">Trigger Performance</CardTitle>
        <CardDescription>Überblick über die Leistung der aktivsten Trigger</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a36" />
              <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  borderColor: '#6e56cf',
                  borderRadius: '6px',
                }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="ausgelöst" name="Ausgelöst" fill="#8B5CF6" />
              <Bar dataKey="belohnungen" name="Belohnungen" fill="#EC4899" />
              <Bar dataKey="conversions" name="Conversions" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
