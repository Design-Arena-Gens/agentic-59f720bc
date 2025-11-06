import { FiBell, FiHeadphones } from "react-icons/fi";
import { SupportChat } from "@/components/messages/support-chat";

export default function MessagesPage() {
  return (
    <div className="space-y-8 pb-6">
      <section className="rounded-[36px] border border-[var(--color-border)] bg-gradient-to-br from-[rgba(76,103,211,0.18)] via-white/80 to-[rgba(44,140,125,0.12)] px-6 py-8 shadow-[0_36px_70px_rgba(18,42,76,0.16)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)] backdrop-blur dark:bg-white/10">
              Live concierge
            </span>
            <h1 className="text-2xl font-semibold text-foreground">
              Chat with a Nepal-based support specialist.
            </h1>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Coordinate property tours, request valuation reports, or follow up on KYC status. Enable notifications so we can alert you when a support guide replies.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl border border-white/60 bg-white/70 px-4 py-4 text-xs font-semibold text-[var(--color-muted)] backdrop-blur dark:bg-white/10">
            <div className="flex items-center gap-2 text-[var(--color-secondary)]">
              <FiBell className="text-base" />
              Push alerts enabled
            </div>
            <div className="flex items-center gap-2">
              <FiHeadphones className="text-base text-[var(--color-primary)]" />
              नेपाली, English & हिंदी assistance
            </div>
          </div>
        </div>
      </section>
      <SupportChat />
    </div>
  );
}
