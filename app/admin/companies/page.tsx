"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Building2, Search, MoreHorizontal, CheckCircle, AlertTriangle, Ban, Briefcase } from "lucide-react"

export default function AdminCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")

  const companies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      email: "contact@techcorp.com",
      industry: "Technology",
      size: "50-200",
      status: "active",
      joinDate: "2024-01-10",
      jobPosts: 5,
      employees: 150,
      subscription: "professional",
      revenue: 2400,
      reports: 0,
    },
    {
      id: 2,
      name: "StartupXYZ",
      email: "admin@startupxyz.com",
      industry: "Technology",
      size: "1-10",
      status: "pending",
      joinDate: "2024-01-14",
      jobPosts: 0,
      employees: 8,
      subscription: "free",
      revenue: 0,
      reports: 0,
    },
    {
      id: 3,
      name: "HealthCare Solutions",
      email: "hr@healthcare.com",
      industry: "Healthcare",
      size: "201-500",
      status: "active",
      joinDate: "2024-01-05",
      jobPosts: 12,
      employees: 320,
      subscription: "enterprise",
      revenue: 4800,
      reports: 0,
    },
    {
      id: 4,
      name: "FinanceFirst",
      email: "contact@financefirst.com",
      industry: "Finance",
      size: "51-200",
      status: "suspended",
      joinDate: "2024-01-08",
      jobPosts: 3,
      employees: 85,
      subscription: "professional",
      revenue: 1200,
      reports: 2,
    },
  ]

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || company.status === statusFilter
    const matchesSize = sizeFilter === "all" || company.size === sizeFilter
    return matchesSearch && matchesStatus && matchesSize
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "suspended":
        return <Ban className="h-4 w-4 text-red-500" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AuthGuard requiredRole="admin">
      <LayoutWrapper userRole="admin">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Company Management</h1>
              <p className="text-muted-foreground">Monitor and manage company accounts</p>
            </div>
            <Button>
              <Building2 className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search companies by name, email, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sizeFilter} onValueChange={setSizeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-500">201-500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companies.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companies.filter((c) => c.status === "active").length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companies.reduce((sum, c) => sum + c.jobPosts, 0)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${companies.reduce((sum, c) => sum + c.revenue, 0)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Companies List */}
          <Card>
            <CardHeader>
              <CardTitle>Companies ({filteredCompanies.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCompanies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{company.name}</h3>
                          {getStatusIcon(company.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{company.email}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{company.industry}</span>
                          <span>{company.size} employees</span>
                          <span>Joined {company.joinDate}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {company.subscription}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{company.jobPosts} jobs</p>
                            <p className="text-muted-foreground text-xs">posted</p>
                          </div>
                          <div>
                            <p className="font-medium">${company.revenue}</p>
                            <p className="text-muted-foreground text-xs">revenue</p>
                          </div>
                          <div>
                            <p className="font-medium">{company.reports}</p>
                            <p className="text-muted-foreground text-xs">reports</p>
                          </div>
                        </div>
                      </div>

                      {getStatusBadge(company.status)}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Jobs</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          {company.status === "active" ? (
                            <DropdownMenuItem className="text-red-600">Suspend Company</DropdownMenuItem>
                          ) : company.status === "suspended" ? (
                            <DropdownMenuItem className="text-green-600">Reactivate Company</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">Approve Company</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">Delete Company</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {filteredCompanies.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No companies found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
