
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const ApiUsageCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <CardTitle>API Usage & Limits</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Shopify API Calls</span>
              <span>2,450 / 10,000</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-jillr-neonGreen h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>TikTok API Calls</span>
              <span>1,280 / 5,000</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-jillr-neonPurple h-2 rounded-full" style={{ width: '26%' }}></div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            API usage resets in 16 days. Need more? <Button variant="link" className="p-0 h-auto text-jillr-neonPurple">Upgrade your plan</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiUsageCard;
