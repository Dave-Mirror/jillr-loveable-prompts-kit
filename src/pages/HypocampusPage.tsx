
import React, { useState } from 'react';
import TriggerConfigurator from '@/components/hypocampus/TriggerConfigurator';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import TriggerRewardHistory from '@/components/hypocampus/TriggerRewardHistory';
import HypocampusAnalytics from '@/components/hypocampus/HypocampusAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Settings, Download, Share, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HypocampusPage: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'personal' | 'brand'>('personal');

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Hypocampus-System</h1>
          <p className="text-gray-400">
            Definiere und verwalte kontextbasierte Trigger, die automatisch auf dein Verhalten reagieren
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Hypocampus ermöglicht es dir, automatische Aktionen auf Basis deiner Aktivitäten zu definieren.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {user && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings size={16} />
                    <span>Einstellungen</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-jillr-darkBlue border-jillr-border">
                  <DropdownMenuItem className="cursor-pointer">
                    <Download className="mr-2 h-4 w-4" />
                    <span>Alle Trigger exportieren</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Share className="mr-2 h-4 w-4" />
                    <span>Trigger teilen</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {user.email?.includes('brand') && (
                <div className="flex border border-jillr-border rounded-md overflow-hidden">
                  <Button 
                    variant={activeView === 'personal' ? 'default' : 'ghost'} 
                    onClick={() => setActiveView('personal')}
                    className="rounded-none"
                  >
                    Persönlich
                  </Button>
                  <Button 
                    variant={activeView === 'brand' ? 'default' : 'ghost'} 
                    onClick={() => setActiveView('brand')}
                    className="rounded-none"
                  >
                    Marke
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {!user ? (
        <div className="py-8 text-center bg-jillr-darkBlue/30 rounded-xl border border-jillr-border/20 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Willkommen im Hypocampus-System</h2>
          <p className="mb-6 max-w-lg mx-auto">
            Du kannst das Hypocampus-System ohne Anmeldung testen und erkunden.
            Für personalisierte Trigger und das Speichern deiner Einstellungen 
            empfehlen wir dir, dich anzumelden.
          </p>
          <Link to="/auth">
            <Button className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
              Anmelden für personalisierte Erfahrung
            </Button>
          </Link>
        </div>
      ) : null}
      
      <Tabs defaultValue="my-triggers" className="space-y-8">
        <TabsList className="w-full border-b border-gray-800 mb-4">
          <TabsTrigger value="my-triggers" className="flex-1">Meine Trigger</TabsTrigger>
          <TabsTrigger value="new-trigger" className="flex-1">Neuer Trigger</TabsTrigger>
          <TabsTrigger value="statistics" className="flex-1">Statistiken</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-triggers" className="pt-4">
          <TriggerDashboard userRole={activeView} />
        </TabsContent>
        
        <TabsContent value="new-trigger" className="pt-4">
          {user ? (
            <TriggerConfigurator triggerType={activeView} />
          ) : (
            <div className="p-6 text-center bg-jillr-darkBlue/30 rounded-xl border border-jillr-border/20">
              <h3 className="text-xl font-semibold mb-3">Neue Trigger erstellen</h3>
              <p className="mb-4">Erstelle personalisierte Trigger, die automatisch auf dein Verhalten reagieren.</p>
              <div className="bg-jillr-dark/50 p-4 rounded-lg max-w-2xl mx-auto mb-4">
                <h4 className="font-medium mb-2">Beispiel-Trigger:</h4>
                <p className="text-sm">WENN ich morgens die App öffne, DANN erhalte ich XP-Punkte</p>
                <p className="text-sm mt-1">WENN ich drei Tage in Folge aktiv bin, DANN erhalte ich eine Belohnung</p>
              </div>
              <Link to="/auth">
                <Button>Anmelden zum Erstellen</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="statistics" className="pt-4">
          {user ? (
            <TriggerRewardHistory />
          ) : (
            <div className="p-6 text-center bg-jillr-darkBlue/30 rounded-xl border border-jillr-border/20">
              <h3 className="text-xl font-semibold mb-3">Statistik-Übersicht</h3>
              <p className="mb-4">Verfolge deine Trigger-Aktivitäten und erhaltenen Belohnungen im Zeitverlauf.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-4">
                <div className="bg-jillr-dark/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Aktivierte Trigger</h4>
                  <p className="text-3xl font-bold text-jillr-neonPurple">--</p>
                  <p className="text-xs text-gray-400">Benötigt Anmeldung</p>
                </div>
                <div className="bg-jillr-dark/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Erhaltene Belohnungen</h4>
                  <p className="text-3xl font-bold text-jillr-neonGreen">--</p>
                  <p className="text-xs text-gray-400">Benötigt Anmeldung</p>
                </div>
                <div className="bg-jillr-dark/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Aktivitätsrate</h4>
                  <p className="text-3xl font-bold text-jillr-neonBlue">--</p>
                  <p className="text-xs text-gray-400">Benötigt Anmeldung</p>
                </div>
              </div>
              <Link to="/auth">
                <Button>Anmelden für Statistiken</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-4">
          <HypocampusAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HypocampusPage;
