"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react"
import type { CSSProperties } from "react"

import { AccountMenu } from "@/components/account-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  dashboardRoutes,
  type DashboardRole,
} from "@/lib/dashboard-constants"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type DashboardUser = {
  name: string
  email: string
  image?: string | null
}

type DashboardNavItem = {
  href: string
  label: string
  icon: LucideIcon
}

const roleLabels: Record<DashboardRole, string> = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Admin",
}

function getUserInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

const navigation: Record<DashboardRole, DashboardNavItem[]> = {
  seeker: [
    { href: "/dashboard/seeker", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/seeker/jobs", label: "Jobs", icon: Search },
    { href: "/dashboard/seeker/saved", label: "Saved Jobs", icon: Bookmark },
    {
      href: "/dashboard/seeker/applications",
      label: "Applications",
      icon: FileText,
    },
    {
      href: "/dashboard/seeker/billing",
      label: "Billing",
      icon: CreditCard,
    },
    { href: "/dashboard/seeker/settings", label: "Settings", icon: Settings },
  ],
  recruiter: [
    {
      href: "/dashboard/recruiter",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/recruiter/company",
      label: "My Company",
      icon: Building2,
    },
    {
      href: "/dashboard/recruiter/jobs",
      label: "Manage Jobs",
      icon: BriefcaseBusiness,
    },
    {
      href: "/dashboard/recruiter/jobs/new",
      label: "Post a Job",
      icon: Plus,
    },
    {
      href: "/dashboard/recruiter/billing",
      label: "Billing",
      icon: CreditCard,
    },
    {
      href: "/dashboard/recruiter/settings",
      label: "Settings",
      icon: Settings,
    },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    { href: "/dashboard/admin/companies", label: "Companies", icon: Building2 },
    {
      href: "/dashboard/admin/jobs",
      label: "Jobs",
      icon: BriefcaseBusiness,
    },
    {
      href: "/dashboard/admin/payments",
      label: "Payments",
      icon: CreditCard,
    },
    { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ],
}

type DashboardNavigationProps = {
  role: DashboardRole
  pathname: string
}

type DashboardProfileLinkProps = {
  role: DashboardRole
  pathname: string
  user: DashboardUser
}

function DashboardProfileLink({
  role,
  pathname,
  user,
}: DashboardProfileLinkProps) {
  const { isMobile, setOpenMobile } = useSidebar()
  const isActive = pathname === "/dashboard/profile"
  const displayName = user.name.trim() || user.email

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className="flex min-w-0 items-center gap-2.5 rounded-lg border border-[#222228] bg-[#141418] px-2.5 py-2.5 transition-colors hover:bg-[#1A1A1F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9992FF] group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-1"
      href="/dashboard/profile"
      onClick={() => {
        if (isMobile) {
          setOpenMobile(false)
        }
      }}
      title={`${displayName} — ${roleLabels[role]}`}
    >
      <Avatar className="size-7 shrink-0" size="sm">
        {user.image && <AvatarImage alt={displayName} src={user.image} />}
        <AvatarFallback className="bg-[#222228] text-[10px] font-medium text-[#EDEDEF]">
          {getUserInitials(displayName)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 group-data-[collapsible=icon]:hidden">
        <p className="truncate text-xs font-medium text-[#EDEDEF]">
          {displayName}
        </p>
        <p className="truncate text-[10px] text-[#6E6E78]">
          {roleLabels[role]}
        </p>
      </div>
    </Link>
  )
}

function DashboardNavigation({
  role,
  pathname,
}: DashboardNavigationProps) {
  const { isMobile, setOpenMobile } = useSidebar()
  const items = navigation[role]
  const activeHref = getActiveDashboardItem(role, pathname).href

  return (
    <SidebarMenu aria-label={`${roleLabels[role]} dashboard`}>
      {items.map(({ href, icon: Icon, label }) => {
        const isActive = href === activeHref

        return (
          <SidebarMenuItem key={href}>
            <SidebarMenuButton
              isActive={isActive}
              render={
                <Link
                  aria-current={isActive ? "page" : undefined}
                  href={href}
                  onClick={() => {
                    if (isMobile) {
                      setOpenMobile(false)
                    }
                  }}
                />
              }
              tooltip={label}
              className={cn(
                "relative h-10 rounded-lg px-3 text-[13px] font-medium text-[#A0A0AB] before:absolute before:top-1/2 before:left-0 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-r before:bg-[#635BFF] before:opacity-0 before:content-[''] hover:bg-[#141418] hover:text-[#EDEDEF] data-active:bg-[#222228] data-active:text-[#EDEDEF] data-active:before:opacity-100 group-data-[collapsible=icon]:justify-center"
              )}
            >
              <Icon aria-hidden="true" className="size-[18px] shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">
                {label}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

function getActiveDashboardItem(role: DashboardRole, pathname: string) {
  if (pathname === "/dashboard/profile") {
    return {
      href: "/dashboard/profile",
      label: "Profile",
      icon: UserRound,
    }
  }

  return (
    [...navigation[role]]
      .filter(
        (item) =>
          pathname === item.href ||
          (item.href !== dashboardRoutes[role] &&
            pathname.startsWith(`${item.href}/`))
      )
      .sort((first, second) => second.href.length - first.href.length)[0] ??
    navigation[role][0]
  )
}

type DashboardShellProps = {
  role: DashboardRole
  user: DashboardUser
  children: React.ReactNode
}

export function DashboardShell({
  role,
  user,
  children,
}: DashboardShellProps) {
  const pathname = usePathname()
  const activeItem = getActiveDashboardItem(role, pathname)
  const sidebarStyle = {
    "--sidebar-width": "248px",
    "--sidebar-width-icon": "76px",
    "--sidebar": "#08080A",
    "--sidebar-foreground": "#EDEDEF",
    "--sidebar-border": "#222228",
    "--sidebar-accent": "#141418",
    "--sidebar-accent-foreground": "#EDEDEF",
    "--sidebar-primary": "#635BFF",
    "--sidebar-primary-foreground": "#FFFFFF",
    "--sidebar-ring": "#9992FF",
    fontFamily: "var(--font-inter), sans-serif",
  } as CSSProperties

  return (
    <SidebarProvider
      className="min-h-svh bg-[#08080A] text-[#EDEDEF]"
      style={sidebarStyle}
    >
      <Sidebar
        collapsible="icon"
        className="border-[#222228] bg-[#08080A] text-[#EDEDEF]"
      >
        <SidebarHeader className="gap-4 px-3 pt-5 pb-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
          <Link
            aria-label="HireLoop dashboard home"
            className="flex min-h-8 min-w-0 items-center px-2"
            href={dashboardRoutes[role]}
          >
            <BriefcaseBusiness
              aria-hidden="true"
              className="hidden size-6 shrink-0 text-[#EDEDEF] group-data-[collapsible=icon]:block"
            />
            <Image
              alt="HireLoop"
              className="h-7 w-auto group-data-[collapsible=icon]:hidden"
              height={44}
              priority
              src="/images/logo.png"
              width={154}
            />
          </Link>
          {role === "admin" ? (
            <p className="px-2 text-xs text-[#6E6E78] group-data-[collapsible=icon]:hidden">
              Admin Console
            </p>
          ) : (
            <DashboardProfileLink
              pathname={pathname}
              role={role}
              user={user}
            />
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-3 py-2">
            <SidebarGroupLabel className="sr-only">
              {roleLabels[role]} dashboard
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <DashboardNavigation pathname={pathname} role={role} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {role === "admin" && (
          <SidebarFooter className="px-3 pb-3">
            <DashboardProfileLink
              pathname={pathname}
              role={role}
              user={user}
            />
          </SidebarFooter>
        )}
      </Sidebar>

      <SidebarInset className="min-h-svh bg-[#08080A] text-[#EDEDEF]">
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[#222228] bg-[#08080A]/95 px-4 backdrop-blur sm:px-6 lg:h-[72px] lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger
              aria-label="Toggle dashboard sidebar"
              className="text-[#A0A0AB] hover:bg-[#141418] hover:text-[#EDEDEF]"
            />
            <div className="min-w-0">
              <p className="hidden text-[11px] font-medium tracking-[0.04em] text-[#6E6E78] uppercase sm:block">
                {roleLabels[role]}
              </p>
              <h1 className="truncate text-base font-semibold text-[#EDEDEF]">
                {activeItem.label}
              </h1>
            </div>
          </div>
          <AccountMenu user={user} profileHref="/dashboard/profile" />
        </header>
        <section className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}
