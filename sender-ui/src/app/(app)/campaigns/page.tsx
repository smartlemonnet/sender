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
  "rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(6,255,0,0.08)] backdrop-blur";

// TODO: Connect these data to Supabase views (tables: campaigns, sequences, segments).
const campaigns = [
  {
    id: "cm-001",
    name: "Scale Up EMEA",
    segment: "ICP SaaS Series A",
    owner: "Julia F.",
    schedule: "Daily drip · 5 emails",
    status: "Active",
    tone: "success" as const,
    metrics: {
      sent: "18,300",
      open: "64%",
      reply: "21%",
    },
  },
  {
    id: "cm-002",
    name: "Pilot DACH",
    segment: "AE & SDR",
    owner: "SDR Team",
    schedule: "Manual · 3 steps",
    status: "In Review",
    tone: "info" as const,
    metrics: {
      sent: "2,150",
      open: "51%",
      reply: "14%",
    },
  },
  {
    id: "cm-003",
    name: "E-commerce EU",
    segment: "Premium Retail",
    owner: "Clara L.",
    schedule: "A/B test · 2 variants",
    status: "Scheduled",
    tone: "warning" as const,
    metrics: {
      sent: "—",
      open: "—",
      reply: "—",
    },
  },
  {
    id: "cm-004",
    name: "Partner Referral",
    segment: "Marketing Studio",
    owner: "Mark P.",
    schedule: "Drip · 6 emails",
    status: "Technical Pause",
    tone: "danger" as const,
    metrics: {
      sent: "4,880",
      open: "39%",
      reply: "11%",
    },
  },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Email Campaigns"
        description="Manage pipelines, segments, and content for every outreach campaign."
        breadcrumbs={[
          { label: "App" },
          { label: "Campaigns" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-[#06FF00]/30">
              <Split className="h-4 w-4" />
              Import Sequence
            </button>
            <Link
              href="/automations"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#06FF00] via-emerald-500 to-lime-500 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(6,255,0,0.3)] hover:brightness-110"
            >
              <LayoutPanelTop className="h-4 w-4" />
              Open Canvas
            </Link>
          </div>
        }
      />

      <div className={`${panel} flex flex-wrap items-center gap-3 border-dashed border-white/10 bg-white/5`}> 
        {["All", "Automation", "Batch", "Onboarding", "Experiments"].map((filter) => (
          <button
            key={filter}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-400 transition hover:border-[#06FF00]/30 hover:text-[#06FF00]"
          >
            {filter}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
          <Clock className="h-4 w-4" />
          Last CRM sync: 12 minutes ago
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-4`}> 
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Campaign Performance</h2>
              <p className="text-sm text-slate-400">Distribution of key metrics with quick access to details.</p>
            </div>
            <button className="text-sm font-semibold text-[#06FF00]">Export Report</button>
          </header>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.22em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Campaign</th>
                  <th className="px-4 py-3 text-left">Segment</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">Sent</th>
                  <th className="px-4 py-3 text-left">Open</th>
                  <th className="px-4 py-3 text-left">Reply</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="bg-black/40 transition hover:bg-[#06FF00]/5">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-white">{campaign.name}</div>
                      <p className="text-xs text-slate-400">{campaign.schedule}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-400">{campaign.segment}</td>
                    <td className="px-4 py-4 text-slate-400">{campaign.owner}</td>
                    <td className="px-4 py-4 font-semibold text-white">{campaign.metrics.sent}</td>
                    <td className="px-4 py-4 font-semibold text-white">{campaign.metrics.open}</td>
                    <td className="px-4 py-4 font-semibold text-white">{campaign.metrics.reply}</td>
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
            <h2 className="text-lg font-semibold text-white">Editor & Workflow</h2>
            <p className="mt-2 text-sm text-slate-400">Align email builder design with visual automations and A/B tests.</p>
          </header>

          <div className="space-y-4">
            {[
              {
                title: "Drag & Drop Editor",
                description: "Modular components, dynamic blocks, and custom HTML snippets.",
              },
              {
                title: "Conditional Rules",
                description: "Personalize copy based on persona, timezone, engagement, and CRM fields.",
              },
              {
                title: "Versioning",
                description: "Version timeline with diff comparison and multi-team approval.",
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-[#06FF00] backdrop-blur">
            <div className="flex items-start gap-3">
              <Send className="mt-0.5 h-5 w-5" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Shorten Time-to-Send</p>
                <p className="text-xs text-[#06FF00]/80">Prepare multi-variable templates and controlled sends via Mailcow directly from the canvas.</p>
                <Link href="/mailboxes" className="inline-flex items-center gap-2 text-xs font-semibold">
                  Configure Connections
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <ListChecks className="h-5 w-5 text-[#06FF00]" />
              <div>
                <p className="font-semibold text-white">Pre-Send Checklist</p>
                  <ul className="mt-2 space-y-2 text-xs text-slate-400">
                    <li>✓ Verify DNS and authentication (SPF, DKIM, DMARC)</li>
                    <li>✓ Active warm-up and reputation &gt; 85</li>
                    <li>✓ Updated segments from CRM (&lt; 12h)</li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
