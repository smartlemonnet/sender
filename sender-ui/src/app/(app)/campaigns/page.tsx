import Link from "next/link";
import {
  ArrowRight,
  Clock,
  LayoutPanelTop,
  ListChecks,
  Send,
  Split,
} from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";

const panel =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)]";

// TODO: Collegare questi dati alle viste Supabase (tables: campaigns, sequences, segments).
const campaigns = [
  {
    id: "cm-001",
    name: "Scale Up EMEA",
    segment: "ICP SaaS Serie A",
    owner: "Giulia F.",
    schedule: "Daily drip · 5 email",
    status: "Attiva",
    tone: "success" as const,
    metrics: {
      sent: "18.300",
      open: "64%",
      reply: "21%",
    },
  },
  {
    id: "cm-002",
    name: "Pilot DACH",
    segment: "AE & SDR",
    owner: "Team SDR",
    schedule: "Manuale · 3 step",
    status: "In revisione",
    tone: "info" as const,
    metrics: {
      sent: "2.150",
      open: "51%",
      reply: "14%",
    },
  },
  {
    id: "cm-003",
    name: "E-commerce EU",
    segment: "Retail premium",
    owner: "Chiara L.",
    schedule: "A/B test · 2 varianti",
    status: "Programmato",
    tone: "warning" as const,
    metrics: {
      sent: "—",
      open: "—",
      reply: "—",
    },
  },
  {
    id: "cm-004",
    name: "Partner referral",
    segment: "Studio marketing",
    owner: "Marco P.",
    schedule: "Drip · 6 email",
    status: "Pausa tecnica",
    tone: "danger" as const,
    metrics: {
      sent: "4.880",
      open: "39%",
      reply: "11%",
    },
  },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Campagne Email"
        description="Gestisci pipeline, segmenti e contenuti per ogni campagna di outreach."
        breadcrumbs={[
          { label: "App" },
          { label: "Campaigns" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:border-blue-200">
              <Split className="h-4 w-4" />
              Importa sequenza
            </button>
            <Link
              href="/automations"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:brightness-110"
            >
              <LayoutPanelTop className="h-4 w-4" />
              Apri canvas
            </Link>
          </div>
        }
      />

      <div className={`${panel} flex flex-wrap items-center gap-3 border-dashed border-[var(--border)]/70 bg-[var(--surface-muted)]/40`}> 
        {["Tutte", "Automation", "Batch", "Onboarding", "Sperimentazioni"].map((filter) => (
          <button
            key={filter}
            className="rounded-full border border-[var(--border)] bg-white/50 px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-blue-200 hover:text-blue-600"
          >
            {filter}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          <Clock className="h-4 w-4" />
          Ultimo sync CRM: 12 minuti fa
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-4`}> 
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Performance campagne</h2>
              <p className="text-sm text-[var(--muted)]">Distribuzione delle metriche fondamentali con accesso rapido al dettaglio.</p>
            </div>
            <button className="text-sm font-semibold text-blue-600">Esporta report</button>
          </header>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="min-w-full divide-y divide-[var(--border)]">
              <thead className="bg-[var(--surface-muted)]/60 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 text-left">Campagna</th>
                  <th className="px-4 py-3 text-left">Segmento</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">Invii</th>
                  <th className="px-4 py-3 text-left">Open</th>
                  <th className="px-4 py-3 text-left">Reply</th>
                  <th className="px-4 py-3 text-left">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-sm">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="bg-[var(--surface)]/80 transition hover:bg-blue-50/40">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-[var(--foreground)]">{campaign.name}</div>
                      <p className="text-xs text-[var(--muted)]">{campaign.schedule}</p>
                    </td>
                    <td className="px-4 py-4 text-[var(--muted)]">{campaign.segment}</td>
                    <td className="px-4 py-4 text-[var(--muted)]">{campaign.owner}</td>
                    <td className="px-4 py-4 font-semibold text-[var(--foreground)]">{campaign.metrics.sent}</td>
                    <td className="px-4 py-4 font-semibold text-[var(--foreground)]">{campaign.metrics.open}</td>
                    <td className="px-4 py-4 font-semibold text-[var(--foreground)]">{campaign.metrics.reply}</td>
                    <td className="px-4 py-4">
                      <StatusPill label={campaign.status} tone={campaign.tone} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Editor & Workflow</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Allinea il design dell&apos;email builder con le automazioni visuali e i test A/B.</p>
          </header>

          <div className="space-y-4">
            {[
              {
                title: "Editor drag & drop",
                description: "Componenti modulari, blocchi dinamici e snippet HTML personalizzati.",
              },
              {
                title: "Regole condizionali",
                description: "Personalizza il copy in base a persona, fuso orario, engagement e CRM field.",
              },
              {
                title: "Versioning",
                description: "Timeline versioni con confronto diff e approvazione multi-team.",
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-4">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">{feature.title}</h3>
                <p className="mt-1 text-xs text-[var(--muted)]">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/75 p-4 text-blue-700">
            <div className="flex items-start gap-3">
              <Send className="mt-0.5 h-5 w-5" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Accorcia il time-to-send</p>
                <p className="text-xs text-blue-700/80">Prepara template multi-variabile e invii controllati via Mailcow direttamente dal canvas.</p>
                <Link href="/mailboxes" className="inline-flex items-center gap-2 text-xs font-semibold">
                  Configura connessioni
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <div className="flex items-start gap-3">
              <ListChecks className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold text-[var(--foreground)]">Checklist pre-invio</p>
                  <ul className="mt-2 space-y-2 text-xs text-[var(--muted)]">
                    <li>✓ Verifica DNS e autenticazione (SPF, DKIM, DMARC)</li>
                    <li>✓ Warm-up attivo e reputation &gt; 85</li>
                    <li>✓ Segmenti aggiornati da CRM (&lt; 12h)</li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
