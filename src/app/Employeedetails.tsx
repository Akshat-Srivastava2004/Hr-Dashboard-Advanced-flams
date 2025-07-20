"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react"
import { OverviewTab } from "@/components/tabs/overviewtab"
import { FeedbackTab } from "@/components/tabs/feedbacktab"
import { ProjectsTab } from "@/components/tabs/projectstab"

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

interface EmployeeDetailsProps {
  employee: Employee
}

export function EmployeeDetails({ employee }: EmployeeDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "feedback", label: "Feedback" },
  ]

  const getBadgeColor = (rating: number) => {
    if (rating >= 4) return "bg-green-100 text-green-800"
    if (rating >= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-500 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab employee={employee} />
      case "projects":
        return <ProjectsTab employeeId={employee.id} />
      case "feedback":
        return <FeedbackTab employeeId={employee.id} />
      default:
        return <OverviewTab employee={employee} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {employee.firstName[0]}
                {employee.lastName[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {employee.firstName} {employee.lastName}
                </h1>
                <p className="text-lg text-gray-600 mb-2">{employee.position}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {employee.department}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {employee.joinDate}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-2">
                {renderStars(employee.rating)}
                <span className="text-sm text-gray-600">({employee.rating}/5)</span>
              </div>
              <Badge className={`${getBadgeColor(employee.rating)} border-0`}>
                {employee.rating >= 4 ? "Excellent" : employee.rating >= 3 ? "Good" : "Needs Improvement"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{employee.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{employee.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{employee.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <div className="flex space-x-1 border-b">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-b-none ${activeTab === tab.id ? "border-b-2 border-blue-500" : "border-b-2 border-transparent"
                  }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-6">{renderTabContent()}</CardContent>
      </Card>
    </div>
  )
}
