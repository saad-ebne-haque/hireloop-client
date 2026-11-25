
import { requireDashboardRole } from "@/lib/dashboard-routing"

export default async function RecruiterDashboardPage() {
    await requireDashboardRole("recruiter")

    return <></>
}