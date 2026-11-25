"use client"

import Link from "next/link"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"

export function ProfileAccountCard() {
  const { data: session, isPending, error } = authClient.useSession()
  const user = session?.user
  const fullName = user?.name.trim() || user?.email || ""
  const initials = fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="border-white/10 bg-[#19191d] text-white">
      <CardHeader>
        <CardTitle>Account information</CardTitle>
        <CardDescription className="text-white/55">
          Your name and email address associated with this account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <p className="text-sm text-white/60" role="status">
            Loading account information...
          </p>
        ) : error ? (
          <p className="text-sm text-white/70" role="alert">
            Unable to load account information. Please try again later.
          </p>
        ) : user ? (
          <div className="flex items-center gap-4">
            <Avatar className="size-14 ring-1 ring-white/15" size="lg">
              {user.image && <AvatarImage alt={fullName} src={user.image} />}
              <AvatarFallback className="bg-brand/20 font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-semibold">{fullName}</p>
              <p className="truncate text-sm text-white/55">{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/60">
            Sign in to view your account information.{" "}
            <Link
              className="font-semibold text-brand hover:text-brand/80"
              href="/login"
            >
              Sign in
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
