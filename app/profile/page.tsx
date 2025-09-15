"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Upload, X } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "Python", "AWS"])
  const [newSkill, setNewSkill] = useState("")

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+213 555 123 456",
    location: "Alger, Algérie",
    title: "Développeur Frontend Senior",
    bio: "Développeur frontend passionné avec plus de 5 ans d'expérience dans la création d'applications web modernes. Spécialisé en React, TypeScript et création d'expériences utilisateur exceptionnelles.",
    experience: [
      {
        id: 1,
        title: "Développeur Frontend Senior",
        company: "TechCorp Algérie",
        duration: "2022 - Présent",
        description: "Direction du développement d'applications web client utilisant React et TypeScript.",
      },
      {
        id: 2,
        title: "Développeur Frontend",
        company: "StartupDZ",
        duration: "2020 - 2022",
        description:
          "Création d'applications web responsives et amélioration des métriques d'expérience utilisateur de 40%.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Licence en Informatique",
        school: "Université des Sciences et de la Technologie Houari Boumediene",
        year: "2020",
      },
    ],
  })

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false)
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <AuthGuard requiredRole="client">
      <LayoutWrapper userRole="client">
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Mon Profil</h1>
              <p className="text-muted-foreground">Gérez vos informations professionnelles et préférences</p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>Enregistrer</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Modifier le Profil</Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Overview */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{profile.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Télécharger CV
                </Button>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de Base</CardTitle>
                  <CardDescription>Vos coordonnées personnelles et de contact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom Complet</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre Professionnel</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Compétences
                  </CardTitle>
                  <CardDescription>Vos compétences techniques et professionnelles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        {isEditing && (
                          <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ajouter une compétence"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      />
                      <Button onClick={addSkill}>Ajouter</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Expérience Professionnelle
                  </CardTitle>
                  <CardDescription>Votre historique professionnel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-primary/20 pl-4 space-y-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">{exp.duration}</p>
                      </div>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="outline" className="w-full bg-transparent">
                      Ajouter une Expérience
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Formation
                  </CardTitle>
                  <CardDescription>Votre parcours éducatif</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-primary/20 pl-4 space-y-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.school}</p>
                        <p className="text-xs text-muted-foreground">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="outline" className="w-full bg-transparent">
                      Ajouter une Formation
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
