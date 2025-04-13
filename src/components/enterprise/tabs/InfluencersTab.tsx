
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';

const InfluencersTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Influencer Collaborations</CardTitle>
          <CardDescription>Manage your creators and influencer relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No collaborations yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect with influencers to amplify your campaigns
            </p>
            <Button className="mt-4">
              <Users className="mr-2 h-4 w-4" />
              Find Influencers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfluencersTab;
