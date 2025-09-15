"use client"

import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth"
import { Briefcase, MapPin, Clock, TrendingUp, User, FileText, Bell } from "lucide-react"
import Link from "next/link"
import { SubscriptionBanner } from "@/components/subscription-banner"

export default function ClientDashboard() {
  const { user } = useAuth()

  const recentJobs = [
    {
      id: 1,
      title: "Développeur Frontend Senior",
      company: "TechCorp Algérie",
      location: "Alger, Algérie",
      type: "Temps plein",
      salary: "150 000 - 200 000 DA",
      posted: "Il y a 2 jours",
      match: 95,
    },
    {
      id: 2,
      title: "Développeur React",
      company: "StartupXYZ",
      location: "Télétravail",
      type: "Contrat",
      salary: "120 000 - 160 000 DA",
      posted: "Il y a 1 semaine",
      match: 88,
    },
    {
      id: 3,
      title: "Ingénieur Full Stack",
      company: "Innovation Labs",
      location: "Oran, Algérie",
      type: "Temps plein",
      salary: "140 000 - 180 000 DA",
      posted: "Il y a 3 jours",
      match: 82,
    },
  ]

  const applications = [
    {
      id: 1,
      company: "TechCorp Algérie",
      position: "Développeur Frontend Senior",
      status: "Entretien Programmé",
      date: "2024-01-15",
    },
    { id: 2, company: "StartupXYZ", position: "Développeur React", status: "En Cours d'Examen", date: "2024-01-12" },
    {
      id: 3,
      company: "Innovation Labs",
      position: "Ingénieur Full Stack",
      status: "Candidature Envoyée",
      date: "2024-01-10",
    },
  ]

  const profileCompletion = 75

  return (
    <AuthGuard requiredRole="client">
      <LayoutWrapper userRole="client">
        <div className="p-4 md:p-6 space-y-6">
          <SubscriptionBanner userRole="client" />

          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Bon retour, {user?.name} !</h1>
              <p className="text-muted-foreground">Voici ce qui se passe avec votre recherche d'emploi aujourd'hui.</p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/jobs">Parcourir les Emplois</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/profile">Mettre à Jour le Profil</Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vues du Profil</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+12% par rapport à la semaine dernière</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Candidatures</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">3 cette semaine</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entretiens</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">1 programmé</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Correspondances d'Emplois</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+23 nouveaux aujourd'hui</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Completion */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Complétude du Profil
                </CardTitle>
                <CardDescription>
                  Complétez votre profil pour obtenir de meilleures correspondances d'emplois
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progrès</span>
                    <span>{profileCompletion}%</span>
                  </div>
                  <Progress value={profileCompletion} className="h-2" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Informations de base complétées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Compétences ajoutées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <span>Télécharger le CV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <span>Ajouter un portfolio</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/profile">Compléter le Profil</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Job Matches */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Emplois Recommandés
                </CardTitle>
                <CardDescription>Emplois qui correspondent à vos compétences et préférences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {job.match}% correspondance
                        </Badge>
                      </div>
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
                      <p className="text-sm font-medium text-primary">{job.salary}</p>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/jobs">Voir Tous les Emplois</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Candidatures Récentes
              </CardTitle>
              <CardDescription>Suivez le statut de vos candidatures d'emploi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{app.position}</h3>
                      <p className="text-sm text-muted-foreground">{app.company}</p>
                      <p className="text-xs text-muted-foreground">Candidature envoyée le {app.date}</p>
                    </div>
                    <Badge
                      variant={
                        app.status === "Entretien Programmé"
                          ? "default"
                          : app.status === "En Cours d'Examen"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {app.status}
                    </Badge>
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
