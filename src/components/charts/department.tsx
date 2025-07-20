"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DepartmentData {
  department: string
  averageRating: number
  employeeCount: number
}

interface DepartmentChartProps {
  data: DepartmentData[]
}

export function DepartmentChart({ data }: DepartmentChartProps) {
  return (
    <ChartContainer
      config={{
        averageRating: {
          label: "Average Rating",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
          <YAxis domain={[0, 5]} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [`${value} stars`, name === "averageRating" ? "Average Rating" : name]}
              />
            }
          />
          <Bar dataKey="averageRating" fill="var(--color-averageRating)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
