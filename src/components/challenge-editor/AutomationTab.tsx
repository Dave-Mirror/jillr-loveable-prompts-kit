
import React, { useState } from 'react';
import TriggerIntegration from './TriggerIntegration';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, X } from 'lucide-react';
import { getConditionLabel, getActionLabel } from '@/components/hypocampus/config/triggerOptions';

interface AutomationTabProps {
  data: any;
  onChange: (data: any) => void;
}

const AutomationTab: React.FC<AutomationTabProps> = ({ data, onChange }) => {
  const triggers = data.triggers || [];
  
  const handleAddTrigger = (newTrigger: {condition: string, action: string}) => {
    const updatedTriggers = [
      ...triggers, 
      { 
        id: Date.now().toString(),
        condition: newTrigger.condition,
        action: newTrigger.action,
        enabled: true
      }
    ];
    
    onChange({ triggers: updatedTriggers });
  };
  
  const handleRemoveTrigger = (triggerId: string) => {
    const updatedTriggers = triggers.filter((t: any) => t.id !== triggerId);
    onChange({ triggers: updatedTriggers });
  };
  
  const handleToggleTrigger = (triggerId: string) => {
    const updatedTriggers = triggers.map((t: any) => 
      t.id === triggerId ? { ...t, enabled: !t.enabled } : t
    );
    onChange({ triggers: updatedTriggers });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Challenge Automatisierung</h2>
      <p className="text-muted-foreground mb-6">
        Erstelle Trigger, die automatisch ausgelöst werden, wenn bestimmte Bedingungen erfüllt sind
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <TriggerIntegration onTriggerSelect={handleAddTrigger} challengeData={data} />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Hinzugefügte Trigger</h3>
          
          {triggers.length === 0 ? (
            <Card className="border border-gray-700 bg-jillr-dark/50">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  Keine Trigger hinzugefügt. Füge deinen ersten Trigger hinzu, um automatische Aktionen zu definieren.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {triggers.map((trigger: any) => (
                <Card key={trigger.id} className={`border ${trigger.enabled ? 'border-jillr-neonPurple/40' : 'border-gray-700'}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant={trigger.enabled ? "default" : "outline"} className="mb-2">
                          {trigger.enabled ? 'Aktiv' : 'Inaktiv'}
                        </Badge>
                        <div className="space-y-1">
                          <p className="font-medium">{getConditionLabel(trigger.condition)}</p>
                          <p className="text-sm text-muted-foreground">{getActionLabel(trigger.action)}</p>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveTrigger(trigger.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutomationTab;
