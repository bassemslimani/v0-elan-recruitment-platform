import { type NextRequest, NextResponse } from "next/server"

// Dummy job data
const DUMMY_JOBS = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description: "We are looking for a senior frontend developer to join our team...",
    requirements: ["React", "TypeScript", "Next.js", "5+ years experience"],
    benefits: ["Health Insurance", "Remote Work", "401k", "Stock Options"],
    postedDate: "2024-01-15",
    applications: 45,
    matchScore: 92,
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    description: "Join our product team to drive innovation...",
    requirements: ["Product Management", "Agile", "Analytics", "3+ years experience"],
    benefits: ["Health Insurance", "Flexible Hours", "Learning Budget"],
    postedDate: "2024-01-14",
    applications: 32,
    matchScore: 78,
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Contract",
    salary: "$80,000 - $100,000",
    description: "Create amazing user experiences for our clients...",
    requirements: ["Figma", "User Research", "Prototyping", "2+ years experience"],
    benefits: ["Remote Work", "Flexible Schedule", "Creative Freedom"],
    postedDate: "2024-01-13",
    applications: 28,
    matchScore: 85,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const location = searchParams.get("location")
  const type = searchParams.get("type")

  let filteredJobs = DUMMY_JOBS

  if (search) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (location) {
    filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
  }

  if (type) {
    filteredJobs = filteredJobs.filter((job) => job.type === type)
  }

  return NextResponse.json({ jobs: filteredJobs })
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    const newJob = {
      id: Math.random().toString(36).substr(2, 9),
      ...jobData,
      postedDate: new Date().toISOString().split("T")[0],
      applications: 0,
      matchScore: Math.floor(Math.random() * 30) + 70,
    }

    return NextResponse.json({ job: newJob })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
