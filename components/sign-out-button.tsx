"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

type SignOutButtonProps = {
  onClick?: () => void
}

export function SignOutButton({ onClick }: SignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)
const router = useRouter();
  async function handleSignOut() {
    setIsSigningOut(true)

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            console.log("Signed out successfully");
            router.push('/login');
          },
          onError: (error) => {
            console.error("Sign out error:", error);
          }
        }
      })



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
