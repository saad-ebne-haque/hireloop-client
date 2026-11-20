
import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign up | HireLoop",
  description: "Create a HireLoop account and discover your next opportunity.",
}

export default function RegisterPage() {
  return <AuthForm mode="register" />
}