"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth"
import { CreditCard, Lock, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [processing, setProcessing] = useState(false)
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })
  const [billingData, setBillingData] = useState({
    email: user?.email || "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const plan = searchParams.get("plan") || ""
  const billing = searchParams.get("billing") || "monthly"

  const planDetails = {
    "client-gratuit": { name: "Gratuit", price: 0, type: "Chercheur d'Emploi" },
    "client-premium": { name: "Premium", price: billing === "yearly" ? 25000 : 2500, type: "Chercheur d'Emploi" },
    "company-débutant": { name: "Débutant", price: billing === "yearly" ? 120000 : 12000, type: "Entreprise" },
    "company-professionnel": {
      name: "Professionnel",
      price: billing === "yearly" ? 250000 : 25000,
      type: "Entreprise",
    },
    "company-entreprise": { name: "Entreprise", price: billing === "yearly" ? 600000 : 60000, type: "Entreprise" },
  }

  const currentPlan = planDetails[plan as keyof typeof planDetails]
  const tax = currentPlan ? Math.round(currentPlan.price * 0.19) : 0 // 19% TVA in Algeria
  const total = currentPlan ? currentPlan.price + tax : 0

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, this would integrate with Stripe/PayPal
    console.log("Processing payment:", {
      plan,
      billing,
      amount: total,
      paymentMethod,
      cardData,
      billingData,
    })

    setProcessing(false)
    router.push("/payment/success")
  }

  if (!currentPlan) {
    return (
      <LayoutWrapper userRole={user?.role}>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Plan Invalide</h2>
              <p className="text-muted-foreground mb-4">Le plan sélectionné n'a pas pu être trouvé.</p>
              <Button asChild>
                <Link href="/pricing">Voir les Tarifs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper userRole={user?.role}>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pricing">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux Tarifs
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Finaliser Votre Achat</h1>
              <p className="text-muted-foreground">Paiement sécurisé par ELAN</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Informations de Paiement
                </CardTitle>
                <CardDescription>Vos informations de paiement sont sécurisées et cryptées</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method */}
                  <div className="space-y-4">
                    <Label>Méthode de Paiement</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 border rounded-lg flex items-center gap-2 ${
                          paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <CreditCard className="h-5 w-5" />
                        <span>Carte de Crédit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`p-4 border rounded-lg flex items-center gap-2 ${
                          paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <div className="w-5 h-5 bg-blue-600 rounded"></div>
                        <span>PayPal</span>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Numéro de Carte</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Date d'Expiration</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={cardData.cvc}
                            onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nom du Titulaire</Label>
                        <Input
                          id="cardName"
                          placeholder="Ahmed Benali"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Billing Information */}
                  <div className="space-y-4">
                    <Label>Informations de Facturation</Label>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={billingData.email}
                          onChange={(e) => setBillingData({ ...billingData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Select
                          value={billingData.country}
                          onValueChange={(value) => setBillingData({ ...billingData, country: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le pays" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dz">Algérie</SelectItem>
                            <SelectItem value="ma">Maroc</SelectItem>
                            <SelectItem value="tn">Tunisie</SelectItem>
                            <SelectItem value="fr">France</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          placeholder="123 Rue de la Liberté"
                          value={billingData.address}
                          onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Ville</Label>
                          <Input
                            id="city"
                            placeholder="Alger"
                            value={billingData.city}
                            onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Code Postal</Label>
                          <Input
                            id="postalCode"
                            placeholder="16000"
                            value={billingData.postalCode}
                            onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      J'accepte les{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Conditions d'Utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Politique de Confidentialité
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={processing}>
                    {processing ? "Traitement en cours..." : `Finaliser l'Achat - ${total.toLocaleString()} DA`}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la Commande</CardTitle>
                <CardDescription>Vérifiez les détails de votre abonnement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Plan {currentPlan.name}</h3>
                      <p className="text-sm text-muted-foreground">{currentPlan.type}</p>
                    </div>
                    <Badge variant="outline">{billing === "monthly" ? "Mensuel" : "Annuel"}</Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{currentPlan.price.toLocaleString()} DA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TVA (19%)</span>
                      <span>{tax.toLocaleString()} DA</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{total.toLocaleString()} DA</span>
                    </div>
                  </div>

                  {billing === "yearly" && (
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <Check className="h-4 w-4" />
                        <span className="text-sm font-medium">Vous économisez 20% avec la facturation annuelle!</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>• Essai gratuit de 14 jours inclus</p>
                    <p>• Annulation à tout moment</p>
                    <p>• Garantie de remboursement de 30 jours</p>
                    <p>• Traitement de paiement sécurisé</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Notice */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Vos informations de paiement sont cryptées et sécurisées</span>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
