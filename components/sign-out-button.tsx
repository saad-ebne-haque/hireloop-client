"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { getErrorMessage } from "@/lib/error-message"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type SignOutButtonProps = {
  onClick?: () => void
}

export function SignOutButton({ onClick }: SignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()

  async function handleSignOut() {
    setIsSigningOut(true)

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out", {
              description: "You have signed out successfully.",
            })
            router.push("/login")
            onClick?.()
          },
          onError: (error) => {
            console.error("Sign out error:", error);
            toast.error("Sign out failed", {
              description: getErrorMessage(
                error,
                "Unable to sign out. Please try again."
              ),
            })
          }
        }
      })
    } catch (error) {
      console.error("Sign out failed:", error)
      toast.error("Sign out failed", {
        description: getErrorMessage(
          error,
          "Unable to sign out. Please try again."
        ),
      })
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
