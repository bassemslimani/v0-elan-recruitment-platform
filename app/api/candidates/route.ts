import { type NextRequest, NextResponse } from "next/server"

// Dummy candidate data
const DUMMY_CANDIDATES = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
    education: "BS Computer Science",
    availability: "Immediately",
    salary: "$120,000 - $150,000",
    matchScore: 92,
    profileImage: "/professional-headshot.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    title: "Product Manager",
    location: "New York, NY",
    experience: "3+ years",
    skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
    education: "MBA Business Administration",
    availability: "2 weeks notice",
    salary: "$100,000 - $130,000",
    matchScore: 88,
    profileImage: "/professional-headshot.png",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    title: "UX Designer",
    location: "Remote",
    experience: "4+ years",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    education: "BA Graphic Design",
    availability: "Immediately",
    salary: "$80,000 - $100,000",
    matchScore: 85,
    profileImage: "/professional-headshot.png",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const skills = searchParams.get("skills")
  const location = searchParams.get("location")
  const experience = searchParams.get("experience")

  let filteredCandidates = DUMMY_CANDIDATES

  if (skills) {
    const skillsArray = skills.split(",").map((s) => s.trim().toLowerCase())
    filteredCandidates = filteredCandidates.filter((candidate) =>
      skillsArray.some((skill) =>
        candidate.skills.some((candidateSkill) => candidateSkill.toLowerCase().includes(skill)),
      ),
    )
  }

  if (location) {
    filteredCandidates = filteredCandidates.filter((candidate) =>
      candidate.location.toLowerCase().includes(location.toLowerCase()),
    )
  }

  if (experience) {
    filteredCandidates = filteredCandidates.filter((candidate) => candidate.experience.includes(experience))
  }

  return NextResponse.json({ candidates: filteredCandidates })
}
