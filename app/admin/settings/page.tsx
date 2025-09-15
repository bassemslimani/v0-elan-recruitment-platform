"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { Bell, Database, Globe, Lock, AlertTriangle } from "lucide-react"

export default function AdminSettingsPage() {
  const { user } = useAuth()
  const [systemSettings, setSystemSettings] = useState({
    siteName: "ELAN",
    siteDescription: "Modern recruitment platform connecting talent with opportunities",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    autoApproveCompanies: false,
    maxJobPostsPerCompany: 50,
    jobPostExpiryDays: 30,
  })

  const [notifications, setNotifications] = useState({
    systemAlerts: true,
    userReports: true,
    paymentFailures: true,
    securityAlerts: true,
    weeklyReports: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: false,
    sessionTimeout: 24,
    passwordMinLength: 8,
    maxLoginAttempts: 5,
    ipWhitelist: "",
  })

  return (
    <AuthGuard requiredRole="admin">
      <LayoutWrapper userRole="admin">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Settings</h1>
            <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>General platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={systemSettings.siteName}
                    onChange={(e) => setSystemSettings({ ...systemSettings, siteName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={systemSettings.siteDescription}
                    onChange={(e) => setSystemSettings({ ...systemSettings, siteDescription: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, maintenanceMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                  </div>
                  <Switch
                    checked={systemSettings.registrationEnabled}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, registrationEnabled: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Verification</Label>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <Switch
                    checked={systemSettings.emailVerificationRequired}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, emailVerificationRequired: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-approve Companies</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve company registrations</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoApproveCompanies}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, autoApproveCompanies: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Platform security configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require 2FA for Admins</Label>
                    <p className="text-sm text-muted-foreground">Force two-factor authentication for admin accounts</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorRequired}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, twoFactorRequired: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                  <Select
                    value={securitySettings.sessionTimeout.toString()}
                    onValueChange={(value) =>
                      setSecuritySettings({ ...securitySettings, sessionTimeout: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="168">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    min="6"
                    max="20"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, passwordMinLength: Number.parseInt(e.target.value) })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    min="3"
                    max="10"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number.parseInt(e.target.value) })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ipWhitelist">IP Whitelist (Admin Access)</Label>
                  <Textarea
                    id="ipWhitelist"
                    placeholder="Enter IP addresses, one per line"
                    value={securitySettings.ipWhitelist}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Job Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Job Settings
                </CardTitle>
                <CardDescription>Configure job posting rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxJobPosts">Max Job Posts per Company</Label>
                  <Input
                    id="maxJobPosts"
                    type="number"
                    min="1"
                    max="100"
                    value={systemSettings.maxJobPostsPerCompany}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, maxJobPostsPerCompany: Number.parseInt(e.target.value) })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobExpiry">Job Post Expiry (days)</Label>
                  <Select
                    value={systemSettings.jobPostExpiryDays.toString()}
                    onValueChange={(value) =>
                      setSystemSettings({ ...systemSettings, jobPostExpiryDays: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Admin Notifications
                </CardTitle>
                <CardDescription>Configure admin alert preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Critical system notifications</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Reports</Label>
                    <p className="text-sm text-muted-foreground">Content moderation reports</p>
                  </div>
                  <Switch
                    checked={notifications.userReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, userReports: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Failures</Label>
                    <p className="text-sm text-muted-foreground">Failed payment notifications</p>
                  </div>
                  <Switch
                    checked={notifications.paymentFailures}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, paymentFailures: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Security breach notifications</p>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Platform analytics summary</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Danger Zone */}
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-red-600">
                Irreversible and destructive actions. Use with extreme caution.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-200">Reset All User Data</h4>
                  <p className="text-sm text-red-600">Permanently delete all user accounts and data</p>
                </div>
                <Button variant="destructive">Reset Platform</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-200">Export All Data</h4>
                  <p className="text-sm text-red-600">Download complete platform data backup</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button>Save All Settings</Button>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
