import type { ReactNode } from "react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { requireDashboardSession } from "@/lib/dashboard-routing"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { role, session } = await requireDashboardSession()

  return (
    <DashboardShell role={role} user={session.user}>
      {children}
    </DashboardShell>
  )
}
