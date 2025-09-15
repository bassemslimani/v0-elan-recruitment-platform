"use client"

import { Home, Search, User, Settings, Briefcase, Building2, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  userRole?: "client" | "company" | "admin"
}

export function MobileNav({ userRole = "client" }: MobileNavProps) {
  const pathname = usePathname()

  const getNavItems = () => {
    switch (userRole) {
      case "client":
        return [
          { href: "/dashboard", icon: Home, label: "Accueil" },
          { href: "/jobs", icon: Search, label: "Emplois" },
          { href: "/profile", icon: User, label: "Profil" },
          { href: "/settings", icon: Settings, label: "Paramètres" },
        ]
      case "company":
        return [
          { href: "/company/dashboard", icon: Home, label: "Accueil" },
          { href: "/company/jobs", icon: Briefcase, label: "Emplois" },
          { href: "/company/candidates", icon: User, label: "Candidats" },
          { href: "/company/settings", icon: Settings, label: "Paramètres" },
        ]
      case "admin":
        return [
          { href: "/admin/dashboard", icon: Home, label: "Accueil" },
          { href: "/admin/users", icon: User, label: "Utilisateurs" },
          { href: "/admin/companies", icon: Building2, label: "Entreprises" },
          { href: "/admin/settings", icon: Shield, label: "Admin" },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
