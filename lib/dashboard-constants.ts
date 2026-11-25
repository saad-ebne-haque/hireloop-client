export const dashboardRoutes = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
} as const

export type DashboardRole = keyof typeof dashboardRoutes

export function isDashboardRole(role: unknown): role is DashboardRole {
  return (
    typeof role === "string" &&
    Object.prototype.hasOwnProperty.call(dashboardRoutes, role)
  )
}

export function getDashboardPath(role: unknown): string | null {
  return isDashboardRole(role) ? dashboardRoutes[role] : null
}
