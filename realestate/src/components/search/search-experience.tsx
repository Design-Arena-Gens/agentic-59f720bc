"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCompass,
  FiFilter,
  FiRefreshCw,
  FiMapPin,
  FiLoader,
} from "react-icons/fi";
import type { Property } from "@/data/properties";
import { PropertyMap } from "@/components/maps/property-map";
import { PropertyCard } from "@/components/property/property-card";

type PriceBand = "all" | "under2" | "twoToThree" | "above3";

const priceRanges: Record<PriceBand, { label: string; min?: number; max?: number }> = {
  all: { label: "All prices" },
  under2: { label: "Under 2 करोड़", max: 20_000_000 },
  twoToThree: { label: "2 - 3 करोड़", min: 20_000_000, max: 30_000_000 },
  above3: { label: "Above 3 करोड़", min: 30_000_000 },
};

function parsePrice(price: string) {
  const hasCrore = price.includes("करोड़");
  const hasLakh = price.includes("लाख");
  const numeric = parseFloat(price.replace(/[^\d.]/g, "")) || 0;

  if (hasCrore) {
    return numeric * 10_000_000;
  }
  if (hasLakh) {
    return numeric * 100_000;
  }

  return numeric;
}

export function SearchExperience({ properties }: { properties: Property[] }) {
  const [selectedRegion, setSelectedRegion] = useState<"All" | Property["region"]>("All");
  const [priceBand, setPriceBand] = useState<PriceBand>("all");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>();
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string>();

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (selectedRegion !== "All" && property.region !== selectedRegion) {
        return false;
      }

      const numericPrice = parsePrice(property.price);
      const { min, max } = priceRanges[priceBand];
      if (min && numericPrice < min) {
        return false;
      }
      if (max && numericPrice > max) {
        return false;
      }

      return true;
    });
  }, [priceBand, properties, selectedRegion]);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setLocationError("Location services unavailable on this device.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(undefined);
        setLocating(false);
      },
      (error) => {
        setLocationError(error.message);
        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 12_000,
      },
    );
  };

  return (
    <div className="space-y-8">
      <header className="rounded-[32px] border border-[var(--color-border)] bg-white/80 px-6 py-6 shadow-lg backdrop-blur dark:bg-white/10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Map & location aware search
            </h1>
            <p className="text-sm text-[var(--color-muted)]">
              Filter inventory by Nepal’s topographies and discover nearby properties instantly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleLocate}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--color-secondary)]/30 transition hover:translate-y-[-1px]"
            >
              {locating ? <FiLoader className="animate-spin text-lg" /> : <FiCompass className="text-lg" />}
              {locating ? "Locating..." : "Use my location"}
            </button>
            {userLocation && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-[var(--color-secondary)] dark:bg-white/5">
                <FiMapPin />
                {userLocation.lat.toFixed(2)}, {userLocation.lng.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        {locationError && (
          <p className="mt-3 rounded-2xl bg-[color-mix(in_srgb,var(--color-warm)_18%,white)] px-4 py-3 text-sm text-[color-mix(in_srgb,var(--color-warm)_80%,black)]">
            {locationError}
          </p>
        )}
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur dark:bg-white/5">
            <FiFilter />
            Smart filters
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Terai", "Pahad", "Himal"].map((region) => (
              <button
                type="button"
                key={region}
                onClick={() => setSelectedRegion(region as typeof selectedRegion)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  selectedRegion === region
                    ? "bg-[color-mix(in_srgb,var(--color-accent)_35%,white)] text-[var(--color-secondary)]"
                    : "bg-white/70 text-[var(--color-muted)] hover:text-[var(--color-secondary)] dark:bg-white/10"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(priceRanges) as PriceBand[]).map((band) => (
            <button
              type="button"
              key={band}
              onClick={() => setPriceBand(band)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                priceBand === band
                  ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                  : "bg-white/70 text-[var(--color-muted)] hover:text-[var(--color-primary)] dark:bg-white/10"
              }`}
            >
              {priceRanges[band].label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setSelectedRegion("All");
              setPriceBand("all");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)] hover:text-[var(--color-secondary)]"
          >
            <FiRefreshCw />
            Reset
          </button>
        </div>
      </section>

      <PropertyMap properties={filteredProperties} userLocation={userLocation} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          {filteredProperties.length} properties spotted
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
