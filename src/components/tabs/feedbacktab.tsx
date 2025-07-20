"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, ThumbsUp, User } from "lucide-react"

interface FeedbackTabProps {
  employeeId: number
}

// Generate mock feedback
function generateFeedback(employeeId: number) {
  const feedbackTypes = ["peer", "manager", "client", "self"]
  const comments = [
    "Excellent work on the recent project. Shows great attention to detail and meets all deadlines consistently.",
    "Strong team player with excellent communication skills. Always willing to help colleagues when needed.",
    "Demonstrates leadership qualities and takes initiative on challenging tasks. Very reliable team member.",
    "Creative problem solver with innovative approaches to complex challenges. Great asset to the team.",
    "Professional attitude and strong work ethic. Consistently delivers high-quality results.",
    "Good collaboration skills and positive attitude. Contributes well to team discussions and planning.",
  ]

  const reviewers = ["Sarah Johnson", "Mike Chen", "Emily Davis", "Alex Rodriguez", "Lisa Thompson", "David Wilson"]

  const feedback = []

  for (let i = 0; i < 6; i++) {
    const rating = Math.floor(Math.random() * 2) + 4 // 4-5 stars
    const type = feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)]

    feedback.push({
      id: i + 1,
      reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
      type,
      rating,
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
      helpful: Math.floor(Math.random() * 10) + 1,
    })
  }

  return feedback.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function FeedbackTab({ employeeId }: FeedbackTabProps) {
  const feedback = generateFeedback(employeeId)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      peer: "bg-blue-100 text-blue-800",
      manager: "bg-purple-100 text-purple-800",
      client: "bg-green-100 text-green-800",
      self: "bg-gray-100 text-gray-800",
    }

    return (
      <Badge className={`${colors[type as keyof typeof colors]} border-0`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }

  // Calculate average rating
  const averageRating = feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Feedback Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{feedback.length}</p>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((feedback.filter((f) => f.rating >= 4).length / feedback.length) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Positive Feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Feedback</h3>

        {feedback.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.reviewer}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(item.type)}
                  <div className="flex items-center gap-1">{renderStars(item.rating)}</div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{item.comment}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ThumbsUp className="w-4 h-4" />
                <span>{item.helpful} people found this helpful</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
