
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, PlusCircle } from 'lucide-react';

interface EasterEggsTabProps {
  setActiveTab: (tab: string) => void;
}

const EasterEggsTab = ({ setActiveTab }: EasterEggsTabProps) => {
  return (
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
  );
};

export default EasterEggsTab;
