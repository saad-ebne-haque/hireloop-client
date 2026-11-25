
import { requireDashboardRole } from "@/lib/dashboard-routing"

export default async function SeekerDashboardPage() {
  await requireDashboardRole("seeker")

  return null
}