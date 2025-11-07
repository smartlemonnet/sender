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
  "rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(6,255,0,0.08)] backdrop-blur";

// TODO: Populate automation nodes from backend (Supabase flows + Mailcow status).
const automationNodes = [
  {
    id: "trigger",
    title: "Trigger: Lead import",
    description: "ICP Segment · Salesforce source",
    tone: "info" as const,
    position: { top: "40px", left: "60px" },
  },
  {
    id: "condition",
    title: "Condition",
    description: "Engagement score ≥ 65",
    tone: "warning" as const,
    position: { top: "220px", left: "140px" },
  },
  {
    id: "emailA",
    title: "Email A",
    description: "Onboarding sequence",
    tone: "success" as const,
    position: { top: "120px", left: "360px" },
  },
  {
    id: "wait",
    title: "Wait 2 days",
    description: "Coordinated with contact timezone",
    tone: "neutral" as const,
    position: { top: "300px", left: "360px" },
  },
  {
    id: "webhook",
    title: "CRM Webhook",
    description: "Update pipeline stage",
    tone: "info" as const,
    position: { top: "190px", left: "580px" },
  },
  {
    id: "branch",
    title: "Behavior Split",
    description: "If reply → call sales",
    tone: "success" as const,
    position: { top: "360px", left: "580px" },
  },
];

const nodeToneLabels = {
  info: "Sync",
  warning: "Filter",
  success: "Action",
  neutral: "Delay",
  danger: "Alert",
} as const;

export default function AutomationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Automations"
        description="Build drag & drop workflows to orchestrate campaigns, CRM, and mailbox provisioning."
        breadcrumbs={[
          { label: "App" },
          { label: "Automations" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-[#06FF00]/30">
              <Download className="h-4 w-4" />
              Blueprint Library
            </button>
            <Link
              href="/automations"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#06FF00] via-emerald-500 to-lime-500 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(6,255,0,0.3)] hover:brightness-110"
            >
              <Workflow className="h-4 w-4" />
              New Scenario
            </Link>
          </div>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-5`}> 
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Visual Canvas</h2>
              <p className="text-sm text-slate-400">Drag nodes, define conditions, and connect cross-channel automations.</p>
            </div>
            <button className="text-sm font-semibold text-[#06FF00]">Show Execution Log</button>
          </header>

          <div className="relative overflow-hidden rounded-3xl border border-dashed border-[#06FF00]/30 bg-gradient-to-br from-[#06FF00]/10 via-black/50 to-emerald-500/10 p-10 backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,255,0,0.15),rgba(6,255,0,0)_55%)]" />
            <div className="relative grid min-h-[420px]">
              {automationNodes.map((node) => (
                <AutomationNode key={node.id} {...node} />
              ))}

              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 420">
                <path
                  d="M110 80 H210 C240 80 240 160 270 160 H360"
                  className="fill-none stroke-[#06FF00]/60 stroke-[3]" strokeLinecap="round"
                />
                <path
                  d="M270 160 V260 C270 290 310 300 360 300"
                  className="fill-none stroke-[#06FF00]/40 stroke-[3]" strokeLinecap="round" strokeDasharray="8 8"
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
            <h2 className="text-lg font-semibold text-white">Scenario Blueprint</h2>
            <p className="mt-1 text-sm text-slate-400">Configure steps, SLAs, and dependencies before go-live.</p>
          </header>

          <div className="space-y-4">
            {[
              {
                title: "Orchestration",
                description: "Combine emails, webhooks, manual tasks, and CRM updates in a single view.",
              },
              {
                title: "Failure Management",
                description: "Automatic fallback to alternative mailboxes and exportable logs for audits.",
              },
              {
                title: "Mailcow Synchronization",
                description: "Mailbox provisioning and warm-up monitoring directly from the canvas.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-sm text-[#06FF00] backdrop-blur">
            <div className="flex items-start gap-3">
              <GitBranch className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">Next Steps</p>
                <p className="text-xs text-[#06FF00]/80">Add split on opens and integrate SMS sequence (add-on module).</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <Rocket className="h-5 w-5 text-[#06FF00]" />
              <div className="space-y-2">
                <p className="font-semibold text-white">Go-Live Checklist</p>
                <div className="grid gap-2 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>QA copy and personalizations</span>
                    <StatusPill label="Completed" tone="success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Verify tracking traces</span>
                    <StatusPill label="To Verify" tone="warning" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Legal & compliance review</span>
                    <StatusPill label="In Progress" tone="info" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-xs text-[#06FF00] backdrop-blur">
            <p className="font-semibold">Collaboration</p>
            <p className="mt-1 text-[#06FF00]/80">Invite the product team to comment on each node and approve the scenario.</p>
            <Link href="/crm" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
              Assign Owner
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
      className="absolute w-60 rounded-2xl border border-white/10 bg-black/80 px-4 py-4 text-sm text-slate-300 shadow-[0_0_30px_rgba(6,255,0,0.15)] backdrop-blur-lg"
      style={{ top: position.top, left: position.left }}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-white">{title}</p>
        <StatusPill label={nodeToneLabels[tone]} tone={tone} />
      </div>
      <p className="mt-2 text-xs text-slate-400">{description}</p>
      <div className="mt-3 inline-flex rounded-full bg-[#06FF00]/10 px-3 py-1 text-[11px] font-semibold text-[#06FF00]">
        Drag node
      </div>
    </div>
  );
}
