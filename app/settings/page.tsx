"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { Bell, Shield, User, CreditCard, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    jobAlerts: true,
    marketing: false,
  })

  const [preferences, setPreferences] = useState({
    jobTypes: ["Temps plein", "Contrat"],
    salaryRange: "2,000,000 - 3,500,000 DA",
    location: "Télétravail",
    experience: "Senior",
  })

  return (
    <AuthGuard requiredRole="client">
      <LayoutWrapper userRole="client">
        <div className="p-4 md:p-6 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Paramètres</h1>
            <p className="text-muted-foreground">Gérez vos préférences de compte et paramètres de confidentialité</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Paramètres du Compte
                </CardTitle>
                <CardDescription>Gérez vos informations de compte et préférences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse Email</Label>
                  <Input id="email" value={user?.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nom d'Affichage</Label>
                  <Input id="name" value={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Changer le Mot de Passe</Label>
                  <Button variant="outline" className="w-full bg-transparent">
                    Mettre à Jour le Mot de Passe
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  Apparence
                </CardTitle>
                <CardDescription>Personnalisez l'apparence d'ELAN</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Thème</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Choisissez les notifications que vous souhaitez recevoir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications Email</Label>
                    <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications push dans votre navigateur
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertes Emploi</Label>
                    <p className="text-sm text-muted-foreground">Être notifié des nouvelles offres correspondantes</p>
                  </div>
                  <Switch
                    checked={notifications.jobAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, jobAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Emails Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des mises à jour sur les nouvelles fonctionnalités
                    </p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Préférences d'Emploi</CardTitle>
                <CardDescription>Définissez vos préférences de recherche d'emploi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Types d'Emploi Préférés</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner les types d'emploi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Temps plein</SelectItem>
                      <SelectItem value="part-time">Temps partiel</SelectItem>
                      <SelectItem value="contract">Contrat</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fourchette Salariale</Label>
                  <Input value={preferences.salaryRange} />
                </div>

                <div className="space-y-2">
                  <Label>Localisation Préférée</Label>
                  <Input value={preferences.location} />
                </div>

                <div className="space-y-2">
                  <Label>Niveau d'Expérience</Label>
                  <Select value={preferences.experience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry">Débutant</SelectItem>
                      <SelectItem value="Mid">Intermédiaire</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Lead">Lead/Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Confidentialité et Sécurité
                </CardTitle>
                <CardDescription>Gérez vos paramètres de confidentialité et sécurité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Visibilité du Profil</Label>
                    <p className="text-sm text-muted-foreground">Permettre aux entreprises de trouver votre profil</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Authentification à Deux Facteurs</Label>
                    <p className="text-sm text-muted-foreground">Ajouter une couche de sécurité supplémentaire</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Activer
                  </Button>
                </div>

                <Button variant="destructive" className="w-full">
                  Supprimer le Compte
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Abonnement
                </CardTitle>
                <CardDescription>Gérez votre abonnement et facturation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Plan Gratuit</span>
                    <span className="text-sm text-muted-foreground">Actuel</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Visibilité de profil et candidatures limitées</p>
                  <Button className="w-full">Passer au Premium</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button>Enregistrer les Modifications</Button>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
