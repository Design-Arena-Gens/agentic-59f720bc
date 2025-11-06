"use client";

import { motion } from "framer-motion";
import { regionTheme } from "@/lib/regions";

export function RegionStrip() {
  const entries = Object.entries(regionTheme);

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {entries.map(([key, value], index) => (
        <motion.div
          key={key}
          className="overflow-hidden rounded-3xl border border-white/20 bg-white/75 px-5 py-6 text-sm shadow-lg backdrop-blur dark:bg-white/10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.08, duration: 0.5 }}
        >
          <div
            className={`h-2 w-full rounded-full bg-gradient-to-r ${value.gradient}`}
          />
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            {value.label}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {value.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
