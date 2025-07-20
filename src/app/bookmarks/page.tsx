"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useBookmarks } from "../Context/usebookmarks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, Trash2, MoreVertical, TrendingUp, FolderPlus, ArrowLeft, Bookmark } from "lucide-react"
import toast from "react-hot-toast"


export default function BookmarksPage() {
  const router = useRouter()
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmarks()
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([])

  const renderStars = (rating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const isFilled = i < rating;

      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${isFilled ? "text-yellow-500 fill-yellow-400" : "text-gray-300"
            }`}
        />
      );
    }

    return stars;
  };

  const handleemployee = (employeeId: number) => {
    setSelectedEmployees((prevSelected) => {
      const alreadySelected = prevSelected.includes(employeeId);

      if (alreadySelected) {

        return prevSelected.filter((id) => id !== employeeId);
      } else {

        return [...prevSelected, employeeId];
      }
    });
  };

  const handleallaction = (action: string) => {


    const count = selectedEmployees.length;


    toast.success(`${action} action triggered for ${count} employees`);


    setSelectedEmployees([]);
  };

  const handlepromotebutton = (employeeName: string) => {
    toast.success(`Promote action triggered for ${employeeName}`)
  }

  const handleassignproject = (employeeName: string) => {
    toast.success(`Assign to Project action triggered for ${employeeName}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Bookmark className="w-8 h-8 text-blue-600" />
                Bookmarked Employees
              </h1>
              <p className="text-gray-600 mt-1">Manage your saved employees and take actions</p>
            </div>
            {bookmarks.length > 0 && (
              <div className="flex items-center gap-3">
                {selectedEmployees.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{selectedEmployees.length} selected</Badge>
                    <Button variant="outline" size="sm" onClick={() => handleallaction("Promote")}>
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Bulk Promote
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleallaction("Assign Project")}>
                      <FolderPlus className="w-4 h-4 mr-1" />
                      Bulk Assign
                    </Button>
                  </div>
                )}
                <Button variant="destructive" size="sm" onClick={clearAllBookmarks}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {bookmarks.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookmarked Employees</h3>
              <p className="text-gray-600 mb-6">Start bookmarking employees from the dashboard to see them here.</p>
              <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {bookmarks.length} employee{bookmarks.length !== 1 ? "s" : ""} bookmarked
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((employee) => (
                <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => handleemployee(employee.id)}
                          className="rounded"
                        />
                        <div>
                          <CardTitle className="text-lg">{employee.name}</CardTitle>
                          <p className="text-sm text-gray-600">{employee.email}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/employee/${employee.id}`)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlepromotebutton(employee.name)}>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Promote
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleassignproject(employee.name)}>
                            <FolderPlus className="w-4 h-4 mr-2" />
                            Assign to Project
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => removeBookmark(employee.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Bookmark
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Department:</span>
                      <Badge variant="outline">{employee.department}</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Performance:</span>
                      <div className="flex items-center gap-1">
                        {renderStars(employee.rating)}
                        <span className="text-xs text-gray-500 ml-1">({employee.rating}/5)</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bookmarked:</span>
                      <span className="text-xs text-gray-500">
                        {new Date(employee.bookmarkedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-3 border-t">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() => handlepromotebutton(employee.name)}
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Promote
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleassignproject(employee.name)}
                      >
                        <FolderPlus className="w-4 h-4 mr-1" />
                        Assign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
