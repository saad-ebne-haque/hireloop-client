import { JobPostForm } from "@/components/dashboard/job-post-form"
import { requireDashboardRole } from "@/lib/dashboard-routing"

export default async function RecruiterNewJobPage() {
  const session = await requireDashboardRole("recruiter")

  return <JobPostForm recruiterEmail={session.user.email} />
}
