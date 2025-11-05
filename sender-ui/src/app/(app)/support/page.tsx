import Link from "next/link";
import {
  ArrowRight,
  Files,
  LifeBuoy,
  MessageSquare,
  RadioReceiver,
  ShieldAlert,
  UserCircle2,
} from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";

const panel =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)]";

// TODO: Collegare ticket e SLA con Supabase + integrazione helpdesk.

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Help Center"
        description="Risorse, SLA e canali diretti per il supporto del modulo Sender."
        breadcrumbs={[
          { label: "App" },
          { label: "Support" },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-6`}>
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Richieste prioritarie</h2>
            <p className="text-sm text-[var(--muted)]">Apri ticket per deliverability, infrastruttura e billing enterprise.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Deliverability & IP",
                description: "Warm-up, reputazione, blacklist e feedback loop.",
                icon: RadioReceiver,
              },
              {
                title: "Automazioni",
                description: "Supporto canvas, webhooks, orchestrazione multi-tool.",
                icon: MessageSquare,
              },
              {
                title: "Billing & contratti",
                description: "Upgrade piani, bundle corporate, SLA dedicati.",
                icon: Files,
              },
              {
                title: "Compliance & privacy",
                description: "Richieste legali, audit, policy anti-spam per i vari Paesi.",
                icon: ShieldAlert,
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-4">
                <div className="flex items-start gap-3">
                  <card.icon className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{card.title}</p>
                    <p className="text-xs text-[var(--muted)]">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 text-sm text-blue-700">
            <div className="flex items-start gap-4">
              <LifeBuoy className="h-6 w-6" />
              <div className="space-y-2">
                <p className="text-lg font-semibold">Apri ticket enterprise</p>
                <p className="text-xs text-blue-700/80">SLA 2h per incidenti critici, escalation diretta con deliverability specialist e DevOps mail.</p>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/30">
                  Avvia richiesta
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Canali diretti</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Contatta il team Bluelime secondo le tue priorità.</p>
          </header>

          <div className="space-y-4 text-sm text-[var(--muted)]">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">Slack Connect</p>
              <p className="text-xs text-[var(--muted)]">Canale #sender-support · tempo medio risposta 35 min.</p>
              <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
                Apri conversazione
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">Email dedicata</p>
              <p className="text-xs text-blue-600">support@sender.bluelime.universe</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Priorità automatica se allegato log Postfix/Mailcow.</p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">Knowledge base</p>
              <p className="text-xs text-[var(--muted)]">Guide su setup domini, warm-up, automazioni e CRM.</p>
              <Link href="#" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
                Sfoglia articoli
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <div className="flex items-start gap-3">
              <UserCircle2 className="h-5 w-5 text-blue-600" />
              <div className="space-y-1">
                <p className="font-semibold text-[var(--foreground)]">Account manager dedicato</p>
                <p className="text-xs text-[var(--muted)]">Chiara Lombardi • Disponibile 9:00 - 18:00 CET · SLA 1h.</p>
                <button className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
                  Prenota call
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
