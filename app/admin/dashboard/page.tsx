"use client"

import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { Users, Building2, Briefcase, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { user } = useAuth()

  const stats = {
    totalUsers: 1247,
    totalCompanies: 89,
    totalJobs: 234,
    totalRevenue: 45600,
    pendingApprovals: 12,
    activeReports: 3,
    monthlyGrowth: 15.2,
  }

  const recentActivity = [
    {
      id: 1,
      type: "user_registration",
      message: "Nouvel utilisateur inscrit : Sarah Benali",
      timestamp: "Il y a 2 minutes",
      status: "info",
    },
    {
      id: 2,
      type: "company_approval",
      message: "Entreprise en attente d'approbation : TechStart Inc.",
      timestamp: "Il y a 15 minutes",
      status: "warning",
    },
    {
      id: 3,
      type: "job_posted",
      message: "Nouvelle offre publiée : Développeur Senior chez Microsoft",
      timestamp: "Il y a 1 heure",
      status: "success",
    },
    {
      id: 4,
      type: "payment_received",
      message: "Paiement reçu : 9900 DA de TechCorp Inc.",
      timestamp: "Il y a 2 heures",
      status: "success",
    },
    {
      id: 5,
      type: "report_submitted",
      message: "Signalement soumis pour l'offre d'emploi #234",
      timestamp: "Il y a 3 heures",
      status: "error",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "company",
      name: "TechStart Inc.",
      submittedBy: "john@techstart.com",
      submittedAt: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      type: "job",
      name: "Développeur Frontend Senior",
      submittedBy: "InnovateLabs",
      submittedAt: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      type: "company",
      name: "AI Solutions Ltd.",
      submittedBy: "admin@aisolutions.com",
      submittedAt: "2024-01-13",
      status: "pending",
    },
  ]

  return (
    <AuthGuard requiredRole="admin">
      <LayoutWrapper userRole="admin">
        <div className="p-4 md:p-6 space-y-6">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tableau de bord Admin</h1>
              <p className="text-muted-foreground">
                Surveillez l'activité de la plateforme et gérez les opérations système
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/admin/reports">Voir les rapports</Link>
              </Button>
              <Button asChild>
                <Link href="/admin/users">Gérer les utilisateurs</Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% par rapport au mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entreprises</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCompanies}</div>
                <p className="text-xs text-muted-foreground">+12 ce mois-ci</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emplois actifs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalJobs}</div>
                <p className="text-xs text-muted-foreground">+28 cette semaine</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenus mensuels</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} DA</div>
                <p className="text-xs text-muted-foreground">+8.2% par rapport au mois dernier</p>
              </CardContent>
            </Card>
          </div>

          {/* Alert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-200">
                  Approbations en attente
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-800 dark:text-orange-200">{stats.pendingApprovals}</div>
                <p className="text-xs text-orange-600">Nécessitent une attention immédiate</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-800 dark:text-red-200">
                  Signalements actifs
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-800 dark:text-red-200">{stats.activeReports}</div>
                <p className="text-xs text-red-600">Modération de contenu nécessaire</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">
                  État du système
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800 dark:text-green-200">Sain</div>
                <p className="text-xs text-green-600">Tous les systèmes opérationnels</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Activité récente
                </CardTitle>
                <CardDescription>Derniers événements de la plateforme et actions des utilisateurs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                            ? "bg-orange-500"
                            : activity.status === "error"
                              ? "bg-red-500"
                              : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/admin/activity">Voir toute l'activité</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Approbations en attente
                </CardTitle>
                <CardDescription>Éléments en attente de révision par l'admin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {item.type === "company" ? "entreprise" : "emploi"}
                        </Badge>
                        <h3 className="font-medium text-sm">{item.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Par {item.submittedBy} • {item.submittedAt}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Examiner
                      </Button>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/admin/approvals">Voir toutes les approbations</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Tâches administratives courantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                  <Link href="/admin/users">
                    <Users className="h-6 w-6" />
                    <span>Gérer les utilisateurs</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                  <Link href="/admin/companies">
                    <Building2 className="h-6 w-6" />
                    <span>Gérer les entreprises</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                  <Link href="/admin/jobs">
                    <Briefcase className="h-6 w-6" />
                    <span>Modérer les emplois</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                  <Link href="/admin/reports">
                    <AlertTriangle className="h-6 w-6" />
                    <span>Gérer les signalements</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
