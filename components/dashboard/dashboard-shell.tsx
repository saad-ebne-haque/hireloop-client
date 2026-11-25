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

const navigation: Record<DashboardRole, DashboardNavItem[]> = {
  seeker: [
    { href: "/dashboard/seeker", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/seeker/jobs", label: "Browse Jobs", icon: Search },
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
      label: "Overview",
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
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
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

function DashboardNavigation({
  role,
  pathname,
}: DashboardNavigationProps) {
  const { isMobile, setOpenMobile } = useSidebar()
  const items = navigation[role]

  return (
    <SidebarMenu aria-label={`${roleLabels[role]} dashboard`}>
      {items.map(({ href, icon: Icon, label }) => {
        const isActive =
          pathname === href ||
          (href !== dashboardRoutes[role] && pathname.startsWith(`${href}/`))

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
                "h-10 rounded-lg px-3 text-[13px] font-medium text-[#A0A0AB] hover:bg-[#141418] hover:text-[#EDEDEF] data-active:bg-[#635BFF]/15 data-active:text-[#B5B0FF] group-data-[collapsible=icon]:justify-center"
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
        <SidebarHeader className="h-[72px] flex-row items-center justify-center border-b border-[#222228] px-4 py-0 group-data-[collapsible=icon]:px-2">
          <Link
            aria-label="HireLoop dashboard home"
            className="flex min-w-0 items-center"
            href={dashboardRoutes[role]}
          >
            <BriefcaseBusiness
              aria-hidden="true"
              className="hidden size-6 shrink-0 text-[#EDEDEF] group-data-[collapsible=icon]:block"
            />
            <Image
              alt="HireLoop"
              className="h-8 w-auto group-data-[collapsible=icon]:hidden"
              height={44}
              priority
              src="/images/logo.png"
              width={154}
            />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-3 py-5">
            <SidebarGroupLabel className="px-2 text-[11px] font-medium tracking-[0.04em] text-[#6E6E78] uppercase">
              {roleLabels[role]} workspace
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <DashboardNavigation pathname={pathname} role={role} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="flex-row items-center gap-3 border-t border-[#222228] px-3 py-4 group-data-[collapsible=icon]:justify-center">
          <Avatar className="size-8 shrink-0 ring-1 ring-white/15" size="sm">
            {user.image && <AvatarImage alt={user.name} src={user.image} />}
            <AvatarFallback className="bg-[#222228] text-xs font-semibold text-[#EDEDEF]">
              {user.name.trim().slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-[13px] font-medium text-[#EDEDEF]">
              {user.name}
            </p>
            <p className="truncate text-xs text-[#6E6E78]">{user.email}</p>
          </div>
        </SidebarFooter>
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
          <AccountMenu user={user} />
        </header>
        <section className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}
