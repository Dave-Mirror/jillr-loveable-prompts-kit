
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TriggerROIAnalysisProps {
  userRole: 'personal' | 'brand';
}

const TriggerROIAnalysis: React.FC<TriggerROIAnalysisProps> = ({ userRole }) => {
  // Sample data - in real app, this would come from user data analysis
  const personalData = [
    { name: 'XP gewonnen', value: 2500, color: '#9b87f5' },
    { name: 'Badges erhalten', value: 12, color: '#33C3F0' },
    { name: 'Challenges abgeschlossen', value: 15, color: '#F97316' },
    { name: 'Community-Punkte', value: 750, color: '#D946EF' },
  ];
  
  // Brand ROI data
  const brandData = [
    { name: 'Engagement', baseline: 100, withTriggers: 185, improvement: 85 },
    { name: 'Conversion', baseline: 100, withTriggers: 165, improvement: 65 },
    { name: 'Reach', baseline: 100, withTriggers: 220, improvement: 120 },
    { name: 'Retention', baseline: 100, withTriggers: 145, improvement: 45 },
  ];

  const brandChartData = brandData.map(item => ({
    name: item.name,
    Baseline: item.baseline,
    'Mit Triggers': item.withTriggers,
    Verbesserung: item.improvement,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">
          {userRole === 'personal' ? 'Deine Performance' : 'ROI-Analyse'}
        </h2>
        <p className="text-gray-400">
          {userRole === 'personal' 
            ? 'So haben deine Trigger deine Leistung verbessert'
            : 'Analyse der Trigger-Effektivität und des Return on Investment'
          }
        </p>
      </div>
      
      {userRole === 'personal' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalData.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold" style={{ color: item.color }}>
                    {item.value}
                  </span>
                  <span className="text-sm text-green-400">+{Math.round(item.value * 0.12)} durch Trigger</span>
                </div>
                <div className="h-2 w-full bg-gray-700 mt-2 rounded">
                  <div 
                    className="h-2 rounded" 
                    style={{ width: `${Math.min(item.value / 10, 100)}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Performance-Indikator im Vergleich (Baseline = 100)</CardTitle>
            <CardDescription>
              Leistungsverbesserung durch Trigger-basiertes Marketing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={brandChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333' }} 
                    labelStyle={{ color: 'white' }}
                  />
                  <Legend />
                  <Bar dataKey="Baseline" stackId="a" fill="#555555" />
                  <Bar dataKey="Mit Triggers" stackId="a" fill="#9b87f5" />
                  <Bar dataKey="Verbesserung" fill="#0EA5E9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center mt-4 text-sm text-gray-400">
              Vergleich der Leistungsindikatoren mit und ohne Trigger-Implementierung
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TriggerROIAnalysis;
