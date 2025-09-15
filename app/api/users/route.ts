import { type NextRequest, NextResponse } from "next/server"

// Dummy user data for admin management
const DUMMY_USERS_DATA = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "client",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-15",
    applications: 12,
    profileComplete: 85,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "client",
    status: "active",
    joinDate: "2024-01-08",
    lastActive: "2024-01-14",
    applications: 8,
    profileComplete: 92,
  },
  {
    id: "3",
    name: "TechCorp Inc.",
    email: "hr@techcorp.com",
    role: "company",
    status: "active",
    joinDate: "2024-01-05",
    lastActive: "2024-01-15",
    jobsPosted: 5,
    profileComplete: 90,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let filteredUsers = DUMMY_USERS_DATA

  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role === role)
  }

  if (status) {
    filteredUsers = filteredUsers.filter((user) => user.status === status)
  }

  if (search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json({ users: filteredUsers })
}
