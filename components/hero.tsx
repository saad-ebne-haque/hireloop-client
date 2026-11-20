import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseBusiness,
  ChartNoAxesColumn,
  MapPin,
  Search,
  Star,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const stats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: BriefcaseBusiness, value: "50K", label: "Active Jobs" },
  { icon: ChartNoAxesColumn, value: "12K", label: "Companies" },
  { icon: UsersRound, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-20 overflow-hidden bg-[#010102] text-white sm:-mt-[88px] lg:-mt-[98px]"
    >
      {/* Globe backdrop. The image starts at the top of the page, behind the navbar. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <Image
          src="/images/globe.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_0%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(43,43,45,0.95)_0%,rgba(19,19,21,0.95)_50%,rgba(43,43,45,0.95)_100%)] [mask-image:linear-gradient(to_bottom,#000_0%,#000_45%,transparent_65%)]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#010102]" />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 pt-[144px] pb-16 sm:px-8 sm:pt-[184px] sm:pb-20 lg:px-[60px] lg:pt-[274px] lg:pb-[120px]">
        <div className="mx-auto flex w-full max-w-[784px] flex-col items-center text-center">
          {/* Announcement badge */}
          <div className="flex h-[50px] items-center justify-center">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-transparent to-white/25 sm:w-[65px]"
            />
            <div className="flex h-12 items-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(180deg,#2e2e2f_0%,#0b0b0c_60%,#010102_100%)] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] sm:gap-4 sm:px-[23px]">
              <Image
                src="/images/badge-briefcase.png"
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0"
              />
              <p className="font-mono-display text-[13px] whitespace-nowrap text-white sm:text-lg lg:text-xl">
                <span className="font-bold">50,000+</span> new jobs this month
              </p>
            </div>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-transparent to-white/25 sm:w-[65px]"
            />
          </div>

          <h1
            id="hero-title"
            className="mt-8 font-display text-[2.25rem] leading-[1.15] font-bold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[56px]"
          >
            Find Your Dream Job Today
          </h1>

          <p className="mt-4 max-w-[784px] text-base leading-[1.6] text-pretty text-white/70 sm:text-lg lg:text-xl">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          {/* Search */}
          <form
            action="/jobs"
            className="mt-10 w-full rounded-[16px] border border-white/20 bg-[#101010] p-2 transition-colors focus-within:border-white/40 sm:mt-12 sm:flex sm:h-16 sm:items-center sm:pr-2 sm:pl-6 lg:grid lg:grid-cols-[316px_48px_316px_24px_48px] lg:gap-0 lg:p-0 lg:pr-[7px] lg:pl-[23px]"
          >
            <div className="flex h-12 min-w-0 flex-1 items-center gap-3 px-3 sm:h-auto sm:px-0 lg:gap-2">
              <Search
                aria-hidden="true"
                className="size-6 shrink-0 text-white/75"
              />
              <label htmlFor="hero-job-query" className="sr-only">
                Job title, skill or company
              </label>
              <input
                id="hero-job-query"
                name="q"
                type="text"
                autoComplete="off"
                placeholder="Job title, skill or company"
                className="w-full min-w-0 bg-transparent text-base leading-[1.7] text-white outline-none placeholder:text-white/45"
              />
            </div>

            <div
              aria-hidden="true"
              className="mx-3 my-2 h-px shrink-0 bg-white/20 sm:mx-0 sm:my-0 sm:h-6 sm:w-px lg:justify-self-center"
            />

            <div className="flex h-12 min-w-0 flex-1 items-center gap-3 px-3 sm:h-auto sm:px-0 lg:gap-2">
              <MapPin
                aria-hidden="true"
                className="size-6 shrink-0 text-white/75"
              />
              <label htmlFor="hero-location" className="sr-only">
                Location or Remote
              </label>
              <input
                id="hero-location"
                name="location"
                type="text"
                autoComplete="off"
                placeholder="Location or Remote"
                className="w-full min-w-0 bg-transparent text-base leading-[1.7] text-white outline-none placeholder:text-white/45"
              />
            </div>

            <Button
              type="submit"
              aria-label="Search jobs"
              className="mt-2 h-12 w-full rounded-[12px] bg-brand text-brand-foreground hover:bg-brand/90 sm:mt-0 sm:ml-1 sm:size-12 sm:shrink-0 lg:col-start-5 lg:ml-0"
            >
              <Search aria-hidden="true" className="size-6" />
            </Button>
          </form>

          {/* Trending */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span className="text-sm whitespace-nowrap sm:text-base">
              Trending Position
            </span>
            {trendingPositions.map((position) => (
              <Link
                key={position}
                href={`/jobs?q=${encodeURIComponent(position)}`}
                className="rounded-full border border-white/10 bg-[#1a1a1b] px-3.5 py-1.5 text-sm whitespace-nowrap text-white/90 transition-colors outline-none hover:border-white/25 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {position}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats. The extra space on large screens leaves room for the globe artwork. */}
        <ul className="mt-16 grid grid-cols-2 gap-3 sm:mt-24 sm:gap-4 lg:mt-[512px] lg:grid-cols-4 lg:gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <li
              key={label}
              className="flex min-h-[150px] flex-col rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#010102_0%,#19191a_100%)] p-5 sm:min-h-[200px] sm:p-6 lg:min-h-[254px]"
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-5 text-white sm:size-6"
              />
              <div className="mt-auto pt-6">
                <p className="font-stat text-[2.25rem] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-5xl lg:text-[56px]">
                  {value}
                </p>
                <p className="mt-2 font-stat-label text-sm text-white/90 sm:mt-3 sm:text-base lg:mt-4 lg:text-lg">
                  {label}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
