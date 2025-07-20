import { notFound } from "next/navigation"
import { EmployeeDetails } from "@/app/Employeedetails"
import { BackButton } from "@/components/BackButton"
import type { User } from "@/app/page"

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

export async function generateStaticParams() {
  try {
    const res = await fetch("https://dummyjson.com/users?limit=30")
    const data = await res.json()
    return data.users.map((user: User) => ({
      id: user.id.toString(),
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return Array.from({ length: 30 }, (_, i) => ({ id: (i + 1).toString() }))
  }
}

function getRandomDepartment(userId: number): string {
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Design"]
  return departments[(userId * 13) % departments.length]
}

function getPerformanceRating(userId: number): number {
  return ((userId * 17) % 5) + 1
}

function getPositionForDepartment(dept: string, userId: number): string {
  const roles = {
    Engineering: ["Senior Developer", "Frontend Engineer", "Backend Developer", "DevOps Engineer"],
    Marketing: ["Marketing Manager", "Content Creator", "SEO Specialist", "Brand Manager"],
    Sales: ["Sales Representative", "Account Manager", "Sales Director", "Business Developer"],
    HR: ["HR Manager", "Recruiter", "HR Specialist", "People Operations"],
    Finance: ["Financial Analyst", "Accountant", "Finance Manager", "Budget Analyst"],
    Operations: ["Operations Manager", "Project Coordinator", "Process Analyst", "Operations Specialist"],
    Design: ["UI/UX Designer", "Graphic Designer", "Product Designer", "Creative Director"],
  }
  const departmentRoles = roles[dept as keyof typeof roles] || roles.Engineering
  return departmentRoles[(userId * 19) % departmentRoles.length]
}

function generateMockData(userId: number) {
  const bios = [
    "Passionate professional with a strong background in team collaboration and innovative problem-solving. Always eager to take on new challenges and contribute to company growth.",
    "Experienced team player with excellent communication skills and a track record of delivering high-quality results. Enjoys mentoring junior colleagues and driving process improvements.",
    "Detail-oriented professional with a passion for excellence and continuous learning. Known for reliability, creativity, and the ability to work well under pressure.",
    "Results-driven individual with strong analytical skills and a collaborative approach to work. Committed to achieving team goals and maintaining high standards.",
    "Dedicated professional with expertise in cross-functional collaboration and strategic thinking. Values innovation, teamwork, and professional development.",
  ]

  const streets = ["Main St", "Oak Ave", "Pine Rd", "Elm Dr", "Cedar Ln"]
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]
  const states = ["NY", "CA", "IL", "TX", "AZ"]

  const phoneSuffix = ((userId * 123) % 900) + 100
  const phoneTail = ((userId * 456) % 9000) + 1000
  const street = streets[(userId * 12) % streets.length]
  const city = cities[(userId * 34) % cities.length]
  const state = states[(userId * 56) % states.length]
  const zip = ((userId * 78) % 90000) + 10000
  const bio = bios[(userId * 91) % bios.length]

  const year = 2020 + ((userId * 23) % 4)
  const month = (userId * 45) % 12
  const day = ((userId * 67) % 28) + 1

  return {
    phone: `+1 (555) ${phoneSuffix}-${phoneTail}`,
    address: `${((userId * 789) % 9999) + 1} ${street}, ${city}, ${state} ${zip}`,
    bio,
    joinDate: new Date(year, month, day).toLocaleDateString(),
  }
}

async function getEmployee(id: string): Promise<Employee | null> {
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`)
    if (!res.ok) return null

    const user = await res.json()
    const department = getRandomDepartment(user.id)
    const position = getPositionForDepartment(department, user.id)
    const mock = generateMockData(user.id)

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      department,
      rating: getPerformanceRating(user.id),
      phone: mock.phone,
      address: mock.address,
      bio: mock.bio,
      joinDate: mock.joinDate,
      position,
    }
  } catch (error) {
    console.error("Error fetching employee:", error)
    return null
  }
}


export default async function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const employee = await getEmployee(id)

  if (!employee) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <BackButton />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <EmployeeDetails employee={employee} />
      </div>
    </div>
  )
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const employee = await getEmployee(id)

  if (!employee) {
    return {
      title: "Employee Not Found",
    }
  }

  return {
    title: `${employee.firstName} ${employee.lastName} - Employee Details`,
    description: `View details for ${employee.firstName} ${employee.lastName} from ${employee.department} department`,
  }
}
