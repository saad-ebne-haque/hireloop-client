import { headers } from "next/headers"

import { auth } from "@/lib/auth"

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
])

type ImgBBUploadResponse = {
  success?: boolean
  data?: {
    url?: string
    delete_url?: string
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    return Response.json({ error: "Sign in to upload a job image." }, { status: 401 })
  }

  if (session.user.role !== "recruiter") {
    return Response.json(
      { error: "Only recruiters can upload job images." },
      { status: 403 }
    )
  }

  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return Response.json({ error: "The image upload was invalid." }, { status: 400 })
  }

  const image = formData.get("image")

  if (!(image instanceof File)) {
    return Response.json({ error: "Choose an image to upload." }, { status: 400 })
  }

  if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
    return Response.json(
      { error: "Choose a JPG, PNG, or WebP image." },
      { status: 400 }
    )
  }

  if (image.size > MAX_IMAGE_SIZE_BYTES) {
    return Response.json(
      { error: "The image must be 5 MB or smaller." },
      { status: 413 }
    )
  }

  const apiKey = process.env.IMGBB_API_KEY

  if (!apiKey) {
    return Response.json(
      { error: "Image uploads are not configured on the server." },
      { status: 500 }
    )
  }

  const uploadUrl = new URL("https://api.imgbb.com/1/upload")
  uploadUrl.searchParams.set("key", apiKey)

  const imageFormData = new FormData()
  imageFormData.set("image", image)

  let uploadResponse: Response

  try {
    uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      body: imageFormData,
      cache: "no-store",
    })
  } catch {
    return Response.json(
      { error: "Could not connect to the image upload service." },
      { status: 502 }
    )
  }

  let result: ImgBBUploadResponse

  try {
    result = (await uploadResponse.json()) as ImgBBUploadResponse
  } catch {
    return Response.json(
      { error: "The image upload service returned an invalid response." },
      { status: 502 }
    )
  }

  const imageUrl = result.data?.url
  const deleteUrl = result.data?.delete_url

  if (
    !uploadResponse.ok ||
    result.success !== true ||
    typeof imageUrl !== "string" ||
    typeof deleteUrl !== "string"
  ) {
    return Response.json(
      { error: "The image upload service could not upload this image." },
      { status: 502 }
    )
  }

  return Response.json({ url: imageUrl, deleteUrl })
}
