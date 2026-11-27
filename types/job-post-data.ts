export type JobType =
  | "full-time"
  | "part-time"
  | "remote"
  | "contract"
  | "internship"

export type Currency = "USD" | "BDT" | "EUR" | "GBP"

export type JobCoverImage = {
  url: string
  deleteUrl: string | null
}

export type JobPostData = {
  title: string
  category: string
  jobType: JobType
  isActive: boolean
  isApproved: boolean
  salary: {
    minimum: number
    maximum: number
    currency: Currency
  }
  location: {
    city: string
    country: string
    isRemote: boolean
  }
  applicationDeadline: string
  description: {
    responsibilities: string
    requirements: string
    benefits: string
  }
  coverImage: JobCoverImage | null
  company: {
    recruiterEmail: string
  }
}
