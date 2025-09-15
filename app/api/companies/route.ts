import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { companies, users, jobs, applications } from "@/lib/schema"
import { eq, ilike, and, count } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const industry = searchParams.get("industry")
    const search = searchParams.get("search")
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = parseInt(searchParams.get("offset") || "0")

    // Build query conditions
    const conditions = []

    if (industry) {
      conditions.push(eq(companies.industry, industry))
    }

    if (search) {
      conditions.push(
        ilike(companies.name, `%${search}%`)
      )
    }

    // Fetch companies with user information
    const companiesWithDetails = await db
      .select({
        id: companies.id,
        name: companies.name,
        description: companies.description,
        website: companies.website,
        logo: companies.logo,
        industry: companies.industry,
        size: companies.size,
        location: companies.location,
        createdAt: companies.createdAt,
        userEmail: users.email,
        userFirstName: users.firstName,
        userLastName: users.lastName,
        userIsActive: users.isActive,
      })
      .from(companies)
      .leftJoin(users, eq(companies.userId, users.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .limit(limit)
      .offset(offset)
      .orderBy(companies.createdAt)

    // Get job statistics for each company
    const companiesWithStats = await Promise.all(
      companiesWithDetails.map(async (company) => {
        // Get total jobs posted
        const totalJobs = await db
          .select({ count: count() })
          .from(jobs)
          .where(eq(jobs.companyId, company.id))

        // Get active jobs
        const activeJobs = await db
          .select({ count: count() })
          .from(jobs)
          .where(and(
            eq(jobs.companyId, company.id),
            eq(jobs.isActive, true)
          ))

        // Get total applications for all company jobs
        const totalApplications = await db
          .select({ count: count() })
          .from(applications)
          .leftJoin(jobs, eq(applications.jobId, jobs.id))
          .where(eq(jobs.companyId, company.id))

        return {
          id: company.id,
          name: company.name,
          email: company.userEmail,
          description: company.description,
          website: company.website,
          logo: company.logo,
          industry: company.industry,
          size: company.size,
          location: company.location,
          status: company.userIsActive ? 'active' : 'inactive',
          joinDate: company.createdAt.toISOString().split('T')[0],
          jobsPosted: totalJobs[0]?.count || 0,
          activeJobs: activeJobs[0]?.count || 0,
          totalApplications: totalApplications[0]?.count || 0,
          contactPerson: `${company.userFirstName} ${company.userLastName}`,
        }
      })
    )

    return NextResponse.json({ companies: companiesWithStats })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}
