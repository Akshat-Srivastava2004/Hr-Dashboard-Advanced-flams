"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface ProjectsTabProps {
  employeeId: number
}

// Generate mock projects
function generateProjects(employeeId: number) {
  const projectNames = [
    "Website Redesign",
    "Mobile App Development",
    "Database Migration",
    "API Integration",
    "User Dashboard",
    "Marketing Campaign",
    "Sales Analytics",
    "Customer Portal",
    "Inventory System",
    "Payment Gateway",
  ]

  const statuses = ["completed", "in-progress", "planning"]
  const projects = []

  for (let i = 0; i < 5; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const progress =
      status === "completed"
        ? 100
        : status === "in-progress"
          ? Math.floor(Math.random() * 70) + 20
          : Math.floor(Math.random() * 30)

    projects.push({
      id: i + 1,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      status,
      progress,
      startDate: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      ).toLocaleDateString(),
      endDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
      teamSize: Math.floor(Math.random() * 8) + 2,
    })
  }

  return projects
}

export function ProjectsTab({ employeeId }: ProjectsTabProps) {
  const projects = generateProjects(employeeId)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "planning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      "in-progress": "bg-blue-100 text-blue-800",
      planning: "bg-yellow-100 text-yellow-800",
    }

    return (
      <Badge className={`${colors[status as keyof typeof colors]} border-0`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Current & Recent Projects</h3>
        <Badge variant="outline">{projects.length} Projects</Badge>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                {getStatusBadge(project.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Start: {project.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>End: {project.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{project.teamSize} team members</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
