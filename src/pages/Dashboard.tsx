
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import UnifiedDashboard from '@/components/dashboard/UnifiedDashboard';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Building2, BarChart2, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user, userProfile, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState('user');
  
  // Debug info
  useEffect(() => {
    console.log("Dashboard component - Auth state:", {
      isLoading,
      hasUser: !!user,
      userProfile
    });
    
    // Simulate successful loading for demonstration
    if (!user && !isLoading) {
      console.log("No user detected but proceeding for demo purposes");
    }
  }, [user, userProfile, isLoading]);

  // Set default role based on user profile
  useEffect(() => {
    if (user) {
      if (user.email?.includes('brand') || userProfile?.accountType === 'brand') {
        setSelectedRole('brand');
      } else if (userProfile?.isCreator) {
        setSelectedRole('creator');
      } else if (userProfile?.isEnterprise) {
        setSelectedRole('enterprise');
      }
    }
  }, [user, userProfile]);

  // Error handling
  useEffect(() => {
    if (error) {
      toast.error("Fehler beim Laden des Dashboards", {
        description: error
      });
    }
  }, [error]);
  
  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl mb-4">Dashboard wird geladen...</h2>
            <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Always render the dashboard, even if user is not logged in (for demo purposes)
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Verwalte deine Aktivitäten und Inhalte</p>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-64">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Rolle auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Nutzer</span>
                </div>
              </SelectItem>
              <SelectItem value="creator" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Creator</span>
                </div>
              </SelectItem>
              <SelectItem value="brand" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span>Brand</span>
                </div>
              </SelectItem>
              <SelectItem value="enterprise" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Enterprise</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <UnifiedDashboard initialActiveTab={selectedRole} />
    </div>
  );
};

export default Dashboard;
