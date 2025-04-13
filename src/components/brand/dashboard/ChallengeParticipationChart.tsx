
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for participation chart
const participationData = [
  { name: 'Dance Challenge', participants: 400, submissions: 240 },
  { name: 'Product Demo', participants: 300, submissions: 139 },
  { name: 'Tutorial', participants: 200, submissions: 98 },
  { name: 'Lifestyle', participants: 278, submissions: 210 },
];

const ChallengeParticipationChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenge Participation</CardTitle>
        <CardDescription>Participants vs. submissions by challenge type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={participationData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participants" fill="#8884d8" />
              <Bar dataKey="submissions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeParticipationChart;
