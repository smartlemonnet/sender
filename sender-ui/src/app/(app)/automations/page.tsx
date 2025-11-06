import Link from "next/link";
import {
  ArrowRight,
  Download,
  GitBranch,
  Rocket,
  Workflow,
} from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";

const panel =
  "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-6 shadow-[0_35px_60px_-45px_rgba(15,23,42,0.45)]";

// TODO: Popolare nodi automation dal backend (Supabase flows + Mailcow status).
const automationNodes = [
  {
    id: "trigger",
    title: "Trigger: Lead import",
    description: "Segmento ICP · Fonte Salesforce",
    tone: "info" as const,
    position: { top: "40px", left: "60px" },
  },
  {
    id: "condition",
    title: "Condizione",
    description: "Engagement score ≥ 65",
    tone: "warning" as const,
    position: { top: "220px", left: "140px" },
  },
  {
    id: "emailA",
    title: "Email A",
    description: "Sequenza onboarding",
    tone: "success" as const,
    position: { top: "120px", left: "360px" },
  },
  {
    id: "wait",
    title: "Wait 2 giorni",
    description: "Coordinato con timezone contatto",
    tone: "neutral" as const,
    position: { top: "300px", left: "360px" },
  },
  {
    id: "webhook",
    title: "Webhook CRM",
    description: "Aggiorna stage pipeline",
    tone: "info" as const,
    position: { top: "190px", left: "580px" },
  },
  {
    id: "branch",
    title: "Split comportamento",
    description: "Se reply → chiama sales",
    tone: "success" as const,
    position: { top: "360px", left: "580px" },
  },
];

const nodeToneLabels = {
  info: "Sync",
  warning: "Filtro",
  success: "Azione",
  neutral: "Delay",
  danger: "Alert",
} as const;

export default function AutomationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Automazioni"
        description="Costruisci percorsi drag & drop per orchestrare campagne, CRM e provisioning mailbox."
        breadcrumbs={[
          { label: "App" },
          { label: "Automations" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:border-blue-200">
              <Download className="h-4 w-4" />
              Blueprint library
            </button>
            <Link
              href="/automations"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:brightness-110"
            >
              <Workflow className="h-4 w-4" />
              Nuovo scenario
            </Link>
          </div>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-5`}> 
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Canvas visuale</h2>
              <p className="text-sm text-[var(--muted)]">Trascina nodi, definisci condizioni e connetti automazioni cross-canale.</p>
            </div>
            <button className="text-sm font-semibold text-blue-600">Mostra log esecuzione</button>
          </header>

          <div className="relative overflow-hidden rounded-3xl border border-dashed border-blue-200/70 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),rgba(59,130,246,0)_55%)]" />
            <div className="relative grid min-h-[420px]">
              {automationNodes.map((node) => (
                <AutomationNode key={node.id} {...node} />
              ))}

              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 420">
                <path
                  d="M110 80 H210 C240 80 240 160 270 160 H360"
                  className="fill-none stroke-blue-400/60 stroke-[3]" strokeLinecap="round"
                />
                <path
                  d="M270 160 V260 C270 290 310 300 360 300"
                  className="fill-none stroke-blue-400/40 stroke-[3]" strokeLinecap="round" strokeDasharray="8 8"
                />
                <path
                  d="M430 140 H540"
                  className="fill-none stroke-emerald-400/50 stroke-[3]" strokeLinecap="round"
                />
                <path
                  d="M430 320 H540"
                  className="fill-none stroke-amber-400/60 stroke-[3]" strokeLinecap="round" strokeDasharray="6 6"
                />
                <path
                  d="M620 320 V380"
                  className="fill-none stroke-emerald-400/40 stroke-[3]" strokeLinecap="round" strokeDasharray="4 10"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${panel} space-y-5`}> 
          <header>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Blueprint scenario</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Configura step, SLA e dipendenze prima del go-live.</p>
          </header>

          <div className="space-y-4">
            {[
              {
                title: "Orchestrazione",
                description: "Combina email, webhook, task manuali e aggiornamenti CRM in un'unica vista.",
              },
              {
                title: "Gestione fallimenti",
                description: "Fallback automatico su caselle alternative e log esportabili per audit.",
              },
              {
                title: "Sincronizzazione Mailcow",
                description: "Provisioning caselle e monitoraggio warm-up direttamente dal canvas.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 px-4 py-4">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-1 text-xs text-[var(--muted)]">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-sm text-blue-700">
            <div className="flex items-start gap-3">
              <GitBranch className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">Step successivi</p>
                <p className="text-xs text-blue-700/80">Aggiungi split su aperture e integra sequenza SMS (modulo add-on).</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 p-4 text-sm">
            <div className="flex items-start gap-3">
              <Rocket className="h-5 w-5 text-blue-600" />
              <div className="space-y-2">
                <p className="font-semibold text-[var(--foreground)]">Checklist go-live</p>
                <div className="grid gap-2 text-xs text-[var(--muted)]">
                  <div className="flex items-center justify-between">
                    <span>QA copy e personalizzazioni</span>
                    <StatusPill label="Completato" tone="success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Verifica tracce tracking</span>
                    <StatusPill label="Da verificare" tone="warning" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Revisione legale & compliance</span>
                    <StatusPill label="In corso" tone="info" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-xs text-blue-700">
            <p className="font-semibold">Collaborazione</p>
            <p className="mt-1">Invita il team prodotto per commentare ogni nodo e approvare lo scenario.</p>
            <Link href="/crm" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
              Assegna owner
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

type AutomationNodeProps = {
  id: string;
  title: string;
  description: string;
  tone: keyof typeof nodeToneLabels;
  position: { top: string; left: string };
};

function AutomationNode({ title, description, tone, position }: AutomationNodeProps) {
  return (
    <div
      className="absolute w-60 rounded-2xl border border-[var(--border)] bg-white/90 px-4 py-4 text-sm text-slate-700 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.55)] backdrop-blur-lg"
      style={{ top: position.top, left: position.left }}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-slate-900">{title}</p>
        <StatusPill label={nodeToneLabels[tone]} tone={tone} />
      </div>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
      <div className="mt-3 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-600">
        Drag node
      </div>
    </div>
  );
}
