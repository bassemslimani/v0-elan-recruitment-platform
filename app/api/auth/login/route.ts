import { type NextRequest, NextResponse } from "next/server"

// Dummy user data for authentication
const DUMMY_USERS = [
  {
    id: "1",
    email: "client@example.com",
    password: "password123",
    role: "client",
    name: "John Doe",
    profileComplete: 85,
  },
  {
    id: "2",
    email: "company@example.com",
    password: "password123",
    role: "company",
    name: "TechCorp Inc.",
    profileComplete: 90,
  },
  {
    id: "3",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
    name: "Admin User",
    profileComplete: 100,
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user in dummy data
    const user = DUMMY_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return user data (in real app, you'd generate a JWT token)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        profileComplete: user.profileComplete,
      },
      token: `dummy-token-${user.id}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
