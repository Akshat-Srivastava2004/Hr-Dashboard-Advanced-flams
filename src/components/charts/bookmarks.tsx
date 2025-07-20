"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BookmarkTrendData {
  month: string
  bookmarks: number
  promotions: number
  projects: number
}

interface BookmarkTrendsChartProps {
  data: BookmarkTrendData[]
}

export function BookmarkTrendsChart({ data }: BookmarkTrendsChartProps) {
  return (
    <ChartContainer
      config={{
        bookmarks: {
          label: "Bookmarks",
          color: "hsl(var(--chart-1))",
        },
        promotions: {
          label: "Promotions",
          color: "hsl(var(--chart-2))",
        },
        projects: {
          label: "Project Assignments",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="bookmarks" stroke="var(--color-bookmarks)" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="promotions" stroke="var(--color-promotions)" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="projects" stroke="var(--color-projects)" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
