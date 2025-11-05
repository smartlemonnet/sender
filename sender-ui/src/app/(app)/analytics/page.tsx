import { ArrowRight, BarChart3, Download, LineChart, PieChart } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";

const panel =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)]";

// TODO: Sostituire con metriche Supabase/materializzate (deliverability, attribution, funnel).
const statCards = [
  {
    label: "Deliverability",
    value: "98,1%",
    subtitle: "Ultimi 7 giorni",
    change: { value: "+1,3%", trend: "up" as const },
    accent: "green" as const,
  },
  {
    label: "Click-through",
    value: "12,4%",
    subtitle: "Campagne attive",
    change: { value: "-0,7%", trend: "down" as const },
    accent: "orange" as const,
  },
  {
    label: "Revenue attribuita",
    value: "€842K",
    subtitle: "Fonte CRM",
    change: { value: "+19%", trend: "up" as const },
    accent: "purple" as const,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        description="Traccia performance, attribution e salute del canale cold email in tempo reale."
        breadcrumbs={[
          { label: "App" },
          { label: "Analytics" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:border-blue-200">
              <Download className="h-4 w-4" />
              Scarica report
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:brightness-110">
              <ArrowRight className="h-4 w-4" />
              Crea dashboard
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
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Performance temporale</h2>
              <p className="text-sm text-[var(--muted)]">Trend di invio, open e reply rate con comparazione rispetto al target.</p>
            </div>
            <button className="text-sm font-semibold text-blue-600">Imposta obiettivi</button>
          </header>

          <div className="h-64 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-blue-100/70 via-white to-blue-50/60 p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                <LineChart className="h-4 w-4" />
                Trend invii vs reply
              </div>
              <div className="grid flex-1 grid-cols-12 items-end gap-2 pb-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative rounded-full bg-gradient-to-t from-blue-500/80 to-blue-400/60"
                    style={{ height: `${40 + index * 4}%` }}
                  >
                    <span className="absolute inset-x-0 -top-6 text-center text-[10px] font-semibold text-blue-600">
                      {`${20 + index * 3}%`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
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
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Canali e attributi</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Valuta come collaborano email, call e remarketing per generare revenue.</p>
          </header>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-purple-100/70 via-white to-purple-50/80 p-5">
              <div className="flex items-center gap-3 text-sm font-semibold text-purple-600">
                <PieChart className="h-5 w-5" />
                Attribution mix
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-500">
                <div>
                  <p className="text-lg font-semibold text-slate-900">43%</p>
                  <p>Email cold outbound</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">29%</p>
                  <p>Follow-up manuali</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">18%</p>
                  <p>Remarketing multicanale</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">10%</p>
                  <p>Referral partner</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-emerald-100/70 via-white to-emerald-50/80 p-5">
              <div className="flex items-center gap-3 text-sm font-semibold text-emerald-600">
                <BarChart3 className="h-5 w-5" />
                Reply velocity
              </div>
              <div className="mt-4 space-y-3 text-xs text-slate-500">
                {[
                  { label: "Tempo medio 1° reply", value: "2h 45m" },
                  { label: "Reply entro 12h", value: "68%" },
                  { label: "Chiusure pipeline QTD", value: "+26%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2">
                    <span className="font-semibold text-slate-700">{item.label}</span>
                    <span className="text-sm font-semibold text-emerald-600">{item.value}</span>
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
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Geo performance</h2>
              <p className="text-sm text-[var(--muted)]">Confronto per area geografica e dominio inviante.</p>
            </div>
            <button className="text-sm font-semibold text-blue-600">Gestisci domini</button>
          </header>

          <div className="grid gap-3 text-sm text-[var(--muted)]">
            {[
              { region: "UE Centrale", send: "42.350", reply: "24,5%", health: "Ottimo" },
              { region: "Nord America", send: "31.220", reply: "18,1%", health: "In linea" },
              { region: "LATAM", send: "12.880", reply: "16,4%", health: "Warm-up" },
              { region: "APAC", send: "8.640", reply: "19,8%", health: "Monitorare" },
            ].map((item) => (
              <div key={item.region} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{item.region}</p>
                  <p className="text-xs text-[var(--muted)]">Invii {item.send}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[var(--foreground)]">Reply {item.reply}</p>
                  <p className="text-xs text-blue-600">{item.health}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Funnel conversione</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Monitor funnel completo dalla lista al revenue.</p>
          </header>

          <div className="space-y-4 text-sm text-[var(--muted)]">
            {[
              { stage: "Contatti qualificati", value: "84.120", progress: "72%" },
              { stage: "Reply positivi", value: "21.540", progress: "26%" },
              { stage: "Meeting fissati", value: "6.980", progress: "12%" },
              { stage: "Deal vinti", value: "1.240", progress: "4%" },
            ].map((item) => (
              <div key={item.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{item.stage}</p>
                  <span className="text-xs font-semibold text-blue-600">{item.value}</span>
                </div>
                <div className="h-3 rounded-full bg-[var(--surface-muted)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
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
