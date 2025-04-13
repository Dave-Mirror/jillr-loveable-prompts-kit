
import React from 'react';
import { Button } from "@/components/ui/button";
import { CogIcon, PlusCircle } from 'lucide-react';

interface EnterpriseHeaderProps {
  companyName: string;
  setActiveTab: (tab: string) => void;
}

const EnterpriseHeader = ({ companyName, setActiveTab }: EnterpriseHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Enterprise Dashboard</h1>
        <p className="text-muted-foreground">
          {companyName || "Manage your campaigns and analyze their performance"}
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
  );
};

export default EnterpriseHeader;
