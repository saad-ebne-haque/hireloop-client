"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/pricing", label: "Pricing" },
] as const

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto w-full max-w-[1320px] px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10 lg:pt-6">
        <nav
          aria-label="Main"
          className="flex h-16 items-center justify-between rounded-2xl bg-nav pr-1.5 pl-4 text-nav-foreground shadow-lg shadow-black/10 sm:h-[68px] sm:pl-5 lg:h-[74px] lg:pr-2.5 lg:pl-6"
        >
          <Link
            href="/"
            className="inline-flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="HireLoop home"
          >
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={154}
              height={44}
              priority
              className="h-8 w-auto sm:h-9 lg:h-11"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center lg:flex">
            <ul className="flex items-center gap-7 xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-md text-base leading-none tracking-[-0.0125em] whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                      isActive(link.href)
                        ? "font-bold text-white"
                        : "font-normal text-white/90 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <span
              aria-hidden="true"
              className="mx-6 h-6 w-px bg-white/15 xl:mx-7"
            />

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-[52px] rounded-xl px-6 text-lg font-semibold text-brand shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-white/5 hover:text-brand"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants(),
                  "h-[52px] rounded-xl bg-brand px-6 text-lg font-medium text-brand-foreground hover:bg-brand/90"
                )}
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-10 text-white hover:bg-white/10 hover:text-white lg:hidden"
              )}
            >
              <MenuIcon className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85%] max-w-sm gap-0 border-white/10 bg-nav text-nav-foreground data-[side=right]:w-[85%] [&_[data-slot=sheet-close]]:text-white/70 [&_[data-slot=sheet-close]]:hover:bg-white/10 [&_[data-slot=sheet-close]]:hover:text-white"
            >
              <SheetHeader className="border-b border-white/10 px-5 py-4">
                <SheetTitle className="text-white">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  HireLoop navigation links and account actions
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-3 py-3 text-base tracking-[-0.0125em] transition-colors",
                      isActive(link.href)
                        ? "bg-white/10 font-bold text-white"
                        : "text-white/90 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 p-5">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-12 rounded-xl text-base font-semibold text-brand shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-white/5 hover:text-brand"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "h-12 rounded-xl bg-brand text-base font-medium text-brand-foreground hover:bg-brand/90"
                  )}
                >
                  Get Started
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
