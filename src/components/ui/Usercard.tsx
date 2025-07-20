import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Bookmark, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useBookmarks } from "@/app/Context/usebookmarks"
export interface UserCardProps {
  id?: number
  name: string
  email: string
  age: number
  department: string
  rating: number
}

export function UserCard({ id, name, email, age, department, rating }: UserCardProps) {
 const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()

 console.log("the id is ",id);
 console.log("the name is ",name)

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  function letsgototheemployepage(id:number){
        console.log("the id is from the employee is ",id);
  }
  
  const handleBookmarkToggle = () => {
    if (!id) return

    if (isBookmarked(id)) {
      removeBookmark(id)
    } else {
      addBookmark({
        id,
        name,
        email,
        department,
        rating,
      })
    }
  }

  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">{email}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Age:</span>
          <span className="font-medium text-gray-900">{age}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Department:</span>
          <span className="font-medium text-gray-900">{department}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Performance:</span>
          <div className="flex items-center gap-1">
            {renderStars()}
            <span className="ml-1 text-xs text-gray-500">({rating}/5)</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 justify-between">
        {id ? (
          <Link href={`/employeewithid/${id}`} className="flex-1">
            <Button variant="default" size="sm" className="w-full" onClick={()=>letsgototheemployepage(id)}>
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </Link>
        ) : (
          <Button variant="default" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        )}
         <Button
          variant={id && isBookmarked(id) ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={handleBookmarkToggle}
        >
          <Bookmark className={`w-4 h-4 mr-1 ${id && isBookmarked(id) ? "fill-current" : ""}`} />
          {id && isBookmarked(id) ? "Saved" : "Save"}
        </Button>
        <Button variant="secondary" size="sm" className="flex-1">
          <TrendingUp className="w-4 h-4 mr-1" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  )
}
