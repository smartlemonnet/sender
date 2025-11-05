import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Filter,
  Mail,
  NotebookPen,
  UserPlus,
} from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";

const panel =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)]";

// TODO: Source dati da Supabase (tables: contacts, accounts, segments) con policy RLS.
const contacts = [
  {
    id: "lead-1",
    name: "Elena Rizzi",
    role: "Head of Growth",
    company: "Hyperlane",
    email: "elena@hyperlane.com",
    status: "In nurturazione",
    tone: "info" as const,
    score: 82,
    lists: ["SaaS €20-50M", "Demo requested"],
  },
  {
    id: "lead-2",
    name: "Thomas Baker",
    role: "VP Sales",
    company: "NordicOps",
    email: "thomas@nordicops.io",
    status: "Pronto per sales",
    tone: "success" as const,
    score: 93,
    lists: ["Warm replies", "Team SDR"],
  },
  {
    id: "lead-3",
    name: "Marta Costa",
    role: "CMO",
    company: "Retailia",
    email: "m.costa@retailia.eu",
    status: "Da riattivare",
    tone: "warning" as const,
    score: 55,
    lists: ["Dormienti 60d", "Retail"],
  },
  {
    id: "lead-4",
    name: "Ethan Lee",
    role: "Founder",
    company: "LoopAgency",
    email: "ethan@loop.agency",
    status: "Blacklisted",
    tone: "danger" as const,
    score: 12,
    lists: ["Suppression list"],
  },
];

export default function CrmPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="CRM & Liste"
        description="Segmenta i contatti, assegna owner e collega pipeline vendite nelle automazioni."
        breadcrumbs={[
          { label: "App" },
          { label: "CRM" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:border-blue-200">
              <Filter className="h-4 w-4" />
              Salva segmento
            </button>
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:brightness-110"
            >
              <UserPlus className="h-4 w-4" />
              Nuovo contatto
            </Link>
          </div>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Rubrica contatti</h2>
              <p className="text-sm text-[var(--muted)]">Sincronizzata con Supabase + Mailcow per reply in tempo reale.</p>
            </div>
            <button className="text-sm font-semibold text-blue-600">Esporta CSV</button>
          </header>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="min-w-full divide-y divide-[var(--border)]">
              <thead className="bg-[var(--surface-muted)]/60 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 text-left">Contatto</th>
                  <th className="px-4 py-3 text-left">Azienda</th>
                  <th className="px-4 py-3 text-left">Stato</th>
                  <th className="px-4 py-3 text-left">Punteggio</th>
                  <th className="px-4 py-3 text-left">Liste</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-sm">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="bg-[var(--surface)]/80 transition hover:bg-blue-50/40">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-[var(--foreground)]">{contact.name}</div>
                      <p className="text-xs text-[var(--muted)]">{contact.role}</p>
                      <p className="text-xs text-blue-600">{contact.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-[var(--foreground)]">{contact.company}</div>
                      <p className="text-xs text-[var(--muted)]">ICP • {contact.company.length > 8 ? "Enterprise" : "Growth"}</p>
                    </td>
                    <td className="px-4 py-4">
                      <StatusPill label={contact.status} tone={contact.tone} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-600">
                        {contact.score}
                        <span className="text-xs font-medium text-blue-500/70">/100</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2 text-xs">
                        {contact.lists.map((list) => (
                          <span key={list} className="rounded-full bg-[var(--surface-muted)]/70 px-3 py-1 font-semibold text-[var(--muted)]">
                            {list}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Segmentazione dinamica</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Usa filtri multi-condizione con preview in tempo reale.</p>
          </header>

          <div className="space-y-3">
            {[
              {
                title: "Segmento primario",
                criteria: "(Industry = SaaS) AND (ARR &gt; 5M) AND (Role IN [Growth, Marketing])",
              },
              {
                title: "Esclusioni compliance",
                criteria: "Opt-out globale + regioni con consensi insufficienti",
              },
              {
                title: "Trigger reply",
                criteria: "Reply negli ultimi 3 giorni OR meeting confermato",
              },
            ].map((segment) => (
              <div key={segment.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">{segment.title}</h3>
                    <p className="mt-1 text-xs text-[var(--muted)]">{segment.criteria}</p>
                  </div>
                  <button className="text-xs font-semibold text-blue-600">Modifica</button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-xs text-blue-700">
            <p className="font-semibold">Sync real-time Supabase</p>
            <p className="mt-1">Aggiornamenti immediati via Row Level Security e webhook personalizzati.</p>
            <Link href="/settings" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
              Configura policy
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <div className="flex items-start gap-3">
              <NotebookPen className="h-5 w-5 text-blue-600" />
              <div className="space-y-2">
                <p className="font-semibold text-[var(--foreground)]">Timeline attività</p>
                <div className="space-y-2 text-xs text-[var(--muted)]">
                  <p>• 08:45 · Reply ricevuta da thomas@nordicops.io → assegnato a SDR</p>
                  <p>• 10:32 · Tag &quot;Webinar Q1&quot; aggiunto su 640 contatti</p>
                  <p>• 12:18 · Aggiornamento list &quot;Dormienti 60d&quot; da 1.220 → 980 contatti</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-700">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5" />
              <div>
                <p className="font-semibold">Account aziendali</p>
                <p className="text-xs text-blue-700/80">Collega più contatti allo stesso account con viste consolidate.</p>
                <Link href="/mailboxes" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold">
                  Provisioning caselle
                  <Mail className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
