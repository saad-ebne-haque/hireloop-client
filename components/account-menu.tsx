"use client"

import Link from "next/link"
import { ChevronDown, LayoutDashboard, UserRound } from "lucide-react"

import { SignOutButton } from "@/components/sign-out-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type AccountMenuProps = {
  user: {
    name: string
    email: string
    image?: string | null
  }
  mobile?: boolean
  onDashboardNavigate?: () => void
  onProfileNavigate?: () => void
  onSignOutSelect?: () => void
}

export function AccountMenu({
  user,
  mobile = false,
  onDashboardNavigate,
  onProfileNavigate,
  onSignOutSelect,
}: AccountMenuProps) {
  const fullName = user.name.trim() || user.email
  const firstName = fullName.split(/\s+/)[0] || fullName
  const initials = fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={`Open ${firstName}'s account menu`}
            className={cn(
              "rounded-xl text-white hover:bg-white/10 hover:text-white",
              mobile
                ? "h-12 w-full justify-start gap-3 px-3"
                : "h-[52px] gap-2 px-2.5"
            )}
            variant="ghost"
          >
            <Avatar
              className="size-8 ring-1 ring-white/15"
              size="sm"
            >
              {user.image && (
                <AvatarImage alt={fullName} src={user.image} />
              )}
              <AvatarFallback className="bg-brand/20 text-xs font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-semibold">{firstName}</span>
            <ChevronDown aria-hidden="true" className="size-4 text-white/60" />
          </Button>
        }
      />
      <DropdownMenuContent
        align="end"
        className="w-72 rounded-xl border border-white/10 bg-[#1b1b1f] p-2 text-white shadow-xl shadow-black/30"
        side={mobile ? "top" : "bottom"}
        sideOffset={8}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-2.5 font-normal">
            <div className="flex items-center gap-3">
              <Avatar
                className="size-12 ring-1 ring-white/15"
                size="lg"
              >
                {user.image && (
                  <AvatarImage alt={fullName} src={user.image} />
                )}
                <AvatarFallback className="bg-brand/20 font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {fullName}
                </p>
                <p className="truncate text-xs text-white/55">{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1 bg-white/10" />
        <DropdownMenuItem
          className="cursor-pointer rounded-lg px-2.5 py-2 text-white/85 focus:bg-white/10 focus:text-white"
          render={
            <Link href="/dashboard" onClick={onDashboardNavigate} />
          }
        >
          <LayoutDashboard aria-hidden="true" className="size-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer rounded-lg px-2.5 py-2 text-white/85 focus:bg-white/10 focus:text-white"
          render={
            <Link href="/profile" onClick={onProfileNavigate} />
          }
        >
          <UserRound aria-hidden="true" className="size-4" />
          Profile
        </DropdownMenuItem>
        <SignOutButton onClick={onSignOutSelect} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
