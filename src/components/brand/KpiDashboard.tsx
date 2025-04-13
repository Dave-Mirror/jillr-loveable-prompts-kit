
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Eye, Upload, UserCheck, TrendingUp } from "lucide-react";

// Mock data for charts
const viewsData = [
  { name: 'Mon', views: 2400 },
  { name: 'Tue', views: 1398 },
  { name: 'Wed', views: 9800 },
  { name: 'Thu', views: 3908 },
  { name: 'Fri', views: 4800 },
  { name: 'Sat', views: 3800 },
  { name: 'Sun', views: 4300 },
];

const participationData = [
  { name: 'Dance Challenge', participants: 400, submissions: 240 },
  { name: 'Product Demo', participants: 300, submissions: 139 },
  { name: 'Tutorial', participants: 200, submissions: 98 },
  { name: 'Lifestyle', participants: 278, submissions: 210 },
];

const ugcData = [
  { name: 'Downloaded', value: 400 },
  { name: 'Used in Ads', value: 300 },
  { name: 'Shared on Social', value: 300 },
  { name: 'Unused', value: 200 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const conversionData = [
  { name: '1 May', rate: 4 },
  { name: '2 May', rate: 3 },
  { name: '3 May', rate: 2 },
  { name: '4 May', rate: 7 },
  { name: '5 May', rate: 5 },
  { name: '6 May', rate: 4 },
  { name: '7 May', rate: 9 },
  { name: '8 May', rate: 8 },
  { name: '9 May', rate: 6 },
  { name: '10 May', rate: 11 },
];

const KpiDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <CardDescription>Across all challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">24,532</span>
            </div>
            <div className="text-xs text-muted-foreground">
              +12.3% from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <CardDescription>Videos uploaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Upload className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">687</span>
            </div>
            <div className="text-xs text-muted-foreground">
              +5.2% from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <CardDescription>Unique users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCheck className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">1,178</span>
            </div>
            <div className="text-xs text-muted-foreground">
              +8.7% from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <CardDescription>Shop visits to purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-2xl font-bold">6.8%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              +1.2% from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Challenge Views</CardTitle>
            <CardDescription>Daily view count over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={viewsData}
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
                  <Bar dataKey="views" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Trend</CardTitle>
            <CardDescription>Shop visits to purchase percentage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={conversionData}
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
                  <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KpiDashboard;
