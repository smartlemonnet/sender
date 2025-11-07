import { ArrowRight, BarChart3, Download, LineChart, PieChart } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";

const panel =
  "rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(6,255,0,0.08)] backdrop-blur";

// TODO: Replace with Supabase/materialized metrics (deliverability, attribution, funnel).
const statCards = [
  {
    label: "Deliverability",
    value: "98.1%",
    subtitle: "Last 7 days",
    change: { value: "+1.3%", trend: "up" as const },
    accent: "lime" as const,
  },
  {
    label: "Click-through",
    value: "12.4%",
    subtitle: "Active campaigns",
    change: { value: "-0.7%", trend: "down" as const },
    accent: "orange" as const,
  },
  {
    label: "Attributed Revenue",
    value: "€842K",
    subtitle: "CRM Source",
    change: { value: "+19%", trend: "up" as const },
    accent: "emerald" as const,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        description="Track performance, attribution, and cold email channel health in real-time."
        breadcrumbs={[
          { label: "App" },
          { label: "Analytics" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-[#06FF00]/30">
              <Download className="h-4 w-4" />
              Download Report
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#06FF00] via-emerald-500 to-lime-500 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(6,255,0,0.3)] hover:brightness-110">
              <ArrowRight className="h-4 w-4" />
              Create Dashboard
            </button>
          </div>
        }
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Performance Timeline</h2>
              <p className="text-sm text-slate-400">Trends of sends, open, and reply rates with target comparison.</p>
            </div>
            <button className="text-sm font-semibold text-[#06FF00]">Set Goals</button>
          </header>

          <div className="h-64 rounded-3xl border border-[#06FF00]/20 bg-gradient-to-br from-[#06FF00]/10 via-black/50 to-emerald-500/10 p-4 backdrop-blur">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#06FF00]">
                <LineChart className="h-4 w-4" />
                Sends vs Reply Trend
              </div>
              <div className="grid flex-1 grid-cols-12 items-end gap-2 pb-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative rounded-full bg-gradient-to-t from-[#06FF00]/80 to-emerald-400/60"
                    style={{ height: `${40 + index * 4}%` }}
                  >
                    <span className="absolute inset-x-0 -top-6 text-center text-[10px] font-semibold text-[#06FF00]">
                      {`${20 + index * 3}%`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-white">Channels & Attribution</h2>
            <p className="mt-1 text-sm text-slate-400">Evaluate how email, calls, and remarketing collaborate to generate revenue.</p>
          </header>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-black/50 to-emerald-500/10 p-5 backdrop-blur">
              <div className="flex items-center gap-3 text-sm font-semibold text-emerald-400">
                <PieChart className="h-5 w-5" />
                Attribution Mix
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-400">
                <div>
                  <p className="text-lg font-semibold text-white">43%</p>
                  <p>Cold outbound email</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">29%</p>
                  <p>Manual follow-ups</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">18%</p>
                  <p>Multi-channel remarketing</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">10%</p>
                  <p>Partner referrals</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#06FF00]/20 bg-gradient-to-br from-[#06FF00]/10 via-black/50 to-lime-500/10 p-5 backdrop-blur">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#06FF00]">
                <BarChart3 className="h-5 w-5" />
                Reply Velocity
              </div>
              <div className="mt-4 space-y-3 text-xs text-slate-400">
                {[
                  { label: "Avg time to 1st reply", value: "2h 45m" },
                  { label: "Replies within 12h", value: "68%" },
                  { label: "QTD pipeline closes", value: "+26%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 backdrop-blur">
                    <span className="font-semibold text-slate-300">{item.label}</span>
                    <span className="text-sm font-semibold text-[#06FF00]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={`${panel} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Geo Performance</h2>
              <p className="text-sm text-slate-400">Comparison by geographic area and sending domain.</p>
            </div>
            <button className="text-sm font-semibold text-[#06FF00]">Manage Domains</button>
          </header>

          <div className="grid gap-3 text-sm text-slate-400">
            {[
              { region: "Central EU", send: "42,350", reply: "24.5%", health: "Excellent" },
              { region: "North America", send: "31,220", reply: "18.1%", health: "On Track" },
              { region: "LATAM", send: "12,880", reply: "16.4%", health: "Warm-up" },
              { region: "APAC", send: "8,640", reply: "19.8%", health: "Monitor" },
            ].map((item) => (
              <div key={item.region} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <div>
                  <p className="text-sm font-semibold text-white">{item.region}</p>
                  <p className="text-xs text-slate-400">Sends {item.send}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">Reply {item.reply}</p>
                  <p className="text-xs text-[#06FF00]">{item.health}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-white">Conversion Funnel</h2>
            <p className="mt-1 text-sm text-slate-400">Monitor complete funnel from list to revenue.</p>
          </header>

          <div className="space-y-4 text-sm text-slate-400">
            {[
              { stage: "Qualified contacts", value: "84,120", progress: "72%" },
              { stage: "Positive replies", value: "21,540", progress: "26%" },
              { stage: "Meetings booked", value: "6,980", progress: "12%" },
              { stage: "Deals won", value: "1,240", progress: "4%" },
            ].map((item) => (
              <div key={item.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{item.stage}</p>
                  <span className="text-xs font-semibold text-[#06FF00]">{item.value}</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#06FF00] to-emerald-500"
                    style={{ width: item.progress }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
