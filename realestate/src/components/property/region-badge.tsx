import { regionTheme } from "@/lib/regions";
import type { Region } from "@/data/properties";

export function RegionBadge({ region }: { region: Region }) {
  const theme = regionTheme[region];

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
      style={{ background: theme.accent }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      {theme.label}
    </span>
  );
}
