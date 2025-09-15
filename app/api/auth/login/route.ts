import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, candidates, companies } from "@/lib/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user in database
    const user = await db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
        role: users.role,
        firstName: users.firstName,
        lastName: users.lastName,
        status: users.status,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (!user.length) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const foundUser = user[0]

    // Check if user is active
    if (foundUser.status !== 'active') {
      return NextResponse.json({ error: "Account is not active" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Calculate profile completeness
    let profileComplete = 50 // Base score
    
    if (foundUser.role === 'client') {
      const candidateProfile = await db
        .select()
        .from(candidates)
        .where(eq(candidates.userId, foundUser.id))
        .limit(1)
      
      profileComplete = candidateProfile.length > 0 ? 85 : 30
    } else if (foundUser.role === 'company') {
      const companyProfile = await db
        .select()
        .from(companies)
        .where(eq(companies.userId, foundUser.id))
        .limit(1)
      
      profileComplete = companyProfile.length > 0 ? 90 : 40
    } else if (foundUser.role === 'admin') {
      profileComplete = 100
    }

    // Return user data (in real app, you'd generate a JWT token)
    return NextResponse.json({
      user: {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: `${foundUser.firstName} ${foundUser.lastName}`,
        profileComplete,
      },
      token: `auth-token-${foundUser.id}-${Date.now()}`,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
