"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { CheckCircle, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function PaymentSuccessPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }
  }, [user, router])

  const getDashboardLink = () => {
    switch (user?.role) {
      case "client":
        return "/dashboard"
      case "company":
        return "/company/dashboard"
      case "admin":
        return "/admin/dashboard"
      default:
        return "/"
    }
  }

  return (
    <LayoutWrapper userRole={user?.role}>
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center">
            <CardHeader className="pb-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl">Paiement Réussi!</CardTitle>
              <CardDescription className="text-lg">
                Bienvenue dans ELAN Premium! Votre abonnement est maintenant actif.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-muted rounded-lg">
                <h3 className="font-semibold mb-4">Que se passe-t-il maintenant?</h3>
                <div className="space-y-3 text-sm text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Email de Confirmation</p>
                      <p className="text-muted-foreground">
                        Nous avons envoyé un email de confirmation avec votre reçu et les détails de l'abonnement.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Fonctionnalités Premium Débloquées</p>
                      <p className="text-muted-foreground">
                        Toutes les fonctionnalités premium sont maintenant disponibles dans votre tableau de bord.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Essai Gratuit de 14 Jours</p>
                      <p className="text-muted-foreground">
                        Votre essai gratuit commence maintenant. Vous ne serez pas facturé avant la fin de l'essai.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href={getDashboardLink()}>
                    Aller au Tableau de Bord
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le Reçu
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Besoin d'aide pour commencer?</p>
                <Link href="/support" className="text-primary hover:underline">
                  Contactez notre équipe de support
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Gérer l'Abonnement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Vous pouvez gérer votre abonnement, mettre à jour les méthodes de paiement ou annuler à tout moment
                  depuis vos paramètres.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/settings">Gérer l'Abonnement</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Obtenir de l'Aide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Vous avez des questions? Notre équipe de support est là pour vous aider à tirer le meilleur parti de
                  votre abonnement.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/support">Contacter le Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
