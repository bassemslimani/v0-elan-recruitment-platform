import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { jobs, companies, applications } from "@/lib/schema"
import { eq, ilike, and, count } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const location = searchParams.get("location")
    const type = searchParams.get("type")
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = parseInt(searchParams.get("offset") || "0")

    // Build query conditions
    const conditions = [eq(jobs.isActive, true)]

    if (search) {
      conditions.push(
        ilike(jobs.title, `%${search}%`)
      )
    }

    if (location) {
      conditions.push(
        ilike(jobs.location, `%${location}%`)
      )
    }

    if (type) {
      conditions.push(eq(jobs.type, type))
    }

    // Fetch jobs with company information and application count
    const jobsWithDetails = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        requirements: jobs.requirements,
        benefits: jobs.benefits,
        location: jobs.location,
        type: jobs.type,
        level: jobs.level,
        salaryMin: jobs.salaryMin,
        salaryMax: jobs.salaryMax,
        currency: jobs.currency,
        skills: jobs.skills,
        isRemote: jobs.isRemote,
        createdAt: jobs.createdAt,
        companyName: companies.name,
        companyLogo: companies.logo,
        companyIndustry: companies.industry,
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(and(...conditions))
      .limit(limit)
      .offset(offset)
      .orderBy(jobs.createdAt)

    // Get application counts for each job
    const jobsWithApplications = await Promise.all(
      jobsWithDetails.map(async (job) => {
        const applicationCount = await db
          .select({ count: count() })
          .from(applications)
          .where(eq(applications.jobId, job.id))

        // Format salary display
        const salaryDisplay = job.salaryMin && job.salaryMax 
          ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}`
          : null

        // Calculate days since posted
        const daysSincePosted = Math.floor(
          (Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        )
        const postedAt = daysSincePosted === 0 
          ? "Aujourd'hui" 
          : daysSincePosted === 1 
          ? "Il y a 1 jour" 
          : `Il y a ${daysSincePosted} jours`

        return {
          id: job.id,
          title: job.title,
          company: job.companyName,
          location: job.location,
          type: job.type,
          level: job.level,
          salary: salaryDisplay,
          description: job.description,
          requirements: job.requirements,
          benefits: job.benefits,
          skills: job.skills,
          isRemote: job.isRemote,
          postedAt,
          applications: applicationCount[0]?.count || 0,
          companyLogo: job.companyLogo,
          companyIndustry: job.companyIndustry,
        }
      })
    )

    return NextResponse.json({ jobs: jobsWithApplications })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    // Validate required fields
    const { 
      companyId, 
      title, 
      description, 
      location, 
      type, 
      requirements, 
      benefits, 
      skills,
      salaryMin,
      salaryMax,
      level,
      isRemote = false,
      applicationDeadline
    } = jobData

    if (!companyId || !title || !description || !location || !type) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      )
    }

    // Create new job in database
    const newJob = await db.insert(jobs).values({
      companyId,
      title,
      description,
      requirements,
      benefits,
      location,
      type,
      level,
      salaryMin: salaryMin ? parseFloat(salaryMin) : null,
      salaryMax: salaryMax ? parseFloat(salaryMax) : null,
      skills,
      isRemote,
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
      isActive: true,
    }).returning()

    return NextResponse.json({ job: newJob[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
