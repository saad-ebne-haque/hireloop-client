import type { JobCoverImage } from "@/types/job-post-data"

type ImageUploadResponse = {
  url?: unknown
  deleteUrl?: unknown
  error?: unknown
}

export async function uploadJobCoverImage(
  file: File
): Promise<JobCoverImage> {
  const formData = new FormData()
  formData.set("image", file)

  const response = await fetch("/api/uploads/job-cover", {
    method: "POST",
    body: formData,
  })
  const result = (await response.json()) as ImageUploadResponse

  if (!response.ok) {
    const message =
      typeof result.error === "string"
        ? result.error
        : "The image upload failed. Please try again."

    throw new Error(message)
  }

  if (typeof result.url !== "string" || typeof result.deleteUrl !== "string") {
    throw new Error("The image upload response is missing image links.")
  }

  return {
    url: result.url,
    deleteUrl: result.deleteUrl,
  }
}
