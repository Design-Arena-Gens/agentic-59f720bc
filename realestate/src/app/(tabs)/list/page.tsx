import Link from "next/link";
import { FiShield } from "react-icons/fi";
import { ListPropertyForm } from "@/components/listing/list-property-form";

export default function ListPropertyPage() {
  return (
    <div className="space-y-8 pb-6">
      <section className="rounded-[36px] border border-[var(--color-border)] bg-gradient-to-br from-[rgba(144,194,60,0.18)] via-white/80 to-[rgba(76,103,211,0.12)] px-6 py-8 shadow-[0_36px_70px_rgba(18,42,76,0.16)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-secondary)] backdrop-blur dark:bg-white/10">
              For verified owners
            </span>
            <h1 className="text-2xl font-semibold text-foreground">
              Publish your home to serious buyers across Nepal.
            </h1>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Our concierge cross-checks land ownership and design documents, integrating KYC scans so that your listing builds instant trust with diaspora and domestic buyers.
            </p>
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)] shadow-sm backdrop-blur hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:bg-white/10"
          >
            <FiShield className="text-lg" />
            Complete KYC
          </Link>
        </div>
      </section>
      <ListPropertyForm />
    </div>
  );
}
