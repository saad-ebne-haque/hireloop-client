"use client"

import Image from "next/image"
import {
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { LoaderCircle, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { uploadJobCoverImage } from "@/lib/actions/upload-job-cover"
import type {
  JobCoverImage,
  JobPostData,
  JobType,
} from "@/types/job-post-data"

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const CARD_CLASS_NAME = "border-[#222228] bg-[#0E0E11] text-[#EDEDEF]"
const LABEL_CLASS_NAME = "text-[#EDEDEF]"
const INPUT_CLASS_NAME =
  "h-10 border-[#222228] bg-[#0C0C0F] text-[#EDEDEF] placeholder:text-[#6E6E78]"
const SELECT_CLASS_NAME =
  "h-10 w-full border-[#222228] bg-[#0C0C0F] text-[#EDEDEF]"
const TEXTAREA_CLASS_NAME =
  "border-[#222228] bg-[#0C0C0F] text-[#EDEDEF] placeholder:text-[#6E6E78]"
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "remote", label: "Remote" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
] as const

const CURRENCIES = ["USD", "BDT", "EUR", "GBP"] as const

type JobPostFormProps = {
  recruiterEmail: string
}

type JobPostResponse = {
  success?: boolean
  message?: string
}

const darkFormTheme = {
  colorScheme: "dark",
  "--background": "#08080A",
  "--foreground": "#EDEDEF",
  "--card": "#0E0E11",
  "--card-foreground": "#EDEDEF",
  "--popover": "#141418",
  "--popover-foreground": "#EDEDEF",
  "--primary": "#635BFF",
  "--primary-foreground": "#FFFFFF",
  "--secondary": "#1A1A1F",
  "--secondary-foreground": "#EDEDEF",
  "--muted": "#141418",
  "--muted-foreground": "#A0A0AB",
  "--accent": "#222228",
  "--accent-foreground": "#EDEDEF",
  "--border": "#222228",
  "--input": "#222228",
  "--ring": "#9992FF",
  "--destructive": "#DC2626",
} as CSSProperties

function readFormText(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName)
  return typeof value === "string" ? value.trim() : ""
}

function readSalary(formData: FormData, fieldName: string) {
  const value = readFormText(formData, fieldName)
  const salary = Number(value)

  if (!value || !Number.isFinite(salary) || salary < 0) {
    throw new Error("Enter a valid salary range.")
  }

  return salary
}

export function collectJobPostFormData(
  formData: FormData,
  coverImage: JobCoverImage | null,
  recruiterEmail: string
): JobPostData {
  const title = readFormText(formData, "title")
  const category = readFormText(formData, "category")
  const jobTypeValue = readFormText(formData, "jobType")
  const currencyValue = readFormText(formData, "currency")
  const minimumSalary = readSalary(formData, "minimumSalary")
  const maximumSalary = readSalary(formData, "maximumSalary")
  const city = readFormText(formData, "city")
  const country = readFormText(formData, "country")
  const isRemote = readFormText(formData, "isRemote") === "true"
  const applicationDeadline = readFormText(formData, "applicationDeadline")
  const responsibilities = readFormText(formData, "responsibilities")
  const requirements = readFormText(formData, "requirements")
  const benefits = readFormText(formData, "benefits")

  const jobType = JOB_TYPES.find((item) => item.value === jobTypeValue)?.value
  const currency = CURRENCIES.find((item) => item === currencyValue)

  if (!title || !category || !applicationDeadline) {
    throw new Error("Complete all required job information.")
  }

  if (!jobType || !currency) {
    throw new Error("Choose a valid job type and salary currency.")
  }

  if (maximumSalary < minimumSalary) {
    throw new Error("Maximum salary must be greater than minimum salary.")
  }

  if (!isRemote && (!city || !country)) {
    throw new Error("Enter a city and country, or mark the job as remote.")
  }

  if (!responsibilities || !requirements) {
    throw new Error("Add the job responsibilities and requirements.")
  }

  return {
    title,
    category,
    jobType,
    isActive: true,
    isApproved: false,
    salary: {
      minimum: minimumSalary,
      maximum: maximumSalary,
      currency,
    },
    location: {
      city,
      country,
      isRemote,
    },
    applicationDeadline,
    description: {
      responsibilities,
      requirements,
      benefits,
    },
    coverImage,
    company: {
      recruiterEmail,
    },
  }
}

export function JobPostForm({ recruiterEmail }: JobPostFormProps) {
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState("")
  const [uploadedCoverImage, setUploadedCoverImage] =
    useState<JobCoverImage | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [isRemote, setIsRemote] = useState(false)
  const [jobType, setJobType] = useState<JobType>("full-time")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isRemotePosition = isRemote || jobType === "remote"
  const imagePreview = imagePreviewUrl || coverImageUrl
  const router = useRouter();
  useEffect(() => {
    if (!imagePreviewUrl) {
      return
    }

    return () => URL.revokeObjectURL(imagePreviewUrl)
  }, [imagePreviewUrl])

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      setFormError("Choose a JPG, PNG, or WebP image.")
      event.target.value = ""
      return
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setFormError("The image must be 5 MB or smaller.")
      event.target.value = ""
      return
    }

    const previewUrl = URL.createObjectURL(file)
    setFormError("")
    setCoverImageUrl("")
    setUploadedCoverImage(null)
    setCoverImageFile(file)
    setImagePreviewUrl(previewUrl)
  }

  function handleRemoveImage() {
    setCoverImageFile(null)
    setCoverImageUrl("")
    setUploadedCoverImage(null)
    setImagePreviewUrl(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    setFormError("")
    setIsSubmitting(true)

    try {
      const jobDetails = collectJobPostFormData(formData, null, recruiterEmail)
      let coverImage = uploadedCoverImage

      if (coverImageFile && !coverImage) {
        coverImage = await uploadJobCoverImage(coverImageFile)
        setUploadedCoverImage(coverImage)
        setCoverImageUrl(coverImage.url)
        setCoverImageFile(null)
        setImagePreviewUrl(null)

        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }

      const manualImageUrl = readFormText(formData, "coverImageUrl")

      if (!coverImage && manualImageUrl) {
        coverImage = {
          url: manualImageUrl,
          deleteUrl: null,
        }
      }

      const jobPostData = { ...jobDetails, coverImage }

      // Send the job data to the API.
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobPostData),
      });
      const result = (await response.json()) as JobPostResponse | null
      const responseMessage =
        typeof result?.message === "string" ? result.message : ""

      if (!response.ok || result?.success !== true) {
        throw new Error(responseMessage || "Could not post the job.")
      }
console.log(jobPostData);
      toast.success("Job posted successfully", {
        description: responseMessage || "Your job has been published.",
      })
      router.push("/dashboard/recruiter/jobs")
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Could not post the job. Please try again."

      setFormError(
        errorMessage
      )
      toast.error("Job post failed", {
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="mx-auto w-full max-w-[1080px] space-y-5 p-4 text-[#EDEDEF] sm:p-6"
      style={darkFormTheme}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 border-b border-[#222228] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs text-[#A0A0AB]">
              Manage Jobs /{" "}
              <span className="text-[#EDEDEF]">Create New Listing</span>
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#EDEDEF]">
              Post a New Job
            </h1>
            <p className="mt-1 text-sm text-[#A0A0AB]">
              Fill in the job details below. The form collects data but does not
              save it yet.
            </p>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="shrink-0 bg-[#635BFF] text-white hover:bg-[#5148E8]"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle aria-hidden="true" className="animate-spin" />
                Collecting...
              </>
            ) : (
              "Publish Job"
            )}
          </Button>
        </div>

        <Card className={CARD_CLASS_NAME}>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              <span className="mr-2 text-[#635BFF]">1.</span>Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="job-title" className={LABEL_CLASS_NAME}>
                Job title <span className="text-[#635BFF]">*</span>
              </Label>
              <Input
                id="job-title"
                name="title"
                placeholder="e.g. Senior Frontend Engineer"
                required
                className={INPUT_CLASS_NAME}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recruiter-email" className={LABEL_CLASS_NAME}>
                Recruiter email
              </Label>
              <Input
                id="recruiter-email"
                value={recruiterEmail}
                readOnly
                className={INPUT_CLASS_NAME}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-category" className={LABEL_CLASS_NAME}>
                Job category <span className="text-[#635BFF]">*</span>
              </Label>
              <Input
                id="job-category"
                name="category"
                placeholder="e.g. Software Development"
                required
                className={INPUT_CLASS_NAME}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="job-type" className={LABEL_CLASS_NAME}>
                Job type <span className="text-[#635BFF]">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {JOB_TYPES.map((item) => (
                  <Button
                    key={item.value}
                    type="button"
                    aria-pressed={jobType === item.value}
                    onClick={() => setJobType(item.value)}
                    className={
                      jobType === item.value
                        ? "border border-[#635BFF] bg-[#1A1A1F] text-[#EDEDEF]"
                        : "border border-transparent bg-[#1A1A1F] text-[#A0A0AB]"
                    }
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
              <input type="hidden" name="jobType" value={jobType} />
            </div>
          </CardContent>
        </Card>

        <Card className={CARD_CLASS_NAME}>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              <span className="mr-2 text-[#635BFF]">2.</span>
              Location, Compensation &amp; Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between rounded-lg bg-[#1A1A1F] p-3">
              <div>
                <Label htmlFor="remote-position" className={LABEL_CLASS_NAME}>
                  Remote work allowed
                </Label>
                <p className="mt-1 text-xs text-[#A0A0AB]">
                  Enable remote or distributed applications.
                </p>
              </div>
              <Switch
                id="remote-position"
                checked={isRemotePosition}
                disabled={jobType === "remote"}
                onCheckedChange={setIsRemote}
              />
              <input
                type="hidden"
                name="isRemote"
                value={isRemotePosition ? "true" : "false"}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="job-city" className={LABEL_CLASS_NAME}>
                  City{" "}
                  {!isRemotePosition && (
                    <span className="text-[#635BFF]">*</span>
                  )}
                </Label>
                <Input
                  id="job-city"
                  name="city"
                  placeholder="e.g. Dhaka"
                  required={!isRemotePosition}
                  disabled={isRemotePosition}
                  className={`${INPUT_CLASS_NAME} disabled:bg-[#141418]`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-country" className={LABEL_CLASS_NAME}>
                  Country{" "}
                  {!isRemotePosition && (
                    <span className="text-[#635BFF]">*</span>
                  )}
                </Label>
                <Input
                  id="job-country"
                  name="country"
                  placeholder="e.g. Bangladesh"
                  required={!isRemotePosition}
                  disabled={isRemotePosition}
                  className={`${INPUT_CLASS_NAME} disabled:bg-[#141418]`}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="application-deadline"
                  className={LABEL_CLASS_NAME}
                >
                  Application deadline <span className="text-[#635BFF]">*</span>
                </Label>
                <Input
                  id="application-deadline"
                  name="applicationDeadline"
                  type="date"
                  required
                  className={INPUT_CLASS_NAME}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="minimum-salary" className={LABEL_CLASS_NAME}>
                  Minimum salary <span className="text-[#635BFF]">*</span>
                </Label>
                <Input
                  id="minimum-salary"
                  name="minimumSalary"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="100000"
                  required
                  className={INPUT_CLASS_NAME}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maximum-salary" className={LABEL_CLASS_NAME}>
                  Maximum salary <span className="text-[#635BFF]">*</span>
                </Label>
                <Input
                  id="maximum-salary"
                  name="maximumSalary"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="140000"
                  required
                  className={INPUT_CLASS_NAME}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency" className={LABEL_CLASS_NAME}>
                  Currency <span className="text-[#635BFF]">*</span>
                </Label>
                <Select name="currency" defaultValue="USD">
                  <SelectTrigger id="currency" className={SELECT_CLASS_NAME}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141418] text-[#EDEDEF]">
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={CARD_CLASS_NAME}>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              <span className="mr-2 text-[#635BFF]">3.</span>
              Responsibilities &amp; Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="responsibilities" className={LABEL_CLASS_NAME}>
                Responsibilities <span className="text-[#635BFF]">*</span>
              </Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                placeholder="List the main responsibilities for this role."
                required
                className={`${TEXTAREA_CLASS_NAME} min-h-32`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements" className={LABEL_CLASS_NAME}>
                Requirements <span className="text-[#635BFF]">*</span>
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                placeholder="List the required skills and experience."
                required
                className={`${TEXTAREA_CLASS_NAME} min-h-32`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="benefits" className={LABEL_CLASS_NAME}>
                Benefits <span className="text-[#6E6E78]">(optional)</span>
              </Label>
              <Textarea
                id="benefits"
                name="benefits"
                placeholder="Share the benefits offered with this role."
                className={`${TEXTAREA_CLASS_NAME} min-h-24`}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={CARD_CLASS_NAME}>
          <CardHeader>
            <CardTitle className="text-lg">Job Cover Image</CardTitle>
            <CardDescription className="text-[#A0A0AB]">
              Upload an image or paste an image URL.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cover-image" className={LABEL_CLASS_NAME}>
                Cover image <span className="text-[#6E6E78]">(optional)</span>
              </Label>
              <Input
                ref={fileInputRef}
                id="cover-image"
                name="coverImageFile"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="h-auto min-h-10 border-[#222228] bg-[#0C0C0F] py-2 text-[#EDEDEF] file:mr-3 file:rounded-md file:bg-[#1A1A1F] file:px-3 file:py-1 file:text-[#EDEDEF]"
              />
              <p className="text-xs text-[#A0A0AB]">
                JPG, PNG, or WebP. Maximum file size: 5 MB. Uploaded images will
                fill in the URL field below.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover-image-url" className={LABEL_CLASS_NAME}>
                Image URL
              </Label>
              <Input
                id="cover-image-url"
                name="coverImageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={coverImageUrl}
                onChange={(event) => {
                  setCoverImageUrl(event.currentTarget.value)
                  setUploadedCoverImage(null)
                }}
                className={INPUT_CLASS_NAME}
              />
            </div>

            {imagePreview && (
              <div className="relative aspect-[16/7] overflow-hidden rounded-lg border border-[#222228] bg-[#141418]">
                <Image
                  src={imagePreview}
                  alt="Selected job cover preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 bg-[#1A1A1F] text-[#EDEDEF] shadow-sm hover:bg-[#222228]"
                >
                  <Trash2 aria-hidden="true" />
                  Remove image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {formError && (
          <p className="text-sm text-red-400" role="alert">
            {formError}
          </p>
        )}
      </form>
    </div>
  )
}
