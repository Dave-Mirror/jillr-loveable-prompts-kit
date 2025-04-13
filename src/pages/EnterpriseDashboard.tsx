
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ChallengeBuilder from '@/components/brand/ChallengeBuilder';
import KpiDashboard from '@/components/brand/KpiDashboard';
import NotificationCenter from '@/components/brand/NotificationCenter';
import ApiConnections from '@/components/brand/ApiConnections';
import { 
  ChartBarIcon, 
  BellIcon, 
  CogIcon, 
  UserGroupIcon,
  PlusCircle,
  Building,
  Palette,
  Video,
  Tag,
  Map,
  PackageOpen
} from 'lucide-react';

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
          // If no profile exists, we'll create one
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
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jillr-neonPurple"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Enterprise Dashboard</h1>
          <p className="text-muted-foreground">
            {enterpriseProfile?.company_name || "Manage your campaigns and analyze their performance"}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button onClick={() => setActiveTab("settings")} variant="outline">
            <CogIcon className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button onClick={() => setActiveTab("newCampaign")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <TabsTrigger value="dashboard" className="flex items-center">
            <ChartBarIcon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Campaigns</span>
          </TabsTrigger>
          <TabsTrigger value="easterEggs" className="flex items-center">
            <Map className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Easter Eggs</span>
          </TabsTrigger>
          <TabsTrigger value="influencers" className="flex items-center">
            <UserGroupIcon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Influencers</span>
          </TabsTrigger>
          <TabsTrigger value="newCampaign" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Create</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <KpiDashboard />
            </div>
            <div>
              <NotificationCenter />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Campaigns</CardTitle>
                <CardDescription>Manage all your active and upcoming campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No campaigns yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Get started by creating your first challenge or campaign
                  </p>
                  <Button onClick={() => setActiveTab("newCampaign")} className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="easterEggs">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Easter Eggs & Product Drops</CardTitle>
                <CardDescription>Manage location-based challenges and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <Map className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No Easter Eggs yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Create your first Easter Egg or product drop on the live map
                  </p>
                  <Button onClick={() => setActiveTab("newCampaign")} className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Easter Egg
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="influencers">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Influencer Collaborations</CardTitle>
                <CardDescription>Manage your creators and influencer relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <UserGroupIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No collaborations yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Connect with influencers to amplify your campaigns
                  </p>
                  <Button className="mt-4">
                    <UserGroupIcon className="mr-2 h-4 w-4" />
                    Find Influencers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="newCampaign">
          <ChallengeBuilder />
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Profile</CardTitle>
                  <CardDescription>Update your brand information and settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md" 
                        value={enterpriseProfile?.company_name || ""}
                        onChange={(e) => setEnterpriseProfile({
                          ...enterpriseProfile,
                          company_name: e.target.value
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Logo URL</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md" 
                        value={enterpriseProfile?.logo_url || ""}
                        onChange={(e) => setEnterpriseProfile({
                          ...enterpriseProfile,
                          logo_url: e.target.value
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Brand Color</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          className="h-10 w-10 rounded-md cursor-pointer"
                          value={enterpriseProfile?.branding_colors?.primary || "#9b87f5"}
                          onChange={(e) => setEnterpriseProfile({
                            ...enterpriseProfile,
                            branding_colors: {
                              ...enterpriseProfile?.branding_colors,
                              primary: e.target.value
                            }
                          })}
                        />
                        <span>{enterpriseProfile?.branding_colors?.primary || "#9b87f5"}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Secondary Brand Color</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          className="h-10 w-10 rounded-md cursor-pointer"
                          value={enterpriseProfile?.branding_colors?.secondary || "#7E69AB"}
                          onChange={(e) => setEnterpriseProfile({
                            ...enterpriseProfile,
                            branding_colors: {
                              ...enterpriseProfile?.branding_colors,
                              secondary: e.target.value
                            }
                          })}
                        />
                        <span>{enterpriseProfile?.branding_colors?.secondary || "#7E69AB"}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Button onClick={() => handleUpdateProfile(enterpriseProfile)}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <ApiConnections />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseDashboard;
