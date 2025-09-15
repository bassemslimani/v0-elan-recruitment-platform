"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Users, Eye, Plus, Search, Edit, Trash2, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function CompanyJobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const jobs = [
    {
      id: 1,
      title: "Développeur Frontend Senior",
      location: "Alger, Algérie",
      type: "Temps plein",
      salary: "2,400,000 DA - 3,000,000 DA",
      posted: "Il y a 2 jours",
      applications: 24,
      views: 156,
      status: "Actif",
      description: "Nous recherchons un Développeur Frontend Senior pour rejoindre notre équipe...",
    },
    {
      id: 2,
      title: "Chef de Produit",
      location: "Télétravail",
      type: "Temps plein",
      salary: "2,000,000 DA - 2,600,000 DA",
      posted: "Il y a 1 semaine",
      applications: 18,
      views: 89,
      status: "Actif",
      description: "Recherche d'un Chef de Produit expérimenté pour piloter la stratégie produit...",
    },
    {
      id: 3,
      title: "Designer UX",
      location: "Oran, Algérie",
      type: "Contrat",
      salary: "1,600,000 DA - 2,000,000 DA",
      posted: "Il y a 3 jours",
      applications: 12,
      views: 67,
      status: "Brouillon",
      description: "Recherche d'un Designer UX créatif pour améliorer l'expérience utilisateur...",
    },
    {
      id: 4,
      title: "Ingénieur Backend",
      location: "Constantine, Algérie",
      type: "Temps plein",
      salary: "2,200,000 DA - 2,800,000 DA",
      posted: "Il y a 5 jours",
      applications: 8,
      views: 45,
      status: "En pause",
      description: "Rejoignez notre équipe backend pour construire des systèmes évolutifs...",
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <AuthGuard requiredRole="company">
      <LayoutWrapper userRole="company">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Offres d'Emploi</h1>
              <p className="text-muted-foreground">Gérez vos offres d'emploi et suivez les candidatures</p>
            </div>
            <Button asChild>
              <Link href="/company/jobs/new">
                <Plus className="h-4 w-4 mr-2" />
                Publier une Nouvelle Offre
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher des offres d'emploi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les Statuts</SelectItem>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="brouillon">Brouillon</SelectItem>
                      <SelectItem value="en pause">En Pause</SelectItem>
                      <SelectItem value="fermé">Fermé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Emplois</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobs.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actifs</CardTitle>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobs.filter((j) => j.status === "Actif").length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Candidatures</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobs.reduce((sum, job) => sum + job.applications, 0)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vues</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobs.reduce((sum, job) => sum + job.views, 0)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Affichage de {filteredJobs.length} emplois</p>
            </div>

            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
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
                        <Badge
                          variant={
                            job.status === "Actif"
                              ? "default"
                              : job.status === "Brouillon"
                                ? "secondary"
                                : job.status === "En pause"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                      <div className="flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-1 text-primary font-medium">{job.salary}</span>
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

                    <div className="flex flex-col gap-2 md:ml-4">
                      <Button size="sm" asChild>
                        <Link href={`/company/jobs/${job.id}/applications`}>Voir les Candidatures</Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun emploi trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  Essayez d'ajuster vos critères de recherche ou créez une nouvelle offre d'emploi
                </p>
                <Button asChild>
                  <Link href="/company/jobs/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Publier Votre Premier Emploi
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
