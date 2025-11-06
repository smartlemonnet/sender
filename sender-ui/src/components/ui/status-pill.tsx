type Tone = "info" | "success" | "warning" | "danger" | "neutral";

const TONE_MAP: Record<Tone, string> = {
  info: "bg-blue-50 text-blue-600 border-blue-100",
  success: "bg-emerald-50 text-emerald-600 border-emerald-100",
  warning: "bg-amber-50 text-amber-600 border-amber-100",
  danger: "bg-rose-50 text-rose-600 border-rose-100",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
};

export function StatusPill({ label, tone = "neutral" }: { label: string; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${TONE_MAP[tone]}`}
    >
      {label}
    </span>
  );
}
