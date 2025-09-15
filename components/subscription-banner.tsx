"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { Crown, X, Zap } from "lucide-react"
import Link from "next/link"

interface SubscriptionBannerProps {
  userRole?: "client" | "company"
}

export function SubscriptionBanner({ userRole = "client" }: SubscriptionBannerProps) {
  const { user } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  // Don't show if user is already subscribed or banner is dismissed
  if (user?.isSubscribed || dismissed) {
    return null
  }

  const getUpgradeMessage = () => {
    if (userRole === "client") {
      return {
        title: "Débloquez les Fonctionnalités Premium",
        description: "Obtenez des candidatures illimitées, un support prioritaire et une correspondance avancée",
        cta: "Passer à Premium",
        icon: <Zap className="h-5 w-5" />,
      }
    } else {
      return {
        title: "Améliorez votre Recrutement",
        description:
          "Publiez des emplois illimités, accédez aux analyses avancées et trouvez les meilleurs talents plus rapidement",
        cta: "Passer à Professionnel",
        icon: <Crown className="h-5 w-5" />,
      }
    }
  }

  const message = getUpgradeMessage()

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">{message.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{message.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  Essai Gratuit
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{message.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm">
              <Link href="/pricing">{message.cta}</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setDismissed(true)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
