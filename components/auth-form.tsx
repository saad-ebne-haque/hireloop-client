"use client"

import { type FormEvent } from "react"
import Link from "next/link"
import { ArrowRight, BriefcaseBusiness, LockKeyhole, Mail, UserRound } from "lucide-react"

import GoogleLoginBTN from "@/components/socialLogins/google/GoogleLoginBTN"
import { authClient } from "@/lib/auth-client"
import { redirect, useRouter } from "next/navigation"

type AuthFormProps = {
  mode: "login" | "register"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isRegister = mode === "register"


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formValues = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    )

    if (isRegister) {
      await authClient.signUp.email({
        email: formValues.email as string,
        password: formValues.password as string,
        name: formValues.fullName as string,
        fetchOptions: {
          onSuccess: (data) => {
            console.log('success', data);
            router.push('/');
            router.refresh();
          },
          onError: (error) => {
            console.error('error', error);
          }
        }
      })




      return;
    }
  }

  return (
    <main className="relative isolate flex min-h-[calc(100svh-90px)] items-center justify-center overflow-hidden bg-[#111113] px-4 py-12 text-white sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(92,83,254,0.2),transparent_52%)]"
      />

      <section className="w-full max-w-[460px] rounded-3xl border border-white/10 bg-[#19191d]/90 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-9">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/25">
            <BriefcaseBusiness aria-hidden="true" className="size-6" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-[34px]">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {isRegister
              ? "Join HireLoop and take the next step in your career."
              : "Sign in to continue your job search with HireLoop."}
          </p>
        </div>

        <div
          aria-label="Choose an account action"
          className="mb-6 grid grid-cols-2 rounded-xl bg-black/25 p-1"
          role="group"
        >
          <Link
            aria-current={!isRegister ? "page" : undefined}
            className={`rounded-lg px-3 py-2.5 text-center text-sm font-semibold transition-colors ${!isRegister
              ? "bg-white/10 text-white shadow-sm"
              : "text-white/55 hover:text-white"
              }`}
            href="/login"
          >
            Sign in
          </Link>
          <Link
            aria-current={isRegister ? "page" : undefined}
            className={`rounded-lg px-3 py-2.5 text-center text-sm font-semibold transition-colors ${isRegister
              ? "bg-white/10 text-white shadow-sm"
              : "text-white/55 hover:text-white"
              }`}
            href="/register"
          >
            Sign up
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label
                className="mb-2 block text-sm font-medium text-white/80"
                htmlFor="fullName"
              >
                Full name
              </label>
              <div className="relative">
                <UserRound
                  aria-hidden="true"
                  className="absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-white/40"
                />
                <input
                  autoComplete="name"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pr-4 pl-11 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand/70 focus:ring-2 focus:ring-brand/20"
                  id="fullName"
                  name="fullName"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label
              className="mb-2 block text-sm font-medium text-white/80"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-white/40"
              />
              <input
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pr-4 pl-11 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand/70 focus:ring-2 focus:ring-brand/20"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-white/80"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <LockKeyhole
                aria-hidden="true"
                className="absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-white/40"
              />
              <input
                autoComplete={
                  isRegister ? "new-password" : "current-password"
                }
                className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pr-4 pl-11 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand/70 focus:ring-2 focus:ring-brand/20"
                id="password"
                minLength={8}
                name="password"
                placeholder="At least 8 characters"
                required
                type="password"
              />
            </div>
          </div>

          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            type="submit"
          >
            {isRegister ? "Create account" : "Sign in"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>


        </form>

        <div className="my-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-medium text-white/45">OR</span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        </div>

        <GoogleLoginBTN />

        <p className="mt-3 text-center text-sm text-white/55">
          {isRegister ? "Already have an account?" : "New to HireLoop?"}{" "}
          <Link
            className="font-semibold text-brand hover:text-brand/80"
            href={isRegister ? "/login" : "/register"}
          >
            {isRegister ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </section>
    </main>
  )
}
