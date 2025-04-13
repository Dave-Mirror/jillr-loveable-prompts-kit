
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageOpen, PlusCircle } from 'lucide-react';

interface CampaignsTabProps {
  setActiveTab: (tab: string) => void;
}

const CampaignsTab = ({ setActiveTab }: CampaignsTabProps) => {
  return (
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
  );
};

export default CampaignsTab;
