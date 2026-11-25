import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { getDashboardPath } from "@/lib/dashboard-routing"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/login")
  }

  const dashboardPath = getDashboardPath(session.user.role)

  if (!dashboardPath) {
    redirect("/")
  }

  redirect(dashboardPath)
}
