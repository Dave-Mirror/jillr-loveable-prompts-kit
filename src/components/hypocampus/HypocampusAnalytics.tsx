
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock-Daten für die Analysegrafiken
const triggerPerformanceData = [
  { name: 'Morgens', ausgelöst: 28, belohnungen: 22, conversions: 18 },
  { name: 'Mittags', ausgelöst: 15, belohnungen: 12, conversions: 8 },
  { name: 'Abends', ausgelöst: 32, belohnungen: 28, conversions: 20 },
  { name: 'Zu Hause', ausgelöst: 45, belohnungen: 40, conversions: 35 },
  { name: 'Arbeit', ausgelöst: 18, belohnungen: 15, conversions: 12 },
  { name: 'App öffnen', ausgelöst: 60, belohnungen: 55, conversions: 50 }
];

const triggerCategoryData = [
  { name: 'Zeit', value: 75 },
  { name: 'Ort', value: 63 },
  { name: 'Aktivität', value: 42 },
  { name: 'Wetter', value: 28 },
  { name: 'Stimmung', value: 15 },
  { name: 'Social', value: 20 }
];

const brandTriggerData = [
  { name: 'Rabatt-Coupons', ausgelöst: 45, conversions: 28 },
  { name: 'Challenge-Vorschläge', ausgelöst: 38, conversions: 32 },
  { name: 'Exklusive Inhalte', ausgelöst: 22, conversions: 18 },
  { name: 'Erinnerungen', ausgelöst: 30, conversions: 15 }
];

const COLORS = ['#8B5CF6', '#EC4899', '#10B981', '#3B82F6', '#F59E0B', '#6366F1'];

const HypocampusAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');
  
  // For guest users, we'll show demo data
  const showDemoData = !user;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {showDemoData ? 'Demo Analytics' : 'Trigger Analytics'}
        </h2>
        
        {!showDemoData && (
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Zeitraum wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Letzte 7 Tage</SelectItem>
              <SelectItem value="30d">Letzte 30 Tage</SelectItem>
              <SelectItem value="3m">Letzte 3 Monate</SelectItem>
              <SelectItem value="1y">Letztes Jahr</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      
      {showDemoData && (
        <div className="bg-jillr-darkBlue/30 p-4 rounded-lg mb-2 border border-jillr-border/20">
          <p className="text-sm text-gray-300">
            Dies sind Demo-Daten zu Anschauungszwecken. Für persönliche Analytics und detaillierte Auswertungen deiner Trigger ist eine Anmeldung erforderlich.
          </p>
        </div>
      )}
      
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="categories">Kategorien</TabsTrigger>
          {!showDemoData && user?.email?.includes('brand') && <TabsTrigger value="brand">Marken-Insights</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="performance">
          <Card className="bg-jillr-dark border-jillr-neonPurple/30">
            <CardHeader>
              <CardTitle className="text-xl">Trigger Performance</CardTitle>
              <CardDescription>Überblick über die Leistung der aktivsten Trigger</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={triggerPerformanceData}
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
        </TabsContent>
        
        <TabsContent value="categories">
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
                      data={triggerCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {triggerCategoryData.map((entry, index) => (
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
                {triggerCategoryData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-300">{entry.name}</span>
                  </div>
                ))}
              </div>
              
              {showDemoData && (
                <div className="mt-6">
                  <Link to="/auth">
                    <Button className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
                      Anmelden für persönliche Daten
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {!showDemoData && user?.email?.includes('brand') && (
          <TabsContent value="brand">
            <Card className="bg-jillr-dark border-jillr-neonPurple/30">
              <CardHeader>
                <CardTitle className="text-xl">Marken-Trigger Insights</CardTitle>
                <CardDescription>Performance von Marken-spezifischen Triggern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={brandTriggerData}
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
                      <Bar dataKey="ausgelöst" name="Ausgelöst" fill="#3B82F6" />
                      <Bar dataKey="conversions" name="Conversions" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default HypocampusAnalytics;
