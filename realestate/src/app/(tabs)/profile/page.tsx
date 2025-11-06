import { FiCheckCircle, FiLogOut, FiMapPin } from "react-icons/fi";
import { KycWorkflow } from "@/components/kyc/kyc-workflow";
import { RegionBadge } from "@/components/property/region-badge";
import { featuredProperties } from "@/data/properties";

export default function ProfilePage() {
  const saved = featuredProperties.slice(0, 2);

  return (
    <div className="space-y-8 pb-6">
      <section className="rounded-[36px] border border-[var(--color-border)] bg-gradient-to-br from-[rgba(44,140,125,0.14)] via-white/80 to-[rgba(248,139,92,0.16)] px-6 py-8 shadow-[0_36px_70px_rgba(18,42,76,0.16)]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-3xl bg-[color-mix(in_srgb,var(--color-secondary)_18%,white)] text-2xl font-semibold text-[var(--color-secondary)] shadow-inner flex items-center justify-center">
              BM
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Binita Maharjan</h1>
              <p className="text-sm text-[var(--color-muted)]">
                Investor · Kathmandu & Sydney · Prefers Pahad retreats
              </p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/70 bg-white/80 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)] hover:text-[var(--color-secondary)] dark:bg-white/10"
          >
            <FiLogOut />
            Sign out
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/50 bg-white/80 px-4 py-4 text-sm font-semibold text-[var(--color-secondary)] backdrop-blur dark:bg-white/5">
            <FiCheckCircle className="text-lg" />
            <p className="mt-2 text-xs font-medium text-[var(--color-muted)]">
              KYC progress · Submit to publish listings
            </p>
          </div>
          <div className="rounded-3xl border border-white/50 bg-white/80 px-4 py-4 text-sm font-semibold text-[var(--color-primary)] backdrop-blur dark:bg-white/5">
            4
            <p className="mt-2 text-xs font-medium text-[var(--color-muted)]">
              Shortlisted homes
            </p>
          </div>
          <div className="rounded-3xl border border-white/50 bg-white/80 px-4 py-4 text-sm font-semibold text-[var(--color-secondary)] backdrop-blur dark:bg-white/5">
            NPR 12.4 करोड़
            <p className="mt-2 text-xs font-medium text-[var(--color-muted)]">
              Saved budgets
            </p>
          </div>
        </div>
      </section>

      <KycWorkflow />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Saved homes</h2>
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Synchronized across devices
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {saved.map((property) => (
            <div
              key={property.id}
              className="rounded-[28px] border border-[var(--color-border)] bg-white/80 p-5 shadow-lg backdrop-blur dark:bg-white/5"
            >
              <div className="flex items-start gap-4">
                <div
                  className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${property.heroImage})` }}
                />
                <div className="space-y-1 text-sm">
                  <RegionBadge region={property.region} />
                  <h3 className="text-base font-semibold text-foreground">
                    {property.title}
                  </h3>
                  <p className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                    <FiMapPin className="text-base text-[var(--color-secondary)]" />
                    {property.location}
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">
                    {property.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
