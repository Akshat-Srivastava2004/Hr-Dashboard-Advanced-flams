"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  return (
    <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Dashboard
    </Button>
  )
}
