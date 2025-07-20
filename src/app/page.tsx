"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { UserCard } from "@/components/ui/Usercard"
import { SearchAndFilters } from "@/components/ui/Searchandfilter"
import { useSearchAndFilter } from "./Hooks/searchandfilter"
import { Button } from "@/components/ui/button"
import Link from "next/link"
interface ApiUser {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  company: {
    department: string
  }
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  rating: number
}

interface ApiResponse {
  users: ApiUser[]
  total: number
  skip: number
  limit: number
}
const navItems = [
  { label: "Dashboard", route: "/" },
  { label: "Bookmarks", route: "/bookmarks" },
  { label: "Analytics", route: "/analytics" },
  { label: "Login", route: "/login" },
  { label: "Register", route: "/register" },

];


const sidebarIcons = [
  <svg key="icon1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>,
  <svg key="icon2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>,
  <svg key="icon3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>,
]


function getRandomDepartment() {
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Design"]
  return departments[Math.floor(Math.random() * departments.length)]
}

function getPerformanceRating() {
  return Math.floor(Math.random() * 5) + 1
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  const searchAndFilter = useSearchAndFilter(users)


  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://dummyjson.com/users?limit=20")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data: ApiResponse = await response.json()


        const usersWithExtras: User[] = data.users.map((user: ApiUser) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          department: user.company.department || getRandomDepartment(),
          rating: getPerformanceRating(),
        }))

        setUsers(usersWithExtras)
      } catch (err) {
        setError("Could not load employee data")
        console.error("Error fetching users:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="flex w-screen h-screen text-gray-400 bg-gray-900">

      <div className="flex flex-col items-center w-16 pb-4 overflow-auto border-r border-gray-800 text-gray-500">
        <SidebarIcon
          svg={
            <svg
              key="icon4"
              className="w-8 h-8 stroke-current text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          }
        />
        {sidebarIcons.map((icon, idx) => (
          <SidebarIcon key={idx} svg={icon} />
        ))}
        <div className="mt-auto">
          <SidebarIcon
            svg={
              <svg key="icon5" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>
      </div>


      <div className="flex flex-col w-56 border-r border-gray-800">
        <div className="relative group">
          <button className="text-sm focus:outline-none w-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800 hover:bg-gray-800">
              <span className="font-medium text-white">HR Portal</span>

            </div>
          </button>
        </div>

        <div className="flex flex-col flex-grow p-4 overflow-auto">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-800 transition-colors"
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex items-center h-16 px-8 border-b border-gray-800">
          <h1 className="text-lg font-medium text-white">Employee Dashboard</h1>
          <button className="h-10 px-4 ml-auto text-sm font-medium rounded hover:bg-gray-800">Export Data</button>
          <button className="h-10 px-4 ml-2 text-sm font-medium bg-gray-800 rounded hover:bg-gray-700">Add New</button>
        </div>


        <div className="flex-grow p-6 overflow-auto bg-gray-50">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-600">Loading employees...</div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-red-600">{error}</div>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Team Members</h2>
                <p className="text-gray-600">Manage your team and track performance</p>
              </div>

              <SearchAndFilters
                searchQuery={searchAndFilter.searchQuery}
                setSearchQuery={searchAndFilter.setSearchQuery}
                selectedDepartments={searchAndFilter.selectedDepartments}
                selectedRatings={searchAndFilter.selectedRatings}
                availableDepartments={searchAndFilter.availableDepartments}
                availableRatings={searchAndFilter.availableRatings}
                toggleDepartment={searchAndFilter.toggleDepartment}
                toggleRating={searchAndFilter.toggleRating}
                clearAllFilters={searchAndFilter.clearAllFilters}
                totalResults={searchAndFilter.filteredUsers.length}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchAndFilter.filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    name={`${user.firstName} ${user.lastName}`}
                    email={user.email}
                    age={user.age}
                    department={user.department}
                    rating={user.rating}
                  />
                ))}
              </div>

              {searchAndFilter.filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No employees match your search criteria</p>
                  <Button variant="outline" onClick={searchAndFilter.clearAllFilters} className="mt-4 bg-transparent">
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function SidebarIcon({ svg }: { svg: React.ReactNode }) {
  return (
    <a className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-800" href="#">
      {svg}
    </a>
  )
}
