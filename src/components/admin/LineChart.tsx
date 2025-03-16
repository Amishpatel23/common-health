
import React from 'react';
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: any[];
  title: string;
  xAxisDataKey: string;
  lines: {
    dataKey: string;
    stroke: string;
    name: string;
  }[];
  height?: number;
}

const LineChart = ({ data, title, xAxisDataKey, lines, height = 300 }: LineChartProps) => {
  return (
    <div className="bg-white dark:bg-black p-4 rounded-xl border border-border">
      <h3 className="text-base font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <Chart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted-foreground/20" />
          <XAxis 
            dataKey={xAxisDataKey} 
            className="text-xs text-muted-foreground" 
          />
          <YAxis className="text-xs text-muted-foreground" />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              fontSize: '0.8rem'
            }}
          />
          <Legend />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name}
              activeDot={{ r: 8 }}
            />
          ))}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
