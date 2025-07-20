"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Award, Target, Clock } from "lucide-react"

interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  rating: number
  phone: string
  address: string
  bio: string
  joinDate: string
  position: string
}

interface OverviewTabProps {
  employee: Employee
}

// Generate performance history
function generatePerformanceHistory(employeeId: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const history = []

  for (let i = 0; i < 6; i++) {
    const monthIndex = (new Date().getMonth() - i + 12) % 12
    const rating = Math.floor(Math.random() * 2) + 3 + (employeeId % 2) // 3-5 range
    history.unshift({
      month: months[monthIndex],
      rating: rating,
      score: rating * 20, // Convert to percentage
    })
  }

  return history
}

export function OverviewTab({ employee }: OverviewTabProps) {
  const performanceHistory = generatePerformanceHistory(employee.id)
  const currentScore = employee.rating * 20

  // Generate some stats
  const stats = [
    {
      label: "Projects Completed",
      value: Math.floor(Math.random() * 15) + 5,
      icon: Target,
      color: "text-blue-600",
    },
    {
      label: "Team Collaborations",
      value: Math.floor(Math.random() * 20) + 10,
      icon: Award,
      color: "text-green-600",
    },
    {
      label: "Hours This Month",
      value: Math.floor(Math.random() * 40) + 120,
      icon: Clock,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Bio Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{employee.bio}</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance History */}
      <Card>
        <CardHeader>
          <CardTitle>Performance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Current Performance Score</span>
              <Badge variant="secondary">{currentScore}%</Badge>
            </div>
            <Progress value={currentScore} className="h-2" />

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Last 6 Months</h4>
              <div className="space-y-3">
                {performanceHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.month}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={item.score} className="w-20 h-2" />
                      <span className="text-sm font-medium w-12">{item.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
