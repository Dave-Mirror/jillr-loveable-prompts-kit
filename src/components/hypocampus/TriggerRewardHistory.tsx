
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Award, Clock } from 'lucide-react';
import { getRewardsForUser } from '@/services/mockHypocampusService';
import { RewardLog, Reward } from '@/types/hypocampus';

interface ChartData {
  date: string;
  xp: number;
}

// Extended type with joined reward data
interface RewardLogWithDetails extends RewardLog {
  rewards?: Reward;
}

const TriggerRewardHistory: React.FC = () => {
  const [rewardLogs, setRewardLogs] = useState<RewardLogWithDetails[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRewardLogs = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const data = await getRewardsForUser(user.id);
        setRewardLogs(data);

        // Process data for chart
        const last7Days = getLast7Days();
        const chartData = processChartData(data, last7Days);
        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching reward logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewardLogs();
  }, [user]);

  const getLast7Days = (): string[] => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]); // 'YYYY-MM-DD'
    }
    return dates;
  };

  const processChartData = (logs: RewardLogWithDetails[], last7Days: string[]): ChartData[] => {
    const dailyXP: Record<string, number> = {};
    
    // Initialize all days with 0 XP
    last7Days.forEach(date => {
      dailyXP[date] = 0;
    });
    
    // Sum XP for each day
    logs.forEach(log => {
      const logDate = new Date(log.granted_at).toISOString().split('T')[0];
      
      if (last7Days.includes(logDate)) {
        const xpValue = log.rewards?.reward_type === 'xp' ? log.rewards.value : 0;
        dailyXP[logDate] = (dailyXP[logDate] || 0) + xpValue;
      }
    });
    
    // Convert to chart data format
    return last7Days.map(date => ({
      date: formatDate(date),
      xp: dailyXP[date]
    }));
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  };

  const getRewardValue = (log: RewardLogWithDetails): number => {
    return log.rewards?.value || 0;
  };

  const getRewardDescription = (log: RewardLogWithDetails): string => {
    return log.rewards?.description || 'Keine Beschreibung';
  };

  if (isLoading) {
    return (
      <Card className="w-full bg-jillr-dark border-jillr-neonPurple/30">
        <CardHeader>
          <CardTitle className="text-xl text-white">Belohnungshistorie</CardTitle>
          <CardDescription>Lädt...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-jillr-dark border-jillr-neonPurple/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">XP durch Trigger</CardTitle>
        <CardDescription>
          Statistik deiner Belohnungen der letzten 7 Tage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a36" />
              <XAxis dataKey="date" stroke="#9ca3af" />
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
              <Line
                type="monotone"
                dataKey="xp"
                stroke="#6e56cf"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 1, fill: '#6e56cf' }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Letzte Belohnungen</h3>
          {rewardLogs.length > 0 ? (
            <ScrollArea className="h-[200px]">
              <div className="space-y-3">
                {rewardLogs.slice(0, 10).map(log => (
                  <div 
                    key={log.id} 
                    className="p-3 rounded-lg border border-gray-700 bg-jillr-darkBlue/30 flex items-center gap-3"
                  >
                    <div className="bg-jillr-neonPurple/20 p-2 rounded-full">
                      <Award className="h-5 w-5 text-jillr-neonPurple" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-jillr-neonPurple/10 text-xs">
                            {log.rewards?.reward_type.toUpperCase() || 'XP'}
                          </Badge>
                          <Badge className="bg-jillr-neonGreen">+{getRewardValue(log)} XP</Badge>
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(log.granted_at).toLocaleDateString('de-DE', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: '2-digit'
                          })}
                        </div>
                      </div>
                      <p className="text-sm mt-1">{getRewardDescription(log)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="py-4 text-center">
              <p className="text-muted-foreground">
                Du hast noch keine Belohnungen erhalten. Aktiviere Trigger, um Belohnungen zu verdienen.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerRewardHistory;
