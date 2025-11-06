"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCompass } from "react-icons/fi";
import {
  featuredProperties,
  recentProperties,
} from "@/data/properties";
import { PropertyCard } from "@/components/property/property-card";
import { RegionStrip } from "@/components/regions/region-strip";

export default function HomePage() {
  return (
    <div className="space-y-10 pb-4">
      <section className="relative overflow-hidden rounded-[36px] border border-white/30 bg-gradient-to-br from-[rgba(73,109,211,0.16)] via-[rgba(44,140,125,0.12)] to-[rgba(248,139,92,0.18)] px-6 py-10 shadow-[0_40px_80px_rgba(19,47,89,0.18)]">
        <div className="absolute -left-40 top-10 hidden h-[360px] w-[360px] rounded-full bg-[rgba(140,214,103,0.28)] blur-3xl md:block" />
        <div className="absolute -right-24 -top-20 hidden h-[320px] w-[320px] rounded-full bg-[rgba(70,110,230,0.32)] blur-3xl md:block" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-secondary)] backdrop-blur-sm dark:bg-white/10"
            >
              Nepal’s Landscape Smart Living
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
            >
              Curated homes across the Terai, Pahad & Himal designed for modern
              Nepalese aspirations.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-base leading-relaxed text-[var(--color-muted)]"
            >
              Discover immersive property stories, geo-aware search, and a
              digitised KYC to unlock trusted transactions tailored to Nepal’s
              geography.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/30 transition-transform hover:translate-y-[-2px]"
              >
                Explore nearby homes
                <FiCompass className="text-lg" />
              </Link>
              <Link
                href="/list"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:bg-white/10"
              >
                List your property
                <FiArrowRight className="text-lg" />
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative mt-6 h-[220px] flex-1 overflow-hidden rounded-[28px] border border-white/30 bg-white/60 shadow-xl backdrop-blur-sm dark:bg-white/5 md:mt-0"
          >
            <div className="absolute inset-0 bg-[url('/mountain-wave.svg')] bg-cover bg-center opacity-20" />
            <div className="relative h-full w-full">
              <div className="absolute inset-x-8 top-8 flex flex-col gap-3 text-sm text-foreground/80">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
                  Instant insights
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  Live mortgage comparisons & regional market health
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  Align investments with terrain-led appreciation trends across
                  Nepal.
                </p>
              </div>
              <div className="absolute bottom-6 left-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_70%,white)] opacity-70 blur-xl" />
                <div className="rounded-2xl bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)] shadow-sm backdrop-blur dark:bg-white/10">
                  Built for iOS | Android
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Featured residences
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              Handpicked homes with geo-tagged amenities and livability scores.
            </p>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-2 text-sm font-semibold text-[var(--color-primary)] md:flex"
          >
            View map insights
            <FiArrowRight />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Recent listings
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              Freshly added by trusted, KYC-verified sellers.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-foreground">
            Terai · Pahad · Himal
          </h2>
          <p className="text-sm text-[var(--color-muted)]">
            Navigate Nepal’s diversity with regional intelligence layers.
          </p>
        </div>
        <RegionStrip />
      </section>
    </div>
  );
}
