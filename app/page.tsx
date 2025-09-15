import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, Briefcase, TrendingUp, MapPin, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredJobs = [
    {
      id: 1,
      title: "Développeur Frontend Senior",
      company: "TechCorp Algérie",
      location: "Alger, Algérie",
      type: "Temps plein",
      salary: "150 000 - 200 000 DA",
      skills: ["React", "TypeScript", "Next.js"],
      postedAt: "Il y a 2 jours",
    },
    {
      id: 2,
      title: "Chef de Produit",
      company: "InnovateLabs",
      location: "Oran, Algérie",
      type: "Temps plein",
      salary: "180 000 - 250 000 DA",
      skills: ["Stratégie", "Analytics", "Agile"],
      postedAt: "Il y a 1 jour",
    },
    {
      id: 3,
      title: "Designer UX",
      company: "DesignStudio",
      location: "Télétravail",
      type: "Contrat",
      salary: "120 000 - 160 000 DA",
      skills: ["Figma", "Recherche utilisateur", "Prototypage"],
      postedAt: "Il y a 3 jours",
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "DataFlow Analytics",
      location: "Constantine, Algérie",
      type: "Temps plein",
      salary: "200 000 - 280 000 DA",
      skills: ["Python", "Machine Learning", "SQL"],
      postedAt: "Il y a 1 jour",
    },
    {
      id: 5,
      title: "Ingénieur DevOps",
      company: "CloudTech Solutions",
      location: "Annaba, Algérie",
      type: "Temps plein",
      salary: "170 000 - 220 000 DA",
      skills: ["AWS", "Docker", "Kubernetes"],
      postedAt: "Il y a 4 jours",
    },
    {
      id: 6,
      title: "Directeur Marketing",
      company: "GrowthCo",
      location: "Sétif, Algérie",
      type: "Temps plein",
      salary: "140 000 - 190 000 DA",
      skills: ["Marketing Digital", "SEO", "Analytics"],
      postedAt: "Il y a 2 jours",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Connecter les Talents aux
            <span className="text-primary"> Opportunités</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            ELAN est la plateforme de recrutement moderne qui rassemble chercheurs d'emploi, entreprises et opportunités
            en une expérience fluide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth/register">Commencer</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/auth/login">Se connecter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir ELAN ?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Pour les Chercheurs d'emploi</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Créez des profils détaillés, découvrez des opportunités et connectez-vous avec les meilleurs
                  employeurs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Pour les Entreprises</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Publiez des offres, parcourez les talents et trouvez les candidats parfaits pour votre équipe.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Correspondance Intelligente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Notre système intelligent fait correspondre les candidats avec les opportunités pertinentes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Axé sur la Croissance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Outils et insights pour aider candidats et entreprises à grandir.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Opportunités en Vedette</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez des opportunités de carrière passionnantes d'entreprises leaders dans divers secteurs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg leading-tight">{job.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {job.type}
                    </Badge>
                  </div>
                  <CardDescription className="font-medium text-foreground">{job.company}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {job.postedAt}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/jobs">Voir tous les emplois</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Rejoignez des milliers de professionnels qui utilisent déjà ELAN pour faire progresser leur carrière.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/auth/register">Rejoindre ELAN aujourd'hui</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
