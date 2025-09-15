"use client"

import { Home, Search, User, Settings, Briefcase, Building2, Shield, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"

interface DesktopSidebarProps {
  userRole?: "client" | "company" | "admin"
}

export function DesktopSidebar({ userRole = "client" }: DesktopSidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const getNavItems = () => {
    switch (userRole) {
      case "client":
        return [
          { href: "/dashboard", icon: Home, label: "Tableau de bord" },
          { href: "/jobs", icon: Search, label: "Rechercher emplois" },
          { href: "/profile", icon: User, label: "Mon profil" },
          { href: "/settings", icon: Settings, label: "Paramètres" },
        ]
      case "company":
        return [
          { href: "/company/dashboard", icon: Home, label: "Tableau de bord" },
          { href: "/company/jobs", icon: Briefcase, label: "Offres d'emploi" },
          { href: "/company/candidates", icon: User, label: "Candidats" },
          { href: "/company/settings", icon: Settings, label: "Paramètres" },
        ]
      case "admin":
        return [
          { href: "/admin/dashboard", icon: Home, label: "Tableau de bord" },
          { href: "/admin/users", icon: User, label: "Utilisateurs" },
          { href: "/admin/companies", icon: Building2, label: "Entreprises" },
          { href: "/admin/settings", icon: Shield, label: "Panneau admin" },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  const handleLogout = () => {
    logout()
    window.location.href = "/auth/login"
  }

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-primary">ELAN</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <Icon className="h-5 w-5 mr-3" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-3" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </aside>
  )
}
