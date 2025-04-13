
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Upload, UserCheck, TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  description: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  description, 
  value, 
  change, 
  icon 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          {icon}
          <span className="text-2xl font-bold">{value}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {change}
        </div>
      </CardContent>
    </Card>
  );
};

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total Views"
        description="Across all challenges"
        value="24,532"
        change="+12.3% from last week"
        icon={<Eye className="mr-2 h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Submissions"
        description="Videos uploaded"
        value="687"
        change="+5.2% from last week"
        icon={<Upload className="mr-2 h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Participants"
        description="Unique users"
        value="1,178"
        change="+8.7% from last week"
        icon={<UserCheck className="mr-2 h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Conversion Rate"
        description="Shop visits to purchase"
        value="6.8%"
        change="+1.2% from last week"
        icon={<TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default StatsCards;
