
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const DataExportSection: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExportData = async () => {
    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Bitte melde dich an, um deine Daten herunterzuladen.",
        variant: "destructive"
      });
      return;
    }
    
    setIsExporting(true);
    
    try {
      // This would connect to a real export endpoint in production
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Datenexport erfolgreich",
        description: "Deine Daten wurden erfolgreich exportiert und zum Download bereitgestellt.",
      });
      
      // Simulate download
      const dummyData = {
        userId: user.id,
        email: user.email,
        permissions: {
          location: true,
          tracking: false,
          ugc: true,
          activity: false
        },
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(dummyData, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jillr-meine-daten.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Fehler beim Datenexport",
        description: "Deine Daten konnten nicht exportiert werden. Bitte versuche es später erneut.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleRevokeAll = () => {
    toast({
      title: "Hinweis",
      description: "Diese Funktion wird in Kürze verfügbar sein. Du kannst deine Datenfreigaben einzeln widerrufen.",
      variant: "default"
    });
  };
  
  return (
    <div className="mt-8 border-t pt-6 border-gray-800">
      <h3 className="text-lg font-semibold mb-4">Datenschutz & Kontrolle</h3>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleExportData}
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Wird exportiert..." : "Meine Daten herunterladen"}
        </Button>
        
        <Button 
          variant="outline" 
          className="flex-1 border-yellow-600 text-yellow-500 hover:text-yellow-400"
          onClick={handleRevokeAll}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Alle Freigaben widerrufen
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Nach DSGVO hast du das Recht, deine Daten einzusehen, zu exportieren und alle Freigaben zu widerrufen.
        Bei Widerruf von Freigaben werden entsprechende XP-Belohnungen zurückgesetzt.
      </p>
    </div>
  );
};

export default DataExportSection;
