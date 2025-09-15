import { type NextRequest, NextResponse } from "next/server"

// Dummy company data
const DUMMY_COMPANIES = [
  {
    id: "1",
    name: "TechCorp Inc.",
    email: "hr@techcorp.com",
    industry: "Technology",
    size: "100-500",
    location: "San Francisco, CA",
    status: "active",
    joinDate: "2024-01-05",
    jobsPosted: 5,
    activeJobs: 3,
    totalApplications: 125,
    subscription: "premium",
  },
  {
    id: "2",
    name: "StartupXYZ",
    email: "jobs@startupxyz.com",
    industry: "Fintech",
    size: "10-50",
    location: "New York, NY",
    status: "active",
    joinDate: "2024-01-08",
    jobsPosted: 2,
    activeJobs: 2,
    totalApplications: 45,
    subscription: "basic",
  },
  {
    id: "3",
    name: "DesignStudio",
    email: "hello@designstudio.com",
    industry: "Design",
    size: "10-50",
    location: "Remote",
    status: "pending",
    joinDate: "2024-01-12",
    jobsPosted: 1,
    activeJobs: 1,
    totalApplications: 28,
    subscription: "free",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const industry = searchParams.get("industry")
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let filteredCompanies = DUMMY_COMPANIES

  if (industry) {
    filteredCompanies = filteredCompanies.filter((company) => company.industry === industry)
  }

  if (status) {
    filteredCompanies = filteredCompanies.filter((company) => company.status === status)
  }

  if (search) {
    filteredCompanies = filteredCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.email.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json({ companies: filteredCompanies })
}
