"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, MapPin, DollarSign, X } from "lucide-react"

export default function NewJobPage() {
  const router = useRouter()
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [benefits, setBenefits] = useState<string[]>([])

  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    salary: {
      min: "",
      max: "",
      currency: "DA",
    },
    description: "",
    requirements: "",
    responsibilities: "",
    remote: false,
    urgent: false,
  })

  const predefinedBenefits = [
    "Assurance Santé",
    "Assurance Dentaire",
    "Assurance Vision",
    "Retraite Complémentaire",
    "Congés Payés",
    "Télétravail",
    "Horaires Flexibles",
    "Stock Options",
    "Formation Professionnelle",
    "Abonnement Salle de Sport",
  ]

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const toggleBenefit = (benefit: string) => {
    setBenefits((prev) => (prev.includes(benefit) ? prev.filter((b) => b !== benefit) : [...prev, benefit]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to the backend
    console.log("Job data:", { ...jobData, skills, benefits })
    router.push("/company/jobs")
  }

  const handleSaveDraft = () => {
    // In a real app, this would save as draft
    console.log("Saving draft:", { ...jobData, skills, benefits })
    router.push("/company/jobs")
  }

  return (
    <AuthGuard requiredRole="company">
      <LayoutWrapper userRole="company">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Publier une Nouvelle Offre</h1>
              <p className="text-muted-foreground">
                Créez une nouvelle offre d'emploi pour attirer les meilleurs talents
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                Sauvegarder le Brouillon
              </Button>
              <Button onClick={handleSubmit}>Publier l'Offre</Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Job Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Détails de l'Emploi
                    </CardTitle>
                    <CardDescription>Informations de base sur le poste</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Titre du Poste *</Label>
                        <Input
                          id="title"
                          placeholder="ex. Développeur Frontend Senior"
                          value={jobData.title}
                          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Département</Label>
                        <Input
                          id="department"
                          placeholder="ex. Ingénierie"
                          value={jobData.department}
                          onChange={(e) => setJobData({ ...jobData, department: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Localisation *</Label>
                        <Input
                          id="location"
                          placeholder="ex. Alger, Algérie"
                          value={jobData.location}
                          onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type d'Emploi *</Label>
                        <Select value={jobData.type} onValueChange={(value) => setJobData({ ...jobData, type: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Temps plein">Temps plein</SelectItem>
                            <SelectItem value="Temps partiel">Temps partiel</SelectItem>
                            <SelectItem value="Contrat">Contrat</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                            <SelectItem value="Stage">Stage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Niveau d'Expérience</Label>
                        <Select
                          value={jobData.experience}
                          onValueChange={(value) => setJobData({ ...jobData, experience: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le niveau" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Débutant">Niveau Débutant</SelectItem>
                            <SelectItem value="Intermédiaire">Niveau Intermédiaire</SelectItem>
                            <SelectItem value="Senior">Niveau Senior</SelectItem>
                            <SelectItem value="Lead">Lead/Principal</SelectItem>
                            <SelectItem value="Exécutif">Exécutif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remote"
                          checked={jobData.remote}
                          onCheckedChange={(checked) => setJobData({ ...jobData, remote: checked as boolean })}
                        />
                        <Label htmlFor="remote">Télétravail disponible</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="urgent"
                          checked={jobData.urgent}
                          onCheckedChange={(checked) => setJobData({ ...jobData, urgent: checked as boolean })}
                        />
                        <Label htmlFor="urgent">Recrutement urgent</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Salary Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Rémunération
                    </CardTitle>
                    <CardDescription>Fourchette salariale et informations sur les avantages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salaryMin">Salaire Minimum</Label>
                        <Input
                          id="salaryMin"
                          type="number"
                          placeholder="1600000"
                          value={jobData.salary.min}
                          onChange={(e) =>
                            setJobData({ ...jobData, salary: { ...jobData.salary, min: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salaryMax">Salaire Maximum</Label>
                        <Input
                          id="salaryMax"
                          type="number"
                          placeholder="2400000"
                          value={jobData.salary.max}
                          onChange={(e) =>
                            setJobData({ ...jobData, salary: { ...jobData.salary, max: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Devise</Label>
                        <Select
                          value={jobData.salary.currency}
                          onValueChange={(value) =>
                            setJobData({ ...jobData, salary: { ...jobData.salary, currency: value } })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DA">DA</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Avantages</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {predefinedBenefits.map((benefit) => (
                          <div key={benefit} className="flex items-center space-x-2">
                            <Checkbox
                              id={benefit}
                              checked={benefits.includes(benefit)}
                              onCheckedChange={() => toggleBenefit(benefit)}
                            />
                            <Label htmlFor={benefit} className="text-sm">
                              {benefit}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Description du Poste</CardTitle>
                    <CardDescription>Informations détaillées sur le rôle</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description du Poste *</Label>
                      <Textarea
                        id="description"
                        placeholder="Décrivez le rôle, la culture d'entreprise, et ce qui rend cette opportunité passionnante..."
                        value={jobData.description}
                        onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                        rows={6}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">Responsabilités Clés</Label>
                      <Textarea
                        id="responsibilities"
                        placeholder="Listez les principales responsabilités et tâches..."
                        value={jobData.responsibilities}
                        onChange={(e) => setJobData({ ...jobData, responsibilities: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Exigences</Label>
                      <Textarea
                        id="requirements"
                        placeholder="Listez les qualifications, compétences et expérience requises..."
                        value={jobData.requirements}
                        onChange={(e) => setJobData({ ...jobData, requirements: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Required Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Compétences Requises</CardTitle>
                    <CardDescription>Ajoutez les compétences que les candidats devraient avoir</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ajouter une compétence"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill}>
                        Ajouter
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Aperçu</CardTitle>
                    <CardDescription>Comment votre offre apparaîtra aux candidats</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{jobData.title || "Titre du Poste"}</h3>
                      <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {jobData.location && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {jobData.location}
                        </Badge>
                      )}
                      {jobData.type && <Badge variant="outline">{jobData.type}</Badge>}
                      {jobData.remote && <Badge variant="outline">Télétravail</Badge>}
                    </div>
                    {(jobData.salary.min || jobData.salary.max) && (
                      <p className="text-sm font-medium text-primary">
                        {jobData.salary.min && jobData.salary.max
                          ? `${jobData.salary.min} DA - ${jobData.salary.max} DA`
                          : jobData.salary.min
                            ? `À partir de ${jobData.salary.min} DA`
                            : `Jusqu'à ${jobData.salary.max} DA`}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {jobData.description || "La description du poste apparaîtra ici..."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
