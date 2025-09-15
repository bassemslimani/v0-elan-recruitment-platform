"use client"

import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth"
import { Briefcase, Users, Eye, TrendingUp, Plus, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { SubscriptionBanner } from "@/components/subscription-banner"

export default function CompanyDashboard() {
  const { user } = useAuth()

  const jobPosts = [
    {
      id: 1,
      title: "Développeur Frontend Senior",
      location: "Alger, Algérie",
      type: "Temps plein",
      posted: "Il y a 2 jours",
      applications: 24,
      views: 156,
      status: "Actif",
    },
    {
      id: 2,
      title: "Chef de Produit",
      location: "Télétravail",
      type: "Temps plein",
      posted: "Il y a 1 semaine",
      applications: 18,
      views: 89,
      status: "Actif",
    },
    {
      id: 3,
      title: "Designer UX",
      location: "Oran, Algérie",
      type: "Contrat",
      posted: "Il y a 3 jours",
      applications: 12,
      views: 67,
      status: "Brouillon",
    },
  ]

  const recentApplications = [
    {
      id: 1,
      candidateName: "Sarah Benali",
      position: "Développeur Frontend Senior",
      appliedDate: "2024-01-15",
      status: "En cours d'examen",
      match: 95,
    },
    {
      id: 2,
      candidateName: "Mohamed Cherif",
      position: "Chef de Produit",
      appliedDate: "2024-01-14",
      status: "Entretien programmé",
      match: 88,
    },
    {
      id: 3,
      candidateName: "Amina Kaddour",
      position: "Développeur Frontend Senior",
      appliedDate: "2024-01-13",
      status: "Candidature envoyée",
      match: 92,
    },
  ]

  const companyProfile = {
    name: "TechCorp Inc.",
    completeness: 85,
    employees: "50-200",
    industry: "Technologie",
    founded: "2018",
  }

  return (
    <AuthGuard requiredRole="company">
      <LayoutWrapper userRole="company">
        <div className="p-4 md:p-6 space-y-6">
          <SubscriptionBanner userRole="company" />

          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Bon retour, {companyProfile.name}!</h1>
              <p className="text-muted-foreground">Gérez vos offres d'emploi et trouvez les candidats parfaits.</p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/company/jobs/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Publier une offre
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/company/candidates">Voir les candidats</Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emplois actifs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 cette semaine</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total candidatures</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54</div>
                <p className="text-xs text-muted-foreground">+12 cette semaine</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vues du profil</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">312</div>
                <p className="text-xs text-muted-foreground">+18% par rapport au mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score de correspondance moy.</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+5% d'amélioration</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Profile Completion */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Profil de l'entreprise
                </CardTitle>
                <CardDescription>Complétez votre profil pour attirer de meilleurs candidats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Complétude</span>
                    <span>{companyProfile.completeness}%</span>
                  </div>
                  <Progress value={companyProfile.completeness} className="h-2" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Informations entreprise ajoutées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Logo téléchargé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <span>Ajouter la culture d'entreprise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <span>Ajouter les avantages</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/company/settings">Compléter le profil</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Active Job Posts */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Offres d'emploi actives
                </CardTitle>
                <CardDescription>Gérez vos offres d'emploi actuelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobPosts.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.posted}
                            </div>
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                        </div>
                        <Badge variant={job.status === "Actif" ? "default" : "secondary"}>{job.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {job.applications} candidatures
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {job.views} vues
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/company/jobs">Voir tous les emplois</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Candidatures récentes
              </CardTitle>
              <CardDescription>Derniers candidats qui ont postulé à vos postes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{app.candidateName}</h3>
                          <p className="text-sm text-muted-foreground">{app.position}</p>
                          <p className="text-xs text-muted-foreground">Candidature le {app.appliedDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{app.match}% correspondance</Badge>
                      <Badge
                        variant={
                          app.status === "Entretien programmé"
                            ? "default"
                            : app.status === "En cours d'examen"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {app.status}
                      </Badge>
                      <Button size="sm">Voir le profil</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
