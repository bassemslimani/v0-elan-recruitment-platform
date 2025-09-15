"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = {
    client: [
      {
        name: "Gratuit",
        description: "Parfait pour commencer",
        price: { monthly: 0, yearly: 0 },
        icon: <Star className="h-6 w-6" />,
        features: [
          "Créer un profil de base",
          "Postuler à 5 emplois par mois",
          "Recherche d'emploi de base",
          "Support par email",
        ],
        limitations: [
          "Visibilité limitée du profil",
          "Pas de support prioritaire",
          "Algorithme de correspondance de base",
        ],
        popular: false,
      },
      {
        name: "Premium",
        description: "Pour les chercheurs d'emploi sérieux",
        price: { monthly: 2500, yearly: 25000 }, // Converted to Algerian Dinars
        icon: <Zap className="h-6 w-6" />,
        features: [
          "Profil amélioré avec portfolio",
          "Candidatures d'emploi illimitées",
          "Recherche d'emploi avancée et filtres",
          "Examen prioritaire des candidatures",
          "Conseils d'optimisation de CV",
          "Ressources de préparation aux entretiens",
          "Support email prioritaire",
        ],
        limitations: [],
        popular: true,
      },
    ],
    company: [
      {
        name: "Débutant",
        description: "Pour les petites équipes",
        price: { monthly: 12000, yearly: 120000 }, // Converted to Algerian Dinars
        icon: <Star className="h-6 w-6" />,
        features: [
          "Publier jusqu'à 5 emplois",
          "Recherche de candidats de base",
          "Promotion d'emploi standard",
          "Support par email",
          "Analyses de base",
        ],
        limitations: ["Vues de candidats limitées", "Correspondance de base", "Support standard"],
        popular: false,
      },
      {
        name: "Professionnel",
        description: "Pour les entreprises en croissance",
        price: { monthly: 25000, yearly: 250000 },
        icon: <Zap className="h-6 w-6" />,
        features: [
          "Publications d'emplois illimitées",
          "Recherche avancée de candidats",
          "Promotion d'emploi prioritaire",
          "Analyses et insights détaillés",
          "Image de marque personnalisée",
          "Support prioritaire",
          "Messagerie en masse",
          "Outils de planification d'entretiens",
        ],
        limitations: [],
        popular: true,
      },
      {
        name: "Entreprise",
        description: "Pour les grandes organisations",
        price: { monthly: 60000, yearly: 600000 },
        icon: <Crown className="h-6 w-6" />,
        features: [
          "Tout dans Professionnel",
          "Gestionnaire de compte dédié",
          "Intégrations personnalisées",
          "Rapports avancés",
          "Solution en marque blanche",
          "Accès API",
          "Support téléphonique 24/7",
          "Intégration personnalisée",
        ],
        limitations: [],
        popular: false,
      },
    ],
  }

  return (
    <LayoutWrapper userRole="client">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choisissez Votre <span className="text-primary">Plan Parfait</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Débloquez tout le potentiel d'ELAN avec nos plans tarifaires flexibles conçus pour les chercheurs d'emploi
              et les entreprises.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={billingCycle === "monthly" ? "font-semibold" : "text-muted-foreground"}>Mensuel</span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={billingCycle === "yearly" ? "font-semibold" : "text-muted-foreground"}>
                Annuel
                <Badge variant="secondary" className="ml-2">
                  Économisez 20%
                </Badge>
              </span>
            </div>
          </div>
        </section>

        {/* Job Seeker Plans */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pour les Chercheurs d'Emploi</h2>
              <p className="text-muted-foreground">Trouvez l'emploi de vos rêves avec nos outils puissants</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.client.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Le Plus Populaire</Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">{plan.icon}</div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">
                        {plan.price[billingCycle].toLocaleString()} DA
                        {plan.price[billingCycle] > 0 && (
                          <span className="text-lg font-normal text-muted-foreground">
                            /{billingCycle === "monthly" ? "mois" : "an"}
                          </span>
                        )}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                      <Link href={`/payment/checkout?plan=client-${plan.name.toLowerCase()}&billing=${billingCycle}`}>
                        {plan.price[billingCycle] === 0 ? "Commencer Gratuitement" : "Commencer l'Essai Gratuit"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Plans */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pour les Entreprises</h2>
              <p className="text-muted-foreground">Trouvez les meilleurs talents pour votre équipe</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.company.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Le Plus Populaire</Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">{plan.icon}</div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">
                        {plan.price[billingCycle].toLocaleString()} DA
                        <span className="text-lg font-normal text-muted-foreground">
                          /{billingCycle === "monthly" ? "mois" : "an"}
                        </span>
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                      <Link href={`/payment/checkout?plan=company-${plan.name.toLowerCase()}&billing=${billingCycle}`}>
                        Commencer l'Essai Gratuit
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions Fréquemment Posées</h2>
              <p className="text-muted-foreground">Tout ce que vous devez savoir sur nos tarifs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Puis-je changer de plan à tout moment ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Oui, vous pouvez mettre à niveau ou rétrograder votre plan à tout moment. Les changements prennent
                    effet immédiatement.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Y a-t-il un essai gratuit ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Tous les plans payants sont accompagnés d'un essai gratuit de 14 jours. Aucune carte de crédit
                    requise pour commencer.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quels modes de paiement acceptez-vous ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous acceptons toutes les principales cartes de crédit, PayPal et les virements bancaires pour les
                    plans entreprise.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Puis-je annuler à tout moment ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Oui, vous pouvez annuler votre abonnement à tout moment. Vous continuerez à avoir accès jusqu'à la
                    fin de votre période de facturation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Offrez-vous des remboursements ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous offrons une garantie de remboursement de 30 jours pour tous les plans payants si vous n'êtes
                    pas satisfait.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Y a-t-il des frais d'installation ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Aucun frais d'installation pour aucun plan. Les clients entreprise bénéficient d'une intégration et
                    d'une assistance à l'installation gratuites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  )
}
