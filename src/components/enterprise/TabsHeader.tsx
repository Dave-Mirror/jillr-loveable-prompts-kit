
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartBarIcon, 
  Video,
  Map,
  Users,
  PlusCircle
} from 'lucide-react';

const TabsHeader = () => {
  return (
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
        <Users className="mr-2 h-4 w-4" />
        <span className="hidden md:inline">Influencers</span>
      </TabsTrigger>
      <TabsTrigger value="newCampaign" className="flex items-center">
        <PlusCircle className="mr-2 h-4 w-4" />
        <span className="hidden md:inline">Create</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsHeader;
