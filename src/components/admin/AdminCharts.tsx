
import React from 'react';
import LineChart from '@/components/admin/LineChart';

interface ChartData {
  month: string;
  revenue?: number;
  users?: number;
  completed?: number;
  canceled?: number;
}

interface AdminChartsProps {
  revenueData: ChartData[];
  sessionsData: ChartData[];
}

const AdminCharts = ({ revenueData, sessionsData }: AdminChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LineChart
        data={revenueData}
        title="Revenue & User Growth"
        xAxisDataKey="month"
        lines={[
          { dataKey: "revenue", stroke: "#3b82f6", name: "Revenue ($)" },
          { dataKey: "users", stroke: "#10b981", name: "New Users" }
        ]}
      />
      <LineChart
        data={sessionsData}
        title="Session Statistics"
        xAxisDataKey="month"
        lines={[
          { dataKey: "completed", stroke: "#3b82f6", name: "Completed Sessions" },
          { dataKey: "canceled", stroke: "#ef4444", name: "Canceled Sessions" }
        ]}
      />
    </div>
  );
};

export default AdminCharts;
