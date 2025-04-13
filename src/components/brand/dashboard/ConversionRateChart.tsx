
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for conversion rate trend
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

const ConversionRateChart = () => {
  return (
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
  );
};

export default ConversionRateChart;
