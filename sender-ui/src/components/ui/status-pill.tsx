type Tone = "info" | "success" | "warning" | "danger" | "neutral";

const TONE_MAP: Record<Tone, string> = {
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-sm",
  success: "bg-[#06FF00]/10 text-[#06FF00] border-[#06FF00]/20 backdrop-blur-sm",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20 backdrop-blur-sm",
  danger: "bg-rose-500/10 text-rose-400 border-rose-500/20 backdrop-blur-sm",
  neutral: "bg-slate-500/10 text-slate-400 border-slate-500/20 backdrop-blur-sm",
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
