"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCheckCircle,
  FiUploadCloud,
  FiImage,
  FiMapPin,
  FiHome,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";
import type { Region } from "@/data/properties";

type ListingFormValues = {
  ownerName: string;
  contactNumber: string;
  email: string;
  propertyTitle: string;
  region: Region;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  completionYear: string;
  description: string;
  amenities: string[];
};

const amenityOptions = [
  "Solar backup",
  "Smart lock",
  "Modular kitchen",
  "Earthquake retrofit",
  "Rooftop farming",
  "EV charging",
];

export function ListPropertyForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ListingFormValues>({
    defaultValues: {
      region: "Terai",
      amenities: [],
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onSubmit = (values: ListingFormValues) => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
      setPreviewImages([]);
    }, 4200);
    console.info("Listing payload", values);
  };

  const formattedErrors = useMemo(
    () => Object.values(errors).map((error) => error?.message).filter(Boolean),
    [errors],
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const previews: string[] = [];
    Array.from(files).slice(0, 4).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          previews.push(reader.result);
          if (previews.length === Math.min(files.length, 4)) {
            setPreviewImages(previews);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="rounded-3xl border border-[color-mix(in_srgb,var(--color-secondary)_30%,white)] bg-[color-mix(in_srgb,var(--color-secondary)_12%,white)] px-5 py-4 text-sm text-[var(--color-secondary)] shadow-lg"
          >
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-lg" />
              Listing received! Our support team will validate your KYC and publish within 24 hours.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {formattedErrors.length > 0 && (
        <div className="rounded-3xl border border-[color-mix(in_srgb,var(--color-warm)_35%,white)] bg-[color-mix(in_srgb,var(--color-warm)_12%,white)] px-5 py-4 text-sm text-[color-mix(in_srgb,var(--color-warm)_80%,black)]">
          {formattedErrors.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
        noValidate
      >
        <section className="rounded-[32px] border border-[var(--color-border)] bg-white/75 px-6 py-6 shadow-lg backdrop-blur dark:bg-white/10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <FiHome className="text-[var(--color-secondary)]" />
            Owner details
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)]">
              Full name
              <input
                type="text"
                placeholder="Sabita Gurung"
                className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                {...register("ownerName", { required: "Owner name is required." })}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)]">
              Contact number
              <input
                type="tel"
                placeholder="+977 98XXXXXXXX"
                className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                {...register("contactNumber", { required: "Contact number is required." })}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)] md:col-span-2">
              Email address
              <input
                type="email"
                placeholder="hello@aawas.com"
                className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                {...register("email")}
              />
            </label>
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--color-border)] bg-white/75 px-6 py-6 shadow-lg backdrop-blur dark:bg-white/10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <FiTrendingUp className="text-[var(--color-secondary)]" />
            Property snapshot
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)] md:col-span-2">
              Listing title
              <input
                type="text"
                placeholder="Lake-facing duplex in Pokhara"
                className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                {...register("propertyTitle", { required: "Property title is required." })}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)]">
              Region
              <select
                className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                {...register("region")}
              >
                <option value="Terai">Terai Plains</option>
                <option value="Pahad">Pahad Mid-hills</option>
                <option value="Himal">Himal Alpine</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)]">
              Asking price (रू)
              <input
                type="text"
                placeholder="2.1 करोड़"
                className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                {...register("price", { required: "Price is required." })}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)]">
              Built-up area
              <input
                type="text"
                placeholder="2,400 sqft"
                className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                {...register("area", { required: "Area is required." })}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)]">
              Bedrooms
              <input
                type="number"
                min={1}
                placeholder="4"
                className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                {...register("bedrooms", { valueAsNumber: true })}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)]">
              Bathrooms
              <input
                type="number"
                min={1}
                placeholder="3"
                className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                {...register("bathrooms", { valueAsNumber: true })}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)]">
              Completion year
              <div className="relative">
                <FiCalendar className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[var(--color-muted)]" />
                <input
                  type="text"
                  placeholder="2076"
                  className="w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 pr-12 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                  {...register("completionYear")}
                />
              </div>
            </label>
          </div>
          <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-[var(--color-muted)]">
            Property story
            <textarea
              placeholder="Highlight orientation, materials, lifestyle insights, neighbourhood pulse..."
              rows={4}
              className="rounded-3xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
              {...register("description", { required: "Please describe the property." })}
            />
          </label>
        </section>

        <section className="rounded-[32px] border border-[var(--color-border)] bg-white/75 px-6 py-6 shadow-lg backdrop-blur dark:bg-white/10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <FiImage className="text-[var(--color-secondary)]" />
            Media & highlights
          </h2>
          <div className="mt-5">
            <label className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[var(--color-border)] bg-white/60 px-6 py-10 text-center transition hover:border-[var(--color-primary)] hover:bg-white/80 dark:bg-white/5">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
              <FiUploadCloud className="text-3xl text-[var(--color-primary)]" />
              <div className="text-sm text-[var(--color-muted)]">
                Drag & drop property images or tap to upload (max 4)
              </div>
            </label>
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {previewImages.map((src) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt="Preview"
                    className="h-32 w-full rounded-2xl object-cover"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="mt-6">
            <span className="text-sm font-semibold text-[var(--color-muted)]">
              Amenities
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {amenityOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 text-xs font-semibold text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-secondary)] dark:bg-white/5"
                >
                  <input
                    type="checkbox"
                    value={amenity}
                    {...register("amenities")}
                    className="rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--color-border)] bg-white/75 px-6 py-6 shadow-lg backdrop-blur dark:bg-white/10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <FiMapPin className="text-[var(--color-secondary)]" />
            Geo coordinates
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Precise coordinates help buyers understand approach roads, slopes, and sunlight.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Latitude e.g. 27.7172"
              className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
            />
            <input
              type="text"
              placeholder="Longitude e.g. 85.3240"
              className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
            />
          </div>
        </section>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[var(--color-muted)]">
            By submitting, you agree to share verified ownership documents for compliance with Nepal&apos;s property transfer guidelines.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/30 transition hover:translate-y-[-1px]"
          >
            Publish to marketplace
            <FiCheckCircle className="text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
}
