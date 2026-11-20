
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Sign in | HireLoop",
  description: "Sign in to your HireLoop account.",
}

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session) {
    redirect("/")
  }

  return <AuthForm mode="login" />
}