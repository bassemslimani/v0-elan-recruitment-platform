"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth"
import { Building2, Bell, CreditCard, Upload } from "lucide-react"

export default function CompanySettingsPage() {
  const { user } = useAuth()
  const [companyData, setCompanyData] = useState({
    name: "TechCorp Inc.",
    website: "https://techcorp.com",
    industry: "Technology",
    size: "50-200",
    founded: "2018",
    description: "We are a leading technology company focused on building innovative solutions for the modern world.",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    email: "contact@techcorp.com",
  })

  const [notifications, setNotifications] = useState({
    newApplications: true,
    candidateMessages: true,
    jobExpiring: true,
    weeklyReports: false,
  })

  return (
    <AuthGuard requiredRole="company">
      <LayoutWrapper userRole="company">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Company Settings</h1>
            <p className="text-muted-foreground">Manage your company profile and account preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Profile
                </CardTitle>
                <CardDescription>Update your company information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={companyData.industry}
                      onValueChange={(value) => setCompanyData({ ...companyData, industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Company Size</Label>
                    <Select
                      value={companyData.size}
                      onValueChange={(value) => setCompanyData({ ...companyData, size: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="501-1000">501-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    value={companyData.description}
                    onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How candidates can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={companyData.location}
                    onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={companyData.email}
                    onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="founded">Founded Year</Label>
                  <Input
                    id="founded"
                    value={companyData.founded}
                    onChange={(e) => setCompanyData({ ...companyData, founded: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Applications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when candidates apply</p>
                  </div>
                  <Switch
                    checked={notifications.newApplications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newApplications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Candidate Messages</Label>
                    <p className="text-sm text-muted-foreground">Messages from potential candidates</p>
                  </div>
                  <Switch
                    checked={notifications.candidateMessages}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, candidateMessages: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Job Expiring</Label>
                    <p className="text-sm text-muted-foreground">Reminders when job posts are about to expire</p>
                  </div>
                  <Switch
                    checked={notifications.jobExpiring}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, jobExpiring: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Weekly summary of your job posts performance</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription
                </CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Professional Plan</span>
                    <span className="text-sm text-muted-foreground">Current</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Unlimited job posts, candidate search, and priority support
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">$99/month</span>
                    <Button variant="outline">Manage Billing</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Usage This Month</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Job Posts</span>
                      <span>3 / Unlimited</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Candidate Views</span>
                      <span>156 / Unlimited</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Messages Sent</span>
                      <span>24 / Unlimited</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
