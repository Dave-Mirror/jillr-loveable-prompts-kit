
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ApiConnections from '@/components/brand/ApiConnections';

interface SettingsTabProps {
  enterpriseProfile: any;
  setEnterpriseProfile: (profile: any) => void;
  handleUpdateProfile: (updatedData: any) => void;
}

const SettingsTab = ({ 
  enterpriseProfile, 
  setEnterpriseProfile, 
  handleUpdateProfile 
}: SettingsTabProps) => {
  return (
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
  );
};

export default SettingsTab;
