import Link from "next/link";
import { ArrowRight, BadgePercent, CreditCard, Shield, Sparkles, Zap } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";

const panel =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)]";

// TODO: Alimentare piani e usage con Supabase (tables: plans, subscriptions, usage_stats).
const plans = [
  {
    name: "Starter",
    price: "€149",
    send: "150k invii/mese",
    features: [
      "2 domini attivi",
      "Automazioni base",
      "Editor drag & drop",
      "Supporto standard",
    ],
  },
  {
    name: "Scale",
    price: "€349",
    send: "450k invii/mese",
    features: [
      "5 domini attivi",
      "Canvas avanzato",
      "Routing reply Mailcow",
      "Supporto priority",
    ],
    highlight: true,
  },
  {
    name: "Infinity",
    price: "Custom",
    send: "Invio illimitato (policy dedicata)",
    features: [
      "Domini illimitati",
      "SLA 99,9%",
      "Gestione compliance",
      "Account manager dedicato",
    ],
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Piani & Billing"
        description="Gestisci sottoscrizioni, limiti di invio e add-on per caselle e automazioni."
        breadcrumbs={[
          { label: "App" },
          { label: "Billing" },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-6`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Piani disponibili</h2>
              <p className="text-sm text-[var(--muted)]">Tariffe flessibili basate su volumi, domini e automazioni attive.</p>
            </div>
            <button className="text-sm font-semibold text-blue-600">Scarica listino</button>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col gap-4 rounded-3xl border px-5 py-6 text-sm shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)] ${
                  plan.highlight
                    ? "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-100"
                    : "border-[var(--border)] bg-[var(--surface-muted)]/50"
                }`}
              >
                {plan.highlight ? (
                  <span className="absolute -top-3 right-5 inline-flex rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                    Best seller
                  </span>
                ) : null}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{plan.name}</h3>
                  <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">{plan.price}<span className="text-sm font-medium text-[var(--muted)]">/mese</span></p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{plan.send}</p>
                </div>
                <ul className="space-y-2 text-xs text-[var(--muted)]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:border-blue-200">
                  Scegli piano
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-sm text-blue-700">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">Add-on disponibili</p>
                <p className="text-xs text-blue-700/80">Warm-up accelerato, analytics avanzati, multicanale SMS/LinkedIn e workspace multipli.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${panel} space-y-6`}>
          <header>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Fatturazione attiva</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Panoramica sul piano corrente e metodi di pagamento.</p>
          </header>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Piano corrente</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-[var(--foreground)]">Infinity Enterprise</p>
                <p className="text-xs text-[var(--muted)]">Invii illimitati · SLA personalizzato</p>
              </div>
              <StatusBadge label="Attivo" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Prossimo rinnovo · 01 Mar 2026</span>
              <button className="text-blue-600">Storico fatture</button>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">Metodo di pagamento</p>
                <p className="text-xs text-[var(--muted)]">Visa ending · 3024 · scadenza 08/27</p>
              </div>
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
              Aggiorna carta
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <div className="flex items-start gap-3">
              <BadgePercent className="h-5 w-5 text-blue-600" />
              <div className="space-y-1">
                <p className="font-semibold text-[var(--foreground)]">Uso mensile</p>
                <p className="text-xs text-[var(--muted)]">Invii effettuati: 612.340 / illimitato · Reply positivi: 132.480</p>
                <div className="h-3 rounded-full bg-[var(--surface-muted)]">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div className="space-y-1">
                <p className="font-semibold text-[var(--foreground)]">Compliance garantita</p>
                <p className="text-xs text-[var(--muted)]">GDPR, CAN-SPAM, CASL, LGPD: documentazione e audit su richiesta.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-xs text-blue-700">
            <p className="font-semibold">Vuoi scalare oltre 5M invii/mese?</p>
            <p className="mt-1">Contatta il team commerciale per un piano dedicato, infrastruttura isolata e IP pool personalizzati.</p>
            <Link href="/support" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
              Parla con noi
              <Zap className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
      {label}
    </span>
  );
}
