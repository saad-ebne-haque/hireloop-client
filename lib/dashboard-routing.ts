import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export const dashboardRoutes = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
} as const

export type DashboardRole = keyof typeof dashboardRoutes

export function getDashboardPath(role: unknown): string | null {
  if (
    typeof role !== "string" ||
    !Object.prototype.hasOwnProperty.call(dashboardRoutes, role)
  ) {
    return null
  }

  return dashboardRoutes[role as DashboardRole]
}

export async function requireDashboardRole(expectedRole: DashboardRole) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/login")
  }

  const dashboardPath = getDashboardPath(session.user.role)

  if (!dashboardPath) {
    redirect("/")
  }

  if (session.user.role !== expectedRole) {
    redirect(dashboardPath)
  }

  return session
}
