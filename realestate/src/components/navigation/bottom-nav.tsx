"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiSearch,
  FiPlusSquare,
  FiMessageCircle,
  FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const items: NavItem[] = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/search", label: "Search", icon: FiSearch },
  { href: "/list", label: "List Property", icon: FiPlusSquare },
  { href: "/messages", label: "Messages", icon: FiMessageCircle },
  { href: "/profile", label: "Profile", icon: FiUser },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-auto fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[min(520px,92vw)] items-center justify-between rounded-[28px] border border-[var(--color-border)] bg-white/90 px-3 py-2 shadow-[0_18px_35px_rgba(16,40,69,0.18)] backdrop-blur-md dark:bg-[rgba(27,38,53,0.92)]"
    >
      {items.map(({ href, label, icon: Icon }) => {
        const isActive =
          pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "group relative flex flex-1 flex-col items-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium transition-colors",
              isActive
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-primary)]",
            )}
          >
            <div className="relative flex h-11 w-11 items-center justify-center">
              {isActive && (
                <motion.span
                  layoutId="nav-highlight"
                  className="absolute inset-0 rounded-full bg-[color-mix(in_oklab,var(--color-primary)_20%,transparent)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 text-[20px]" />
            </div>
            <span className="leading-none">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
