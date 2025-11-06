"use client";

import { ReactNode, useEffect } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    const register = async () => {
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.register("/sw.js");
        } catch (error) {
          console.error("Service worker registration failed", error);
        }
      }
    };

    register();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    if (Notification.permission === "default") {
      Notification.requestPermission().catch(() => undefined);
    }
  }, []);

  return <>{children}</>;
}
