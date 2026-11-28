import Link from "next/link"
import { Building2, MoreHorizontal, Plus, UsersRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { requireDashboardRole } from "@/lib/dashboard-routing"
import type { JobPostData } from "@/types/job-post-data"

type DemoJob = {
  id: string
  job: JobPostData
  companyName: string
  applicantCount: number
  datePosted: string
}

const sharedJobPostFields: Pick<
  JobPostData,
  "isApproved" | "description" | "coverImage" | "company"
> = {
  isApproved: true,
  description: {
    responsibilities: "Work with the team to deliver high-quality results.",
    requirements: "Relevant experience and strong communication skills.",
    benefits: "Flexible work and a supportive team.",
  },
  coverImage: null,
  company: {
    recruiterEmail: "recruiter@hireloop.test",
  },
}

const demoJobs: DemoJob[] = [
  {
    id: "frontend-developer",
    companyName: "Northstar Labs",
    applicantCount: 34,
    datePosted: "2026-11-24",
    job: {
      ...sharedJobPostFields,
      title: "Frontend Developer",
      category: "Engineering",
      jobType: "full-time",
      isActive: true,
      salary: { minimum: 25, maximum: 40, currency: "EUR" },
      location: {
        city: "Berlin",
        country: "Germany",
        isRemote: true,
      },
      applicationDeadline: "2026-12-15",
    },
  },
  {
    id: "senior-product-designer",
    companyName: "Form & Function",
    applicantCount: 21,
    datePosted: "2026-11-21",
    job: {
      ...sharedJobPostFields,
      title: "Senior Product Designer",
      category: "Design",
      jobType: "full-time",
      isActive: true,
      salary: { minimum: 55, maximum: 75, currency: "EUR" },
      location: {
        city: "Amsterdam",
        country: "Netherlands",
        isRemote: false,
      },
      applicationDeadline: "2026-12-20",
    },
  },
  {
    id: "devops-specialist",
    companyName: "Cloudline Systems",
    applicantCount: 18,
    datePosted: "2026-11-13",
    job: {
      ...sharedJobPostFields,
      title: "DevOps Specialist",
      category: "Engineering",
      jobType: "contract",
      isActive: true,
      salary: { minimum: 70, maximum: 90, currency: "EUR" },
      location: {
        city: "Dublin",
        country: "Ireland",
        isRemote: true,
      },
      applicationDeadline: "2027-01-30",
    },
  },
  {
    id: "product-marketing-lead",
    companyName: "Brightside",
    applicantCount: 12,
    datePosted: "2026-11-09",
    job: {
      ...sharedJobPostFields,
      title: "Product Marketing Lead",
      category: "Marketing",
      jobType: "full-time",
      isActive: true,
      salary: { minimum: 60, maximum: 80, currency: "GBP" },
      location: {
        city: "London",
        country: "United Kingdom",
        isRemote: false,
      },
      applicationDeadline: "2026-12-18",
    },
  },
  {
    id: "qa-automation-engineer",
    companyName: "Quality Works",
    applicantCount: 46,
    datePosted: "2026-10-01",
    job: {
      ...sharedJobPostFields,
      title: "QA Automation Engineer",
      category: "Engineering",
      jobType: "part-time",
      isActive: false,
      salary: { minimum: 35, maximum: 50, currency: "USD" },
      location: {
        city: "Seattle",
        country: "United States",
        isRemote: false,
      },
      applicationDeadline: "2026-10-30",
    },
  },
]

const jobTypeLabels: Record<JobPostData["jobType"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  remote: "Remote",
  contract: "Contract",
  internship: "Internship",
}

function formatCurrencyRange(job: JobPostData) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: job.salary.currency,
    maximumFractionDigits: 0,
  })

  return `${formatter.format(job.salary.minimum)} – ${formatter.format(job.salary.maximum)}`
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`))
}

export default async function RecruiterJobsPage() {
  await requireDashboardRole("recruiter")

  const activeJobCount = demoJobs.filter((item) => item.job.isActive).length
  const activeJobLimit = 10
  const jobLimitReached = activeJobCount >= activeJobLimit

  return (
    <main className="min-h-full bg-[#08080A] px-4 py-8 text-[#EDEDEF] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium text-[#A0A0AB]">
              Manage Jobs <span className="px-1 text-[#6E6E78]">/</span>{" "}
              Job Listings &amp; Postings
            </p>
            <h1 className="text-[28px] leading-9 font-semibold tracking-[-0.02em] sm:text-[32px] sm:leading-10">
              Manage Job Posts
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A0A0AB]">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-lg border border-[#222228] bg-[#0E0E11] px-4 py-2.5">
              <p className="text-[11px] font-medium tracking-[0.04em] text-[#6E6E78] uppercase">
                Plan usage
              </p>
              <p className="mt-1 text-sm font-medium text-[#EDEDEF]">
                <span className="text-[#9992FF]">{activeJobCount}</span> /{" "}
                {activeJobLimit} active jobs
              </p>
            </div>
            <Button
              render={<Link href="/dashboard/recruiter/jobs/new" />}
              disabled={jobLimitReached}
              className="h-10 rounded-xl bg-[#635BFF] px-4 text-white hover:bg-[#554DFA]"
            >
              <Plus aria-hidden="true" />
              New Job Post
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-[#232327] bg-[#151516]">
          <Table
            aria-label="Recruiter job posts"
            className="min-w-[1120px] text-sm"
          >
            <TableHeader className="bg-[#0B0B0C]">
              <TableRow className="border-b border-[#232327] hover:bg-transparent">
                <TableHead className="w-[230px] px-4 py-4 text-[11px] font-medium tracking-[0.04em] text-[#A0A0AB] uppercase">
                  Job Title &amp; Dept
                </TableHead>
                <TableHead className="w-[205px] px-4 py-4 text-[11px] font-medium tracking-[0.04em] text-[#A0A0AB] uppercase">
                  Company &amp; Location
                </TableHead>
                <TableHead className="w-[110px] px-4 py-4 text-[11px] font-medium tracking-[0.04em] text-[#A0A0AB] uppercase">
                  Type
                </TableHead>
                <TableHead className="w-[145px] px-4 py-4 text-[11px] font-medium tracking-[0.04em] text-[#A0A0AB] uppercase">
                  Compensation
                </TableHead>
                <TableHead className="w-[135px] px-4 py-4 text-[11px] font-medium tracking-[0.04em] text-[#A0A0AB] uppercase">
                  Applicants
                </TableHead>
                <TableHead className="w-[100px] px-4 py-4 text-[11px] font-medium tracking-[0.04em] text-[#A0A0AB] uppercase">
                  Status
                </TableHead>
                <TableHead className="w-[145px] px-4 py-4 text-[11px] font-medium tracking-[0.04em] text-[#A0A0AB] uppercase">
                  Deadline
                </TableHead>
                <TableHead className="w-[130px] px-4 py-4 text-[11px] font-medium tracking-[0.04em] text-[#A0A0AB] uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoJobs.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-[#232327] hover:bg-[#1A1A1F]"
                >
                  <TableCell className="px-4 py-4">
                    <div className="font-medium text-[#EDEDEF]">
                      {item.job.title}
                    </div>
                    <div className="mt-1 text-xs text-[#9992FF]">
                      {item.job.category}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-[#2A2A30] bg-[#1A1A1F] text-[#A0A0AB]">
                        <Building2 aria-hidden="true" className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-[#EDEDEF]">
                          {item.companyName}
                        </span>
                        <span className="mt-1 block truncate text-xs text-[#A0A0AB]">
                          {item.job.location.isRemote ? "Remote · " : ""}
                          {item.job.location.city},{" "}
                          {item.job.location.country}
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <span className="rounded-md border border-[#2A2A30] bg-[#1A1A1F] px-2 py-1 text-xs text-[#D4D4D8]">
                      {jobTypeLabels[item.job.jobType]}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 font-medium text-[#EDEDEF]">
                    {formatCurrencyRange(item.job)}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <span className="inline-flex items-center gap-2 text-[#D4D4D8]">
                      <UsersRound
                        aria-hidden="true"
                        className="size-4 text-[#A0A0AB]"
                      />
                      {item.applicantCount} Candidates
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <span
                      className={
                        item.job.isActive
                          ? "inline-flex items-center gap-1.5 rounded-full border border-[#22543D] bg-[#123D29] px-2.5 py-1 text-xs font-medium text-[#4ADE80]"
                          : "inline-flex items-center gap-1.5 rounded-full border border-[#34343A] bg-[#222228] px-2.5 py-1 text-xs font-medium text-[#A0A0AB]"
                      }
                    >
                      <span
                        className={
                          item.job.isActive
                            ? "size-1.5 rounded-full bg-[#4ADE80]"
                            : "size-1.5 rounded-full bg-[#6E6E78]"
                        }
                      />
                      {item.job.isActive ? "Active" : "Closed"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="text-[#EDEDEF]">
                      {formatDate(item.job.applicationDeadline)}
                    </div>
                    <div className="mt-1 text-xs text-[#6E6E78]">
                      Posted {formatDate(item.datePosted)}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-[#C4C4CC] hover:text-white"
                      >
                        Update
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`More actions for ${item.job.title}`}
                        className="text-[#A0A0AB]"
                      >
                        <MoreHorizontal aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}
