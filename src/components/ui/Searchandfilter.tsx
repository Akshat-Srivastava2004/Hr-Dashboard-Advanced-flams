"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, ChevronDown } from "lucide-react"

interface SearchAndFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedDepartments: string[]
  selectedRatings: number[]
  availableDepartments: string[]
  availableRatings: number[]
  toggleDepartment: (department: string) => void
  toggleRating: (rating: number) => void
  clearAllFilters: () => void
  totalResults: number
}

export function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  selectedDepartments,
  selectedRatings,
  availableDepartments,
  availableRatings,
  toggleDepartment,
  toggleRating,
  clearAllFilters,
  totalResults,
}: SearchAndFiltersProps) {
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false)
  const [showRatingFilter, setShowRatingFilter] = useState(false)

  const hasActiveFilters = selectedDepartments.length > 0 || selectedRatings.length > 0 || searchQuery.trim()

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full max-w-md"
        />
      </div>

      {/* Filter Buttons and Active Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Department Filter */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowDepartmentFilter(!showDepartmentFilter)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Department
            {selectedDepartments.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedDepartments.length}
              </Badge>
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>

          {showDepartmentFilter && (
            <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-3 min-w-48 z-10">
              <div className="space-y-2">
                {availableDepartments.map((dept) => (
                  <label key={dept} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDepartments.includes(dept)}
                      onChange={() => toggleDepartment(dept)}
                      className="rounded"
                    />
                    <span className="text-sm">{dept}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowRatingFilter(!showRatingFilter)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Rating
            {selectedRatings.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedRatings.length}
              </Badge>
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>

          {showRatingFilter && (
            <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-3 min-w-32 z-10">
              <div className="space-y-2">
                {availableRatings.map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => toggleRating(rating)}
                      className="rounded"
                    />
                    <span className="text-sm">{rating} Stars</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearAllFilters} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}

        {/* Results Count */}
        <span className="text-sm text-gray-600 ml-auto">
          {totalResults} employee{totalResults !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Active Filter Tags */}
      {(selectedDepartments.length > 0 || selectedRatings.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedDepartments.map((dept) => (
            <Badge key={dept} variant="secondary" className="flex items-center gap-1">
              {dept}
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleDepartment(dept)} />
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge key={rating} variant="secondary" className="flex items-center gap-1">
              {rating} Stars
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleRating(rating)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
