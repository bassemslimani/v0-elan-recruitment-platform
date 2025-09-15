"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Search, Filter, MapPin, Briefcase, GraduationCap, Star, Eye, MessageCircle } from "lucide-react"

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [skillFilter, setSkillFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      experience: "5+ years",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      education: "BS Computer Science, Stanford",
      match: 95,
      salary: "$120k - $150k",
      availability: "Available",
      lastActive: "2 days ago",
      applications: 3,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Product Manager",
      location: "Remote",
      experience: "7+ years",
      skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
      education: "MBA, UC Berkeley",
      match: 88,
      salary: "$130k - $160k",
      availability: "Available",
      lastActive: "1 day ago",
      applications: 2,
    },
    {
      id: 3,
      name: "Emily Davis",
      title: "UX Designer",
      location: "New York, NY",
      experience: "4+ years",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      education: "BFA Design, Parsons",
      match: 92,
      salary: "$90k - $120k",
      availability: "Available",
      lastActive: "3 hours ago",
      applications: 1,
    },
    {
      id: 4,
      name: "David Wilson",
      title: "Backend Engineer",
      location: "Austin, TX",
      experience: "6+ years",
      skills: ["Python", "PostgreSQL", "Docker", "Kubernetes"],
      education: "MS Computer Science, UT Austin",
      match: 85,
      salary: "$110k - $140k",
      availability: "Available",
      lastActive: "1 week ago",
      applications: 0,
    },
  ]

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSkill =
      skillFilter === "all" || candidate.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase()))

    const matchesLocation =
      locationFilter === "all" || candidate.location.toLowerCase().includes(locationFilter.toLowerCase())

    return matchesSearch && matchesSkill && matchesLocation
  })

  return (
    <AuthGuard requiredRole="company">
      <LayoutWrapper userRole="company">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Candidates</h1>
              <p className="text-muted-foreground">Browse and connect with talented professionals</p>
            </div>
            <Button>
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates by name, title, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={skillFilter} onValueChange={setSkillFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Skills</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="san francisco">San Francisco</SelectItem>
                      <SelectItem value="new york">New York</SelectItem>
                      <SelectItem value="austin">Austin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Candidate Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{candidates.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Match</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{candidates.filter((c) => c.match >= 90).length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applied to Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{candidates.filter((c) => c.applications > 0).length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available</CardTitle>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {candidates.filter((c) => c.availability === "Available").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Candidates List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing {filteredCandidates.length} candidates</p>
            </div>

            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg">
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3>
                            <p className="text-muted-foreground">{candidate.title}</p>
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {candidate.match}% match
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {candidate.experience}
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {candidate.education}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-primary font-medium">{candidate.salary}</span>
                          <span className="text-green-600">{candidate.availability}</span>
                          <span className="text-muted-foreground">Active {candidate.lastActive}</span>
                          {candidate.applications > 0 && (
                            <span className="text-muted-foreground">
                              {candidate.applications} applications to your jobs
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:ml-4 md:min-w-[140px]">
                      <Button size="sm">View Profile</Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCandidates.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No candidates found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
