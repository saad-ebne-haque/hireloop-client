
import { requireDashboardRole } from "@/lib/dashboard-routing"

export default async function AdminDashboardPage() {
    await requireDashboardRole("admin")

    return <></>
}