
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AnalyticsHeaderProps {
  showDemoData: boolean;
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  showDemoData, 
  timeRange, 
  setTimeRange 
}) => {
  return (
    <>
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
    </>
  );
};

export default AnalyticsHeader;
