
import Link from "next/link"
import { ArrowLeft, SearchX } from "lucide-react"

export default function DashboardNotFound() {
    return (
        <section className="flex min-h-[calc(100svh-8rem)] flex-col items-center justify-center px-4 py-12 text-center">
            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl border border-[#635BFF]/25 bg-[#635BFF]/10 text-[#9992FF]">
                <SearchX aria-hidden="true" className="size-6" />
            </div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[#9992FF] uppercase">
                Error 404
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#EDEDEF]">
                Dashboard page not found
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#A0A0AB]">
                The dashboard page you requested does not exist or is not available.
            </p>
            <Link
                className="mt-7 inline-flex h-10 items-center gap-2 rounded-lg bg-[#635BFF] px-4 text-sm font-medium text-white transition-colors hover:bg-[#635BFF]/90"
                href="/dashboard"
            >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to dashboard
            </Link>
        </section>
    )
}