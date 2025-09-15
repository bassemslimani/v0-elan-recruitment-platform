"use client"

import type React from "react"

import { MobileNav } from "./mobile-nav"
import { DesktopSidebar } from "./desktop-sidebar"

interface LayoutWrapperProps {
  children: React.ReactNode
  userRole?: "client" | "company" | "admin"
}

export function LayoutWrapper({ children, userRole }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar userRole={userRole} />

      <main className="md:ml-64 pb-16 md:pb-0">{children}</main>

      <MobileNav userRole={userRole} />
    </div>
  )
}
