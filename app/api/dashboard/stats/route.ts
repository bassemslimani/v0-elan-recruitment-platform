import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")

  if (role === "client") {
    return NextResponse.json({
      stats: {
        applications: 12,
        interviews: 3,
        offers: 1,
        profileViews: 45,
        profileComplete: 85,
        recommendedJobs: 8,
      },
    })
  }

  if (role === "company") {
    return NextResponse.json({
      stats: {
        activeJobs: 3,
        totalApplications: 125,
        interviews: 15,
        hires: 2,
        profileViews: 234,
        candidateMatches: 28,
      },
    })
  }

  if (role === "admin") {
    return NextResponse.json({
      stats: {
        totalUsers: 1250,
        totalCompanies: 85,
        activeJobs: 156,
        totalApplications: 3420,
        pendingApprovals: 12,
        systemHealth: 98,
      },
    })
  }

  return NextResponse.json({ error: "Invalid role" }, { status: 400 })
}
