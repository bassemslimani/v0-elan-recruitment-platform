import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, candidates, companies, applications, jobs } from "@/lib/schema"
import { eq, ilike, and, count } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    // Build query conditions
    const conditions = []

    if (role) {
      conditions.push(eq(users.role, role))
    }

    if (status) {
      conditions.push(eq(users.status, status))
    }

    if (search) {
      conditions.push(
        ilike(users.firstName, `%${search}%`)
      )
    }

    // Fetch users from database
    const usersData = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
        status: users.status,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .limit(limit)
      .offset(offset)
      .orderBy(users.createdAt)

    // Get additional statistics for each user
    const usersWithStats = await Promise.all(
      usersData.map(async (user) => {
        let additionalStats = {}

        if (user.role === 'client') {
          // Get candidate profile and application count
          const candidateProfile = await db
            .select()
            .from(candidates)
            .where(eq(candidates.userId, user.id))
            .limit(1)

          const applicationCount = await db
            .select({ count: count() })
            .from(applications)
            .where(eq(applications.candidateId, candidateProfile[0]?.id || ''))

          additionalStats = {
            applications: applicationCount[0]?.count || 0,
            profileComplete: candidateProfile[0] ? 85 : 20, // Simple calculation
          }
        } else if (user.role === 'company') {
          // Get company profile and job count
          const companyProfile = await db
            .select()
            .from(companies)
            .where(eq(companies.userId, user.id))
            .limit(1)

          const jobCount = await db
            .select({ count: count() })
            .from(jobs)
            .where(eq(jobs.companyId, companyProfile[0]?.id || ''))

          additionalStats = {
            jobsPosted: jobCount[0]?.count || 0,
            profileComplete: companyProfile[0] ? 90 : 30, // Simple calculation
          }
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          status: user.status || 'active',
          joinDate: user.createdAt.toISOString().split('T')[0],
          lastActive: user.updatedAt.toISOString().split('T')[0],
          ...additionalStats,
        }
      })
    )

    return NextResponse.json({ users: usersWithStats })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
