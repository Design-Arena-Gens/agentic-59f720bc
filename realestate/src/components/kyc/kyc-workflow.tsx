"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCheckCircle,
  FiShield,
  FiUser,
  FiMap,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";
import { KycScanner } from "@/components/kyc/kyc-scanner";
import Image from "next/image";

type KycValues = {
  fullName: string;
  citizenshipNumber: string;
  documentType: "Citizenship" | "PAN" | "Passport";
  issueDistrict: string;
  permanentAddress: string;
  contactNumber: string;
};

const steps = [
  {
    title: "Identity profile",
    description: "Confirm your personal details as per government records.",
  },
  {
    title: "Scan legal document",
    description: "Use camera or gallery import to capture clear scans.",
  },
  {
    title: "Submit for compliance",
    description: "We encrypt documents and notify you within 15 minutes.",
  },
];

export function KycWorkflow() {
  const [step, setStep] = useState(0);
  const [documentImage, setDocumentImage] = useState<string>();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KycValues>({
    defaultValues: {
      documentType: "Citizenship",
    },
  });

  const onSubmit = handleSubmit(() => {
    if (!documentImage) {
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(0);
      setDocumentImage(undefined);
    }, 6000);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[32px] border border-[var(--color-border)] bg-white/75 px-6 py-6 shadow-lg backdrop-blur dark:bg-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">KYC Verification</h2>
            <p className="text-sm text-[var(--color-muted)]">
              Digitally verify your identity to unlock listing, booking, and messaging features.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--color-secondary)_12%,white)] px-4 py-2 text-xs font-semibold text-[var(--color-secondary)]">
            <FiShield />
            NRB Compliant
          </div>
        </div>
        <ol className="grid gap-3 md:grid-cols-3">
          {steps.map((item, index) => (
            <li
              key={item.title}
              className={`rounded-3xl border px-4 py-4 ${
                step === index
                  ? "border-[var(--color-secondary)] bg-[color-mix(in_srgb,var(--color-secondary)_14%,white)]"
                  : "border-white/60 bg-white/60 dark:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                {index < step ? (
                  <FiCheckCircle className="text-[var(--color-secondary)]" />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-secondary)_10%,white)] text-xs">
                    {index + 1}
                  </span>
                )}
                {item.title}
              </div>
              <p className="mt-2 text-xs text-[var(--color-muted)]">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.form
            key="step-personal"
            onSubmit={handleSubmit(() => setStep(1))}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5 rounded-[32px] border border-[var(--color-border)] bg-white/75 px-6 py-6 shadow-lg backdrop-blur dark:bg-white/10"
          >
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <FiUser className="text-[var(--color-secondary)]" />
              Personal information
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--color-muted)]">
                Full name
                <input
                  type="text"
                  placeholder="As per citizenship"
                  className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                  {...register("fullName", { required: "Full name is required." })}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--color-muted)]">
                Contact number
                <input
                  type="tel"
                  placeholder="+97798XXXXXXX"
                  className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                  {...register("contactNumber", { required: "Mobile number is required." })}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--color-muted)]">
                Document type
                <select
                  className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                  {...register("documentType")}
                >
                  <option value="Citizenship">Citizenship</option>
                  <option value="PAN">PAN</option>
                  <option value="Passport">Passport</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--color-muted)]">
                Document number
                <input
                  type="text"
                  placeholder="01-XX-00000"
                  className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                  {...register("citizenshipNumber", {
                    required: "Government document number is required.",
                  })}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--color-muted)] md:col-span-2">
                Permanent address
                <textarea
                  placeholder="GaPa/NagarPa, Ward, District"
                  rows={3}
                  className="rounded-3xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                  {...register("permanentAddress", {
                    required: "Address is required.",
                  })}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--color-muted)]">
                Issue district
                <input
                  type="text"
                  placeholder="e.g. Kaski"
                  className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-normal text-foreground outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:bg-white/5"
                  {...register("issueDistrict", { required: "Issue district is required." })}
                />
              </label>
            </div>
            <div className="flex flex-col gap-2 text-xs text-[var(--color-muted)]">
              <div className="flex items-center gap-2">
                <FiAlertTriangle className="text-[var(--color-warm)]" />
                Ensure details match your citizenship/PAN exactly.
              </div>
              {Object.values(errors).length > 0 && (
                <p className="rounded-2xl bg-[color-mix(in_srgb,var(--color-warm)_12%,white)] px-3 py-2 text-[color-mix(in_srgb,var(--color-warm)_80%,black)]">
                  Please complete the highlighted fields.
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-secondary)]/25 transition hover:translate-y-[-1px]"
              >
                Continue
              </button>
            </div>
          </motion.form>
        )}
        {step === 1 && (
          <motion.div
            key="step-scan"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5 rounded-[32px] border border-[var(--color-border)] bg-white/75 px-6 py-6 shadow-lg backdrop-blur dark:bg-white/10"
          >
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <FiMap className="text-[var(--color-secondary)]" />
              Document capture
            </div>
            <KycScanner onCapture={setDocumentImage} />
            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-secondary)]"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!documentImage}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/30 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.form
            key="step-submit"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5 rounded-[32px] border border-[var(--color-border)] bg-white/75 px-6 py-6 shadow-lg backdrop-blur dark:bg-white/10"
          >
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <FiShield className="text-[var(--color-secondary)]" />
              Review & submit
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              Your identity files are encrypted instantly and processed by our compliance team in Kathmandu.
            </p>
            {documentImage && (
              <div className="rounded-3xl border border-[var(--color-border)] bg-white/80 p-4 shadow-sm backdrop-blur dark:bg-white/5">
                <Image
                  src={documentImage}
                  alt="KYC document"
                  width={960}
                  height={640}
                  className="h-48 w-full rounded-2xl object-cover"
                  unoptimized
                />
              </div>
            )}
            {submitted ? (
              <div className="flex items-center gap-3 rounded-3xl bg-[color-mix(in_srgb,var(--color-secondary)_18%,white)] px-5 py-4 text-sm font-semibold text-[var(--color-secondary)]">
                <FiCheckCircle className="text-lg" />
                Submitted! Expect a verification call within the hour.
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-xs text-[var(--color-muted)]">
                <div className="flex items-center gap-2">
                  <FiClock className="text-[var(--color-secondary)]" />
                  Verification timeline: 15 mins (express) · 2 hrs (standard)
                </div>
              </div>
            )}
            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-secondary)]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-secondary)]/25 transition hover:translate-y-[-1px] disabled:opacity-60"
              >
                Submit for verification
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
