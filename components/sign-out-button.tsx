"use client"

import { LogOut } from "lucide-react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

type SignOutButtonProps = {
  onClick?: () => void
}

export function SignOutButton({ onClick }: SignOutButtonProps) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="cursor-pointer rounded-lg px-2.5 py-2"
      variant="destructive"
    >
      <LogOut aria-hidden="true" className="size-4" />
      Sign out
    </DropdownMenuItem>
  )
}
