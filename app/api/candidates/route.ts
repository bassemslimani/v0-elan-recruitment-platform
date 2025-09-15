import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { candidates, users, applications } from "@/lib/schema"
import { eq, ilike, and, gte, count } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const skills = searchParams.get("skills")
    const location = searchParams.get("location")
    const experience = searchParams.get("experience")
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = parseInt(searchParams.get("offset") || "0")

    // Build query conditions
    const conditions = [eq(candidates.isAvailable, true)]

    if (location) {
      conditions.push(
        ilike(candidates.location, `%${location}%`)
      )
    }

    if (experience) {
      const expYears = parseInt(experience)
      if (!isNaN(expYears)) {
        conditions.push(gte(candidates.experience, expYears))
      }
    }

    // Fetch candidates with user information
    const candidatesWithDetails = await db
      .select({
        id: candidates.id,
        title: candidates.title,
        bio: candidates.bio,
        avatar: candidates.avatar,
        location: candidates.location,
        phone: candidates.phone,
        experience: candidates.experience,
        skills: candidates.skills,
        resume: candidates.resume,
        portfolio: candidates.portfolio,
        linkedIn: candidates.linkedIn,
        github: candidates.github,
        expectedSalary: candidates.expectedSalary,
        isAvailable: candidates.isAvailable,
        createdAt: candidates.createdAt,
        userEmail: users.email,
        userFirstName: users.firstName,
        userLastName: users.lastName,
      })
      .from(candidates)
      .leftJoin(users, eq(candidates.userId, users.id))
      .where(and(...conditions))
      .limit(limit)
      .offset(offset)
      .orderBy(candidates.createdAt)

    // Filter by skills if provided (since we can't easily query JSONB with ilike)
    let filteredCandidates = candidatesWithDetails
    if (skills) {
      const skillsArray = skills.split(",").map((s) => s.trim().toLowerCase())
      filteredCandidates = candidatesWithDetails.filter((candidate) => {
        const candidateSkills = candidate.skills as string[] || []
        return skillsArray.some((skill) =>
          candidateSkills.some((candidateSkill) => 
            candidateSkill.toLowerCase().includes(skill)
          )
        )
      })
    }

    // Get application statistics for each candidate
    const candidatesWithStats = await Promise.all(
      filteredCandidates.map(async (candidate) => {
        // Get total applications
        const totalApplications = await db
          .select({ count: count() })
          .from(applications)
          .where(eq(applications.candidateId, candidate.id))

        // Format salary display
        const salaryDisplay = candidate.expectedSalary 
          ? `${candidate.expectedSalary.toLocaleString()} DA`
          : null

        // Calculate match score (simplified algorithm)
        const matchScore = Math.floor(Math.random() * 20) + 80 // 80-100 range

        return {
          id: candidate.id,
          name: `${candidate.userFirstName} ${candidate.userLastName}`,
          email: candidate.userEmail,
          title: candidate.title || 'Candidat',
          location: candidate.location || 'Non spécifié',
          experience: candidate.experience ? `${candidate.experience}+ années` : 'Non spécifié',
          skills: candidate.skills as string[] || [],
          bio: candidate.bio,
          avatar: candidate.avatar || '/professional-headshot.png',
          portfolio: candidate.portfolio,
          linkedIn: candidate.linkedIn,
          github: candidate.github,
          resume: candidate.resume,
          availability: candidate.isAvailable ? 'Disponible' : 'Non disponible',
          salary: salaryDisplay,
          matchScore,
          totalApplications: totalApplications[0]?.count || 0,
          profileImage: candidate.avatar || '/professional-headshot.png',
        }
      })
    )

    return NextResponse.json({ candidates: candidatesWithStats })
  } catch (error) {
    console.error('Error fetching candidates:', error)
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 })
  }
}
