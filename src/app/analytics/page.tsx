"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart3, TrendingUp, Users, Star } from "lucide-react"
import { DepartmentChart } from "@/components/charts/department"
import { PerformanceOverviewChart } from "@/components/charts/performanceoverview"
import { BookmarkTrendsChart } from "@/components/charts/bookmarks"


interface DepartmentData {
  department: string
  averageRating: number
  employeeCount: number
  totalRating: number
}

interface BookmarkTrend {
  month: string
  bookmarks: number
  promotions: number
  projects: number
}

interface PerformanceData {
  rating: string
  count: number
  percentage: number
}

interface TopDepartment {
  department: string
  averageRating: number
  employeeCount: number
  totalRating: number
}

interface Analytics {
  totalBookmarks: number
  topDepartment: TopDepartment
  departmentData: DepartmentData[]
  bookmarkTrends: BookmarkTrend[]
  performanceData: PerformanceData[]
  totalEmployees: number
  averageRating: number
}


function generateAnalyticsData(): Analytics {
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Design"]

  const departmentData: DepartmentData[] = departments.map((department) => {
    const averageRating = Math.round((Math.random() * 2 + 3) * 10) / 10 // Generates 3.0 to 5.0
    const employeeCount = Math.floor(Math.random() * 15) + 5 // Between 5 and 20
    const totalRating = averageRating * employeeCount

    return { department, averageRating, employeeCount, totalRating }
  })

  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const bookmarkTrends: BookmarkTrend[] = months.map((month, index) => ({
    month,
    bookmarks: Math.floor(Math.random() * 20) + 10 + index * 2,
    promotions: Math.floor(Math.random() * 8) + 2,
    projects: Math.floor(Math.random() * 12) + 5,
  }))

  const performanceData: PerformanceData[] = [
    { rating: "5 Stars", count: Math.floor(Math.random() * 15) + 10, percentage: 0 },
    { rating: "4 Stars", count: Math.floor(Math.random() * 20) + 15, percentage: 0 },
    { rating: "3 Stars", count: Math.floor(Math.random() * 15) + 8, percentage: 0 },
    { rating: "2 Stars", count: Math.floor(Math.random() * 8) + 3, percentage: 0 },
    { rating: "1 Star", count: Math.floor(Math.random() * 5) + 1, percentage: 0 },
  ]

  const totalEmployees = performanceData.reduce((sum, item) => sum + item.count, 0)
  performanceData.forEach((item) => {
    item.percentage = Math.round((item.count / totalEmployees) * 100)
  })

  const averageRating = departmentData.reduce((sum, dept) => sum + dept.averageRating, 0) / departmentData.length
  const topDepartment = departmentData.reduce((prev, current) =>
    prev.averageRating > current.averageRating ? prev : current
  )
  const totalBookmarks = bookmarkTrends[bookmarkTrends.length - 1].bookmarks

  return {
    departmentData,
    bookmarkTrends,
    performanceData,
    totalEmployees,
    averageRating,
    totalBookmarks,
    topDepartment,
  }
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [analyticsData, setAnalyticsData] = useState<Analytics | null>(null)

  useEffect(() => {
   
    setTimeout(() => {
      setAnalyticsData(generateAnalyticsData())
    }, 1000)
  }, [])

  if (!analyticsData) {
    return <div>Loading analytics...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                HR Analytics
              </h1>
              <p className="text-gray-600 mt-1">Insights and trends for your team performance</p>
            </div>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Analytics content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Employees</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.totalEmployees}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.averageRating.toFixed(1)}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookmarks</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.totalBookmarks}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Top Department</p>
                  <p className="text-lg font-bold text-gray-900">{analyticsData.topDepartment.department}</p>
                  <Badge variant="secondary" className="mt-1">
                    {analyticsData.topDepartment.averageRating.toFixed(1)} ⭐
                  </Badge>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <p className="text-sm text-gray-600">Average ratings by department</p>
            </CardHeader>
            <CardContent>
              <DepartmentChart data={analyticsData.departmentData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bookmark Trends</CardTitle>
              <p className="text-sm text-gray-600">Employee bookmarks and actions over time</p>
            </CardHeader>
            <CardContent>
              <BookmarkTrendsChart data={analyticsData.bookmarkTrends} />
            </CardContent>
          </Card>
        </div>

        {/* Performance distribution chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
            <p className="text-sm text-gray-600">How employees are performing across rating levels</p>
          </CardHeader>
          <CardContent>
            <PerformanceOverviewChart data={analyticsData.performanceData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
