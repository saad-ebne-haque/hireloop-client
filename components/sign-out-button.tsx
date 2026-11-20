"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

type SignOutButtonProps = {
  onClick?: () => void
}

export function SignOutButton({ onClick }: SignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)

    try {
      const { error } = await authClient.signOut()

      if (error) {
        console.error("Sign out failed:", error)
        return
      }

      onClick?.()
    } catch (error) {
      console.error("Sign out failed:", error)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <DropdownMenuItem
      disabled={isSigningOut}
      onClick={handleSignOut}
      className="cursor-pointer rounded-lg px-2.5 py-2"
      variant="destructive"
    >
      <LogOut aria-hidden="true" className="size-4" />
      {isSigningOut ? "Signing out..." : "Sign out"}
    </DropdownMenuItem>
  )
}
