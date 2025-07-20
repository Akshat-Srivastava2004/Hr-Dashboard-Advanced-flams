"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PerformanceData {
  rating: string
  count: number
  percentage: number
}

interface PerformanceOverviewChartProps {
  data: PerformanceData[]
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#6b7280"]

export function PerformanceOverviewChart({ data }: PerformanceOverviewChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="h-[300px]">
        <ChartContainer
          config={{
            count: {
              label: "Employees",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ rating, percentage }) => `${rating}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`${value} employees`, "Count"]} />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Performance Breakdown</h4>
        {data.map((item, index) => (
          <div key={item.rating} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="font-medium">{item.rating}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold">{item.count} employees</p>
              <p className="text-sm text-gray-600">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
