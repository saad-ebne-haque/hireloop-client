import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import {
  dashboardRoutes,
  getDashboardPath,
  isDashboardRole,
  type DashboardRole,
} from "@/lib/dashboard-constants"

export { getDashboardPath }

export async function requireDashboardSession() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/login")
  }

  const role = session.user.role

  if (!isDashboardRole(role)) {
    redirect("/")
  }

  return { session, role }
}

export async function requireDashboardRole(expectedRole: DashboardRole) {
  const { session, role } = await requireDashboardSession()

  if (role !== expectedRole) {
    redirect(dashboardRoutes[role])
  }

  return session
}
