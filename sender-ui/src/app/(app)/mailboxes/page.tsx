import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Layers,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";

const panel =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)]";

// TODO: Integrare dati reali da Mailcow/Supabase (table mailboxes + view warmup_status).
const mailboxes = [
  {
    id: "mb-01",
    address: "outreach@orbitallabs.io",
    domain: "orbitallabs.io",
    plan: "Infinity",
    status: "Warm-up fase 3",
    tone: "info" as const,
    sendLimit: "1.200/d",
    replyTo: "sales@orbitallabs.io",
  },
  {
    id: "mb-02",
    address: "pipelines@retailia.eu",
    domain: "retailia.eu",
    plan: "Scale",
    status: "Attiva",
    tone: "success" as const,
    sendLimit: "900/d",
    replyTo: "crm@retailia.eu",
  },
  {
    id: "mb-03",
    address: "latam@hyperlane.com",
    domain: "hyperlane.com",
    plan: "Starter",
    status: "In provisioning",
    tone: "warning" as const,
    sendLimit: "—",
    replyTo: "support@hyperlane.com",
  },
];

export default function MailboxesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Caselle & Domini"
        description="Provisioning, warm-up e monitoraggio reputazione per caselle dedicate al cold outreach."
        breadcrumbs={[
          { label: "App" },
          { label: "Mailboxes" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:border-blue-200">
              <Layers className="h-4 w-4" />
              Genera dominio
            </button>
            <Link
              href="/billing"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:brightness-110"
            >
              <Mail className="h-4 w-4" />
              Aggiungi casella
            </Link>
          </div>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Inventario caselle</h2>
              <p className="text-sm text-[var(--muted)]">Gestione centralizzata con collegamento al cluster Mailcow OVH.</p>
            </div>
            <button className="text-sm font-semibold text-blue-600">Sincronizza ora</button>
          </header>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="min-w-full divide-y divide-[var(--border)]">
              <thead className="bg-[var(--surface-muted)]/60 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 text-left">Casella</th>
                  <th className="px-4 py-3 text-left">Dominio</th>
                  <th className="px-4 py-3 text-left">Piano</th>
                  <th className="px-4 py-3 text-left">Invii</th>
                  <th className="px-4 py-3 text-left">Stato</th>
                  <th className="px-4 py-3 text-left">Reply-to</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-sm">
                {mailboxes.map((mailbox) => (
                  <tr key={mailbox.id} className="bg-[var(--surface)]/80 transition hover:bg-blue-50/40">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-[var(--foreground)]">{mailbox.address}</div>
                      <p className="text-xs text-[var(--muted)]">ID {mailbox.id}</p>
                    </td>
                    <td className="px-4 py-4 text-[var(--muted)]">{mailbox.domain}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600">
                        {mailbox.plan}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-[var(--foreground)]">{mailbox.sendLimit}</td>
                    <td className="px-4 py-4">
                      <StatusPill label={mailbox.status} tone={mailbox.tone} />
                    </td>
                    <td className="px-4 py-4 text-blue-600">{mailbox.replyTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Provisioning guidato</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Wizard a tre step per onboarding domini personalizzati.</p>
          </header>

          <ol className="space-y-3 text-sm text-[var(--muted)]">
            <li className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-3">
              <p className="font-semibold text-[var(--foreground)]">1. Verifica DNS</p>
              <p className="text-xs">Record SPF, DKIM, DMARC e MX generati automaticamente.</p>
            </li>
            <li className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-3">
              <p className="font-semibold text-[var(--foreground)]">2. Warm-up intelligente</p>
              <p className="text-xs">Cicli di invio progressivo coordinati con reputazione IP OVH.</p>
            </li>
            <li className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-3">
              <p className="font-semibold text-[var(--foreground)]">3. Monitoraggio continuo</p>
              <p className="text-xs">Alert su bounce rate, spam complaint e throttling provider.</p>
            </li>
          </ol>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-sm text-blue-700">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">Compliance & reputazione</p>
                <p className="text-xs text-blue-700/80">Log centralizzati per audit, gestione blacklist e feedback loop provider.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <div className="flex items-start gap-3">
              <Globe2 className="h-5 w-5 text-blue-600" />
              <div className="space-y-2">
                <p className="font-semibold text-[var(--foreground)]">Cluster OVH</p>
                <div className="space-y-1 text-xs text-[var(--muted)]">
                  <p>• VPS-3 · Strasburgo · 8 vCore / 24 GB RAM / 200 GB SSD</p>
                  <p>• IP 51.210.4.94 · IPv6 2001:41d0:404:200::3b95</p>
                  <p>• Monitor uptime 99,9% · Failover manuale previsto Q2</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-700">
            <p className="font-semibold">Bundle corporate</p>
            <p className="mt-1">Offri pacchetti da 25/50/100 caselle con SLA dedicato e setup personalizzato.</p>
            <Link href="/billing" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
              Crea offerta
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-blue-600" />
              <div className="space-y-1">
                <p className="font-semibold text-[var(--foreground)]">API & integrazioni</p>
                <p className="text-xs text-[var(--muted)]">Provisioning via API REST, Webhook per eventi mail e moduli no-code per i team marketing.</p>
                <Link href="/settings" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
                  Gestisci credenziali
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
