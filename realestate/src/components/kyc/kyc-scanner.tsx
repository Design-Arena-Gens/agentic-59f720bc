"use client";

import { useCallback, useRef, useState } from "react";
import { FiCamera, FiImage, FiRefreshCcw } from "react-icons/fi";
import Image from "next/image";
import Webcam from "react-webcam";
import type ReactWebcam from "react-webcam";

type KycScannerProps = {
  onCapture: (image: string) => void;
};

export function KycScanner({ onCapture }: KycScannerProps) {
  const webcamRef = useRef<ReactWebcam | null>(null);
  const [image, setImage] = useState<string>();
  const [error, setError] = useState<string>();

  const capture = useCallback(() => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) {
      setError("Unable to access camera. Try tapping the gallery icon to upload.");
      return;
    }
    setImage(screenshot);
    setError(undefined);
    onCapture(screenshot);
  }, [onCapture]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
        onCapture(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3 rounded-3xl border border-[var(--color-border)] bg-white/80 px-4 py-4 shadow-md backdrop-blur dark:bg-white/10">
      <div className="grid gap-4 md:grid-cols-[2fr,1fr] md:items-center">
        <div className="relative overflow-hidden rounded-[28px] border border-white/50 bg-black/20">
          {!image && (
            <>
              <Webcam
                ref={(instance) => {
                  webcamRef.current = instance;
                }}
                audio={false}
                screenshotFormat="image/jpeg"
                imageSmoothing
                className="h-56 w-full object-cover md:h-72"
                videoConstraints={{
                  facingMode: { ideal: "environment" },
                  width: { ideal: 1080 },
                  height: { ideal: 720 },
                }}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[70%] w-[70%] rounded-[32px] border-4 border-[rgba(255,255,255,0.7)] backdrop-blur-sm" />
              </div>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
                Align Citizenship / PAN inside the frame
              </span>
            </>
          )}
          {image && (
            <Image
              src={image}
              alt="Captured document"
              width={1080}
              height={720}
              className="h-56 w-full rounded-none object-cover md:h-72"
              unoptimized
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={capture}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-secondary)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-secondary)]/25 transition hover:translate-y-[-1px]"
          >
            <FiCamera className="text-lg" />
            {image ? "Retake with camera" : "Scan with camera"}
          </button>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:bg-white/5">
            <FiImage className="text-lg" />
            Upload from gallery
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {image && (
            <button
              type="button"
              onClick={() => {
                setImage(undefined);
                setError(undefined);
              }}
              className="inline-flex items-center gap-2 rounded-full text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)] hover:text-[var(--color-secondary)]"
            >
              <FiRefreshCcw />
              Reset
            </button>
          )}
          {error && (
            <p className="rounded-2xl bg-[color-mix(in_srgb,var(--color-warm)_14%,white)] px-3 py-2 text-xs font-semibold text-[color-mix(in_srgb,var(--color-warm)_80%,black)]">
              {error}
            </p>
          )}
        </div>
      </div>
      <p className="text-xs text-[var(--color-muted)]">
        Documents are encrypted on-device and shared via secure tunnel for compliance with NRB and DoI guidelines.
      </p>
    </div>
  );
}
