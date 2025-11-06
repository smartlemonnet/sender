import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  KeySquare,
  Shield,
  Sparkles,
  UserCog,
} from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";

const panel =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)]";

// TODO: Bind settings ai servizi Supabase/Auth (workspace, notifiche, API keys).

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Impostazioni"
        description="Configura workspace, sicurezza e integrazioni per l&apos;intero team Bluelime."
        breadcrumbs={[
          { label: "App" },
          { label: "Settings" },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-6`}>
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Profilo organizzazione</h2>
            <p className="text-sm text-[var(--muted)]">Aggiorna informazioni principali e branding condiviso con la suite.</p>
          </div>

          <form className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="org-name" className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Nome organizzazione
                </label>
                <input
                  id="org-name"
                  defaultValue="Bluelime Universe"
                  className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-3 text-sm font-semibold text-[var(--foreground)] outline-none focus:border-blue-200"
                />
              </div>
              <div>
                <label htmlFor="workspace-domain" className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Dominio workspace
                </label>
                <input
                  id="workspace-domain"
                  defaultValue="sender.bluelime.universe"
                  className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-3 text-sm font-semibold text-[var(--foreground)] outline-none focus:border-blue-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="timezone" className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Timezone principale
              </label>
              <select
                id="timezone"
                defaultValue="Europe/Rome"
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-3 text-sm font-semibold text-[var(--foreground)] outline-none focus:border-blue-200"
              >
                <option value="Europe/Rome">Europe / Rome</option>
                <option value="Europe/Paris">Europe / Paris</option>
                <option value="America/New_York">America / New York</option>
                <option value="Asia/Singapore">Asia / Singapore</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Branding email
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {[
                  "logo-bluelime.svg",
                  "banner-outreach.png",
                  "footer-legal.html",
                ].map((asset) => (
                  <span key={asset} className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-2 text-xs font-semibold text-[var(--muted)]">
                    {asset}
                  </span>
                ))}
                <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-dashed border-[var(--border)] px-4 py-2 text-xs font-semibold text-blue-600">
                  <Sparkles className="h-4 w-4" />
                  Carica asset
                </button>
              </div>
            </div>
          </form>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-xs text-blue-700">
            <p className="font-semibold">Allineamento suite</p>
            <p className="mt-1">L&apos;identità grafica viene sincronizzata con i moduli già attivi nella suite Bluelime Universe.</p>
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Notifiche & ruoli</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Gestisci alert operativi e permessi granulari per i team.</p>
          </header>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Alert deliverability</p>
                  <p className="text-xs text-[var(--muted)]">Email + Slack ogni volta che bounce o spam superano soglia.</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <span className="flex h-6 w-11 items-center rounded-full bg-[var(--border)] transition peer-checked:bg-blue-500 peer-checked:shadow-[0_0_0_6px_rgba(37,99,235,0.15)]">
                    <span className="ml-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5" />
                  </span>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-4">
              <div className="flex items-center gap-3">
                <UserCog className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Ruoli avanzati</p>
                  <p className="text-xs text-[var(--muted)]">Assegna permessi granulari per campagne, CRM e automazioni.</p>
                </div>
              </div>
              <Link href="/settings/roles" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
                Configura ruoli
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-blue-600" />
                <div className="space-y-2">
                  <p className="font-semibold text-[var(--foreground)]">Digest giornaliero</p>
                  <p className="text-xs text-[var(--muted)]">Report email inviati, risposte prioritari e stato warm-up.</p>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 text-xs text-[var(--muted)]">
                      <input type="checkbox" defaultChecked />
                      Email
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-[var(--muted)]">
                      <input type="checkbox" defaultChecked />
                      Slack
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-[var(--muted)]">
                      <input type="checkbox" />
                      Webhook
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-700">
              <p className="font-semibold">Accesso API</p>
            <p className="mt-1">Genera chiavi con scope limitati per l&apos;integrazione con la suite Bluelime.</p>
              <Link href="/settings/api" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
                Gestisci chiavi
                <KeySquare className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div className="space-y-1">
                  <p className="font-semibold text-[var(--foreground)]">Sicurezza avanzata</p>
                  <p className="text-xs text-[var(--muted)]">SSO SAML, 2FA obbligatoria e policy password condivise nella suite.</p>
                  <Link href="/settings/security" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
                    Apri impostazioni
                    <BadgeCheck className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
