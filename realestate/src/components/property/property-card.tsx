"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiMapPin, FiGrid, FiDroplet } from "react-icons/fi";
import type { Property } from "@/data/properties";
import { RegionBadge } from "@/components/property/region-badge";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.article
      className="glass-card group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.heroImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={property.featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
          <div>
            <RegionBadge region={property.region} />
            <h3 className="mt-3 text-xl font-semibold leading-tight">
              {property.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-white/80">
              <FiMapPin className="text-lg" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            {property.price}
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5 pb-6 pt-5 text-sm text-[var(--color-muted)]">
        <p className="text-base leading-relaxed text-foreground">
          {property.description}
        </p>
        <div className="grid grid-cols-3 gap-3 text-xs font-medium uppercase tracking-wide text-foreground/75">
          <div className="flex flex-col rounded-2xl bg-white/80 px-3 py-2 text-center shadow-sm backdrop-blur dark:bg-white/5">
            <span className="text-lg font-semibold text-foreground">
              {property.bedrooms}
            </span>
            <span>Bedrooms</span>
          </div>
          <div className="flex flex-col rounded-2xl bg-white/80 px-3 py-2 text-center shadow-sm backdrop-blur dark:bg-white/5">
            <span className="text-lg font-semibold text-foreground">
              {property.bathrooms}
            </span>
            <span>Baths</span>
          </div>
          <div className="flex flex-col rounded-2xl bg-white/80 px-3 py-2 text-center shadow-sm backdrop-blur dark:bg-white/5">
            <span className="text-lg font-semibold text-foreground">
              {property.area}
            </span>
            <span>Area</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {property.nearby.map((poi) => (
            <span
              key={poi}
              className="rounded-full bg-[color-mix(in_srgb,var(--color-accent)_18%,white)] px-3 py-1 font-medium text-[color-mix(in_srgb,var(--color-secondary)_80%,black)]"
            >
              {poi}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-foreground/70">
          <span className="flex items-center gap-1">
            <FiGrid className="text-base text-[var(--color-secondary)]" />
            Earthquake-ready design
          </span>
          <span className="flex items-center gap-1">
            <FiDroplet className="text-base text-[var(--color-secondary)]" />
            Rainwater recycle
          </span>
        </div>
      </div>
    </motion.article>
  );
}
