
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { whenOptions, thenOptions } from '@/components/hypocampus/config/triggerOptions';
import { Zap, Sparkles } from 'lucide-react';

interface TriggerIntegrationProps {
  onTriggerSelect: (trigger: {condition: string, action: string}) => void;
  challengeData: any;
}

const TriggerIntegration: React.FC<TriggerIntegrationProps> = ({ onTriggerSelect, challengeData }) => {
  const [triggerCondition, setTriggerCondition] = useState('');
  const [triggerAction, setTriggerAction] = useState('');
  const [activeTab, setActiveTab] = useState('simple');
  const { toast } = useToast();

  const handleAddTrigger = () => {
    if (!triggerCondition || !triggerAction) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte wähle eine Bedingung und eine Aktion aus.",
        variant: "destructive",
      });
      return;
    }

    onTriggerSelect({
      condition: triggerCondition,
      action: triggerAction
    });

    toast({
      title: "Trigger hinzugefügt",
      description: "Der Trigger wurde erfolgreich zur Challenge hinzugefügt.",
    });

    // Reset selections
    setTriggerCondition('');
    setTriggerAction('');
  };

  return (
    <Card className="border border-jillr-neonPurple/30 bg-jillr-dark/80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5 text-jillr-neonPurple" />
          Challenge Automatisierung
        </CardTitle>
        <CardDescription>
          Verbinde diese Challenge mit automatischen Auslösern und Belohnungen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="w-full">
            <TabsTrigger value="simple">Einfach</TabsTrigger>
            <TabsTrigger value="advanced">Erweitert</TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-4 pt-3">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">WENN...</h3>
              <Select value={triggerCondition} onValueChange={setTriggerCondition}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wähle eine Bedingung" />
                </SelectTrigger>
                <SelectContent>
                  {whenOptions.slice(0, 8).map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">DANN...</h3>
              <Select value={triggerAction} onValueChange={setTriggerAction}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wähle eine Aktion" />
                </SelectTrigger>
                <SelectContent>
                  {thenOptions.slice(0, 5).map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="pt-3">
            <div className="p-6 text-center border border-dashed border-gray-600 rounded-md bg-jillr-dark/50">
              <Sparkles className="h-10 w-10 text-jillr-neonPurple mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Erweiterte Automatisierung</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Erstelle komplexe Automatisierungsabläufe mit mehreren Bedingungen und Aktionen
              </p>
              <Button variant="outline" className="border-jillr-neonPurple/50 text-jillr-neonPurple">
                Zum Hypocampus Editor
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Button 
          onClick={handleAddTrigger} 
          disabled={!triggerCondition || !triggerAction}
          className="w-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonBlue"
        >
          <Zap className="mr-2 h-4 w-4" />
          Trigger hinzufügen
        </Button>
      </CardContent>
    </Card>
  );
};

export default TriggerIntegration;
