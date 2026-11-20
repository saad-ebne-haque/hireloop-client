
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Sign up | HireLoop",
  description: "Create a HireLoop account and discover your next opportunity.",
}

export default async function RegisterPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session) {
    redirect("/")
  }

  return <AuthForm mode="register" />
}