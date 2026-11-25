import { ProfileAccountCard } from "@/components/profile/profile-account-card"

export default function DashboardProfilePage() {
  return (
    <section className="mx-auto w-full max-w-3xl">
      <h2 className="text-2xl font-semibold text-[#EDEDEF]">My profile</h2>
      <p className="mt-2 text-sm text-[#A0A0AB]">
        View your HireLoop account information.
      </p>
      <div className="mt-6">
        <ProfileAccountCard />
      </div>
    </section>
  )
}
