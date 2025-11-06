import type { ReactNode } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="safe-area relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col bg-background pb-28 pt-6 md:pb-16 md:pt-10">
      <main className="flex-1 space-y-6 px-4 md:px-10">{children}</main>
      <BottomNav />
    </div>
  );
}
