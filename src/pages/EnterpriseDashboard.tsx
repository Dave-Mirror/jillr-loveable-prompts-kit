
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ChallengeBuilder from '@/components/brand/ChallengeBuilder';

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
        const { data, error } = await supabase
          .from('enterprise_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
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
            
            const { data: newData, error: createError } = await supabase
              .from('enterprise_profiles')
              .insert(newProfile)
              .select()
              .single();
              
            if (createError) {
              throw createError;
            }
            
            setEnterpriseProfile(newData);
            toast({
              title: "Profile created",
              description: "Your enterprise profile has been initialized. Please update your information.",
            });
          } else {
            throw error;
          }
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
      const { error } = await supabase
        .from('enterprise_profiles')
        .update(updatedData)
        .eq('id', enterpriseProfile.id);
        
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
          <ChallengeBuilder />
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
