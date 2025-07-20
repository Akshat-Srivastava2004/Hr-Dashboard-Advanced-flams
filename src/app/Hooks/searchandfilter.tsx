"use client"
import { useState, useMemo } from "react"
interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  rating: number
}

export function useSearchAndFilter(users: User[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])


  const availableDepartments = useMemo(() => {
    const departments = users.map((user) => user.department)
    return [...new Set(departments)].sort()
  }, [users])


  const availableRatings = [1, 2, 3, 4, 5]


  const filteredUsers = useMemo(() => {
    let filtered = users


    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
        const email = user.email.toLowerCase()
        const department = user.department.toLowerCase()

        return fullName.includes(query) || email.includes(query) || department.includes(query)
      })
    }


    if (selectedDepartments.length > 0) {
      filtered = filtered.filter((user) => selectedDepartments.includes(user.department))
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((user) => selectedRatings.includes(user.rating))
    }

    return filtered
  }, [users, searchQuery, selectedDepartments, selectedRatings])


  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedDepartments([])
    setSelectedRatings([])
  }

  const toggleDepartment = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department) ? prev.filter((d) => d !== department) : [...prev, department],
    )
  }

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedDepartments,
    selectedRatings,
    availableDepartments,
    availableRatings,
    filteredUsers,
    clearAllFilters,
    toggleDepartment,
    toggleRating,
  }
}
