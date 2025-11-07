import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

type StatAccent = "blue" | "green" | "purple" | "orange" | "neutral" | "lime" | "emerald";

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
  lime: "from-[#06FF00]/20 via-[#06FF00]/10 to-[#06FF00]/0 text-[#06FF00]",
  emerald: "from-emerald-400/20 via-emerald-400/10 to-emerald-400/0 text-emerald-500",
};

export function StatCard({ label, value, subtitle, change, accent = "neutral", footnote }: StatCardProps) {
  const accentClasses = ACCENT_MAP[accent];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm px-5 py-6 shadow-[0_8px_32px_rgba(6,255,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#06FF00]/30 hover:shadow-[0_16px_48px_rgba(6,255,0,0.15)]">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClasses} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

      <div className="relative flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          {label}
        </span>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-semibold text-white">{value}</span>
          {change ? <ChangeBadge trend={change.trend} value={change.value} /> : null}
        </div>
        {subtitle ? <p className="text-sm text-slate-400">{subtitle}</p> : null}
      </div>

      {footnote ? (
        <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-2 text-xs font-semibold text-slate-400">
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
          ? "inline-flex items-center gap-1 rounded-full border border-[#06FF00]/20 bg-[#06FF00]/10 px-2.5 py-1 text-xs font-semibold text-[#06FF00]"
          : trend === "down"
            ? "inline-flex items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-400"
            : "inline-flex items-center gap-1 rounded-full border border-slate-500/20 bg-slate-500/10 px-2.5 py-1 text-xs font-semibold text-slate-400"
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
