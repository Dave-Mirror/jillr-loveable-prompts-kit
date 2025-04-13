
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for UGC utilization
const ugcData = [
  { name: 'Downloaded', value: 400 },
  { name: 'Used in Ads', value: 300 },
  { name: 'Shared on Social', value: 300 },
  { name: 'Unused', value: 200 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const UgcUtilizationChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>UGC Utilization</CardTitle>
        <CardDescription>How user-generated content is being used</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ugcData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {ugcData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UgcUtilizationChart;
