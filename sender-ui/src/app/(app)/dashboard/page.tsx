import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Flame,
  Inbox,
  MailCheck,
  Send,
  Sparkles,
} from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusPill } from "@/components/ui/status-pill";

const panelStyles =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)]";

// TODO: Sostituire i mock con query Supabase (metriche, campagne, deliverability).
const statCards = [
  {
    label: "Email inviate",
    value: "128.930",
    change: { value: "+18.2%", trend: "up" as const },
    subtitle: "Ultimi 30 giorni",
    accent: "blue" as const,
  },
  {
    label: "Tasso di risposta",
    value: "23,8%",
    change: { value: "+4.1%", trend: "up" as const },
    subtitle: "Obiettivo trimestre: 22%",
    accent: "green" as const,
  },
  {
    label: "Domini attivi",
    value: "42",
    change: { value: "3 domini in warm-up", trend: "steady" as const },
    subtitle: "Gestiti tramite Mailcow",
    accent: "purple" as const,
  },
];

const campaigns = [
  {
    id: "camp-1",
    name: "Onboarding partner SaaS EU",
    status: "In esecuzione",
    statusTone: "info" as const,
    schedule: "Flusso nutrimento · 4 email · 3 condizioni",
    replies: "17,4%",
    nextStep: "Follow-up 3 previsto domani alle 10:15",
  },
  {
    id: "camp-2",
    name: "Black Friday expansion LATAM",
    status: "Pianificata",
    statusTone: "warning" as const,
    schedule: "Batch 85.000 contatti · segmenti dinamici",
    replies: "–",
    nextStep: "Verifica domini e warming completamento 78%",
  },
  {
    id: "camp-3",
    name: "Re-engagement founders",
    status: "In revisione",
    statusTone: "neutral" as const,
    schedule: "Percorso manuale · team sales dedicato",
    replies: "31,2%",
    nextStep: "Assegna owner CRM prima del go-live",
  },
];

const deliverability = [
  { metric: "Bounce rate", value: "1,12%", detail: "Obiettivo < 2%", tone: "success" as const },
  { metric: "Spam complaints", value: "0,08%", detail: "Monitoraggio Postmaster", tone: "warning" as const },
  { metric: "Warm-up completato", value: "12/15 domini", detail: "2 domini in fase 2", tone: "info" as const },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Control Center"
        description="Panoramica operativa sulle campagne, deliverability e pipeline contatti del vostro team."
        breadcrumbs={[
          { label: "App" },
          { label: "Dashboard" },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-blue-200"
            >
              <CalendarCheck className="h-4 w-4" />
              Pianifica invio
            </Link>
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110"
            >
              <Sparkles className="h-4 w-4" />
              Nuova campagna
            </Link>
          </div>
        }
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className={`${panelStyles} xl:col-span-2`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Campagne attive</h2>
              <p className="text-sm text-[var(--muted)]">Monitoraggio in tempo reale di stato, reply rate e step successivi.</p>
            </div>
            <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
              Vai alla board
              <ArrowRight className="h-4 w-4" />
            </Link>
          </header>

          <div className="mt-6 space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-4 transition hover:border-blue-100 hover:bg-blue-50/40"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-[var(--foreground)]">{campaign.name}</h3>
                      <StatusPill label={campaign.status} tone={campaign.statusTone} />
                    </div>
                    <p className="mt-1 text-sm text-[var(--muted)]">{campaign.schedule}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Reply rate</p>
                      <p className="text-lg font-semibold text-[var(--foreground)]">{campaign.replies}</p>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--muted)] hover:border-blue-200 hover:text-blue-600">
                      Apri canvas
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Next step · {campaign.nextStep}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${panelStyles} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Deliverability health</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Indicatori tecnici aggregati dagli MX e da Mailcow.</p>
          </header>
          <div className="space-y-4">
            {deliverability.map((item) => (
              <div
                key={item.metric}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{item.metric}</p>
                  <p className="text-xs text-[var(--muted)]">{item.detail}</p>
                </div>
                <StatusPill label={item.value} tone={item.tone} />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-sm text-blue-700">
            <div className="flex items-start gap-3">
              <MailCheck className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">Warm-up automatico in corso</p>
                <p className="text-xs text-blue-600/80">3 nuove caselle stanno completando la fase 2 grazie al modulo Mailcow collegato.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={`${panelStyles} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Pipeline CRM prioritari</h2>
              <p className="text-sm text-[var(--muted)]">Overview dei deal ad alto potenziale coordinati con le sequenze email.</p>
            </div>
            <Link href="/crm" className="text-sm font-semibold text-blue-600">
              Vai al CRM
            </Link>
          </header>

          <div className="grid gap-3">
            {["Discovery", "Valutazione", "Negoziazione", "Closed Won"].map((stage, index) => (
              <div
                key={stage}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{stage}</p>
                    <p className="text-xs text-[var(--muted)]">{4 - index} deal attivi · €{(index + 1) * 35}k pipeline</p>
                  </div>
                  <StatusPill label={index === 3 ? "+12% rispetto al target" : "In linea"} tone={index === 3 ? "success" : "info"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${panelStyles} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Attività di oggi</h2>
              <p className="text-sm text-[var(--muted)]">Azioni programmate dal team marketing e sales.</p>
            </div>
            <button className="text-sm font-semibold text-blue-600">Sincronizza calendario</button>
          </header>

          <div className="space-y-4">
            {[
              {
                time: "09:30",
                icon: Send,
                title: "Batch ES retail",
                detail: "Invio 2.500 email + controllo domini Amazon SES",
              },
              {
                time: "11:00",
                icon: Inbox,
                title: "Review risposte prioritari",
                detail: "Assegna reply a team sales entro 2 ore",
              },
              {
                time: "15:30",
                icon: Flame,
                title: "Aggiornamento warm-up",
                detail: "Verifica reputazione IP 185.61.204.24 - cluster OVH",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{item.title}</p>
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">{item.time}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
