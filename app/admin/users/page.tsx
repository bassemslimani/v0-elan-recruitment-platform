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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users, Search, MoreHorizontal, Shield, Ban, CheckCircle, AlertTriangle } from "lucide-react"

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "client",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      subscription: "free",
      applications: 8,
      reports: 0,
    },
    {
      id: 2,
      name: "TechCorp Inc.",
      email: "contact@techcorp.com",
      role: "company",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "1 day ago",
      subscription: "professional",
      jobPosts: 5,
      reports: 0,
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "client",
      status: "suspended",
      joinDate: "2024-01-08",
      lastActive: "1 week ago",
      subscription: "premium",
      applications: 12,
      reports: 2,
    },
    {
      id: 4,
      name: "StartupXYZ",
      email: "admin@startupxyz.com",
      role: "company",
      status: "pending",
      joinDate: "2024-01-14",
      lastActive: "3 hours ago",
      subscription: "free",
      jobPosts: 0,
      reports: 0,
    },
    {
      id: 5,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "client",
      status: "active",
      joinDate: "2024-01-12",
      lastActive: "30 minutes ago",
      subscription: "free",
      applications: 3,
      reports: 0,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground">Monitor and manage platform users</p>
            </div>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
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
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="client">Job Seekers</SelectItem>
                      <SelectItem value="company">Companies</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>

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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.filter((u) => u.status === "pending").length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suspended</CardTitle>
                <Ban className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.filter((u) => u.status === "suspended").length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          {getStatusIcon(user.status)}
                          <Badge variant="outline" className="capitalize">
                            {user.role === "client" ? "Job Seeker" : user.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>Joined {user.joinDate}</span>
                          <span>Last active {user.lastActive}</span>
                          <Badge variant="outline" className="text-xs">
                            {user.subscription}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        {user.role === "client" ? (
                          <div>
                            <p className="font-medium">{user.applications} applications</p>
                            <p className="text-muted-foreground">{user.reports} reports</p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">{user.jobPosts} job posts</p>
                            <p className="text-muted-foreground">{user.reports} reports</p>
                          </div>
                        )}
                      </div>

                      {getStatusBadge(user.status)}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
                          ) : user.status === "suspended" ? (
                            <DropdownMenuItem className="text-green-600">Reactivate User</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">Approve User</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {filteredUsers.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
