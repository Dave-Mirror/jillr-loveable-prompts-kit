import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getEnterpriseProfile, createEnterpriseProfile, updateEnterpriseProfile } from '@/utils/enterprise/mockProfiles';

// Imported components
import EnterpriseHeader from '@/components/enterprise/EnterpriseHeader';
import TabsHeader from '@/components/enterprise/TabsHeader';
import DashboardTab from '@/components/enterprise/tabs/DashboardTab';
import CampaignsTab from '@/components/enterprise/tabs/CampaignsTab';
import EasterEggsTab from '@/components/enterprise/tabs/EasterEggsTab';
import InfluencersTab from '@/components/enterprise/tabs/InfluencersTab';
import SettingsTab from '@/components/enterprise/tabs/SettingsTab';
import EnterpriseLoader from '@/components/enterprise/EnterpriseLoader';

const EnterpriseDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [enterpriseProfile, setEnterpriseProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchEnterpriseProfile() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await getEnterpriseProfile(user.id);
        
        if (error) {
          const newProfile = {
            user_id: user.id,
            company_name: 'My Brand',
            branding_colors: {
              primary: '#9b87f5',
              secondary: '#7E69AB'
            },
            industry: ['Marketing'],
            hashtags: []
          };
          
          const { data: newData, error: createError } = await createEnterpriseProfile(newProfile);
              
          if (createError) {
            throw createError;
          }
          
          setEnterpriseProfile(newData);
          toast({
            title: "Profile created",
            description: "Your enterprise profile has been initialized. Please update your information.",
          });
        } else {
          setEnterpriseProfile(data);
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load enterprise profile: " + error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchEnterpriseProfile();
  }, [user, toast]);
  
  const handleUpdateProfile = async (updatedData: any) => {
    if (!enterpriseProfile) return;
    
    try {
      const { error } = await updateEnterpriseProfile(enterpriseProfile.id, updatedData);
        
      if (error) throw error;
      
      setEnterpriseProfile({...enterpriseProfile, ...updatedData});
      toast({
        title: "Profile updated",
        description: "Your enterprise profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <EnterpriseLoader />;
  }

  return (
    <div className="container py-8">
      <EnterpriseHeader 
        companyName={enterpriseProfile?.company_name} 
        setActiveTab={setActiveTab} 
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsHeader />

        <TabsContent value="dashboard">
          <DashboardTab />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignsTab setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="easterEggs">
          <EasterEggsTab setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="influencers">
          <InfluencersTab />
        </TabsContent>

        <TabsContent value="newCampaign">
          <div className="p-8 text-center bg-card rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Create New Campaign</h3>
            <p className="text-muted-foreground mb-6">
              Use our challenge editor to create a new marketing campaign for your audience.
            </p>
            <Link to="/challenge-editor">
              <Button className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
                Go to Challenge Editor
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab 
            enterpriseProfile={enterpriseProfile}
            setEnterpriseProfile={setEnterpriseProfile}
            handleUpdateProfile={handleUpdateProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseDashboard;
