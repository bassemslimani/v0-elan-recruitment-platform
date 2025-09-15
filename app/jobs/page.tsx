"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, Clock, DollarSign, Search, Filter, Heart, ExternalLink } from "lucide-react"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const jobs = [
    {
      id: 1,
      title: "Développeur Frontend Senior",
      company: "TechCorp Algérie",
      location: "Alger, Algérie",
      type: "Temps plein",
      salary: "150 000 - 200 000 DA",
      posted: "Il y a 2 jours",
      match: 95,
      description:
        "Nous recherchons un Développeur Frontend Senior pour rejoindre notre équipe et aider à construire la prochaine génération d'applications web.",
      requirements: ["React", "TypeScript", "Node.js", "5+ années d'expérience"],
      saved: false,
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
      description:
        "Rejoignez notre startup en pleine croissance en tant que Développeur React et aidez à façonner l'avenir de notre produit.",
      requirements: ["React", "JavaScript", "CSS", "3+ années d'expérience"],
      saved: true,
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
      description:
        "Recherche d'un Ingénieur Full Stack pour travailler sur des projets de pointe avec des technologies modernes.",
      requirements: ["React", "Node.js", "PostgreSQL", "4+ années d'expérience"],
      saved: false,
    },
    {
      id: 4,
      title: "Développeur Frontend",
      company: "Design Studio",
      location: "Constantine, Algérie",
      type: "Temps partiel",
      salary: "80 000 - 120 000 DA",
      posted: "Il y a 5 jours",
      match: 78,
      description: "Développeur frontend créatif nécessaire pour donner vie à de beaux designs.",
      requirements: ["HTML", "CSS", "JavaScript", "Compétences en design"],
      saved: false,
    },
  ]

  const [savedJobs, setSavedJobs] = useState(new Set(jobs.filter((job) => job.saved).map((job) => job.id)))

  const toggleSaveJob = (jobId: number) => {
    const newSavedJobs = new Set(savedJobs)
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId)
    } else {
      newSavedJobs.add(jobId)
    }
    setSavedJobs(newSavedJobs)
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation =
      locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesType = typeFilter === "all" || job.type === typeFilter

    return matchesSearch && matchesLocation && matchesType
  })

  return (
    <AuthGuard requiredRole="client">
      <LayoutWrapper userRole="client">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Trouver des Emplois</h1>
            <p className="text-muted-foreground">
              Découvrez des opportunités qui correspondent à vos compétences et préférences
            </p>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher des emplois, entreprises ou mots-clés..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Localisation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les Localisations</SelectItem>
                      <SelectItem value="télétravail">Télétravail</SelectItem>
                      <SelectItem value="alger">Alger</SelectItem>
                      <SelectItem value="oran">Oran</SelectItem>
                      <SelectItem value="constantine">Constantine</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type d'Emploi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les Types</SelectItem>
                      <SelectItem value="Temps plein">Temps plein</SelectItem>
                      <SelectItem value="Temps partiel">Temps partiel</SelectItem>
                      <SelectItem value="Contrat">Contrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Affichage de {filteredJobs.length} emplois</p>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Plus de Filtres
              </Button>
            </div>

            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {job.match}% correspondance
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.posted}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req) => (
                          <Badge key={req} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:ml-4">
                      <Button className="w-full md:w-auto">
                        Postuler Maintenant
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                      <Button variant="outline" onClick={() => toggleSaveJob(job.id)} className="w-full md:w-auto">
                        <Heart className={`h-4 w-4 mr-2 ${savedJobs.has(job.id) ? "fill-current text-red-500" : ""}`} />
                        {savedJobs.has(job.id) ? "Sauvegardé" : "Sauvegarder"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun emploi trouvé</h3>
                <p className="text-muted-foreground">Essayez d'ajuster vos critères de recherche ou filtres</p>
              </CardContent>
            </Card>
          )}
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
