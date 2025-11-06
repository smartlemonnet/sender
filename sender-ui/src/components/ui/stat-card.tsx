import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

type StatAccent = "blue" | "green" | "purple" | "orange" | "neutral";

type StatCardProps = {
  label: string;
  value: string;
  change?: {
    value: string;
    trend: "up" | "down" | "steady";
  };
  subtitle?: string;
  accent?: StatAccent;
  footnote?: string;
};

const ACCENT_MAP: Record<StatAccent, string> = {
  blue: "from-blue-500/20 via-blue-500/10 to-blue-500/0 text-blue-600",
  green: "from-emerald-500/20 via-emerald-500/10 to-emerald-500/0 text-emerald-600",
  purple: "from-purple-500/20 via-purple-500/10 to-purple-500/0 text-purple-600",
  orange: "from-orange-500/20 via-orange-500/10 to-orange-500/0 text-orange-600",
  neutral: "from-slate-400/20 via-slate-400/10 to-slate-400/0 text-slate-600",
};

export function StatCard({ label, value, subtitle, change, accent = "neutral", footnote }: StatCardProps) {
  const accentClasses = ACCENT_MAP[accent];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 px-5 py-6 shadow-[0_24px_45px_-35px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_35px_60px_-45px_rgba(37,99,235,0.45)]">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClasses} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

      <div className="relative flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          {label}
        </span>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-semibold text-[var(--foreground)]">{value}</span>
          {change ? <ChangeBadge trend={change.trend} value={change.value} /> : null}
        </div>
        {subtitle ? <p className="text-sm text-[var(--muted)]">{subtitle}</p> : null}
      </div>

      {footnote ? (
        <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/70 px-3 py-2 text-xs font-semibold text-[var(--muted)]">
          <ArrowRight className="h-3.5 w-3.5" />
          <span>{footnote}</span>
        </div>
      ) : null}
    </div>
  );
}

function ChangeBadge({
  trend,
  value,
}: {
  trend: "up" | "down" | "steady";
  value: string;
}) {
  return (
    <span
      className={
        trend === "up"
          ? "inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600"
          : trend === "down"
            ? "inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600"
            : "inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
      }
    >
      {trend === "up" ? (
        <ArrowUpRight className="h-3.5 w-3.5" />
      ) : trend === "down" ? (
        <ArrowDownRight className="h-3.5 w-3.5" />
      ) : (
        <ArrowRight className="h-3.5 w-3.5" />
      )}
      {value}
    </span>
  );
}
