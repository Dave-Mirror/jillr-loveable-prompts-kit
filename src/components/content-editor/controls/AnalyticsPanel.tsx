
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface AnalyticsPanelProps {
  isVisible: boolean;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute left-0 right-0 bg-card border border-gray-700 rounded-lg p-4 shadow-lg mt-12 z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Performance-Prognose</h3>
        <Badge className="bg-green-500/20 text-green-400">Hoch</Badge>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Erwartete Views</p>
          <p className="text-lg font-medium">8.5k - 15k</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Engagement Rate</p>
          <p className="text-lg font-medium">6.2%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Zielgruppen-Fit</p>
          <p className="text-lg font-medium">92%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Trend-Potential</p>
          <p className="text-lg font-medium">Hoch</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <h4 className="text-sm font-medium mb-2">KI-Empfehlungen</h4>
        <ul className="text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Dein Content entspricht aktuellen TikTok-Trends</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Videolänge ist optimal für die Zielplattform</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">!</span>
            <span>Füge einen Call-to-Action am Ende hinzu, um die Conversion zu steigern</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
