import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, role, name } = await request.json()

    // Simulate registration validation
    if (!email || !password || !role || !name) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Simulate user creation
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name,
      profileComplete: role === "client" ? 25 : 50,
    }

    return NextResponse.json({
      user: newUser,
      token: `dummy-token-${newUser.id}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
