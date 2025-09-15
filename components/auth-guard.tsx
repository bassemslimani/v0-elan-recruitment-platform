"use client"

import type React from "react"

import { useAuth, type UserRole } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: UserRole
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole, redirectTo = "/auth/login" }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole && user.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user role
        switch (user.role) {
          case "client":
            router.push("/dashboard")
            break
          case "company":
            router.push("/company/dashboard")
            break
          case "admin":
            router.push("/admin/dashboard")
            break
        }
        return
      }
    }
  }, [user, loading, requiredRole, router, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}
