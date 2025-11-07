import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Flame,
  Inbox,
  MailCheck,
  Send,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusPill } from "@/components/ui/status-pill";

const panelStyles =
  "rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm p-6 shadow-[0_8px_32px_rgba(6,255,0,0.08)]";

// TODO: Replace mocks with Supabase queries (metrics, campaigns, deliverability).
const statCards = [
  {
    label: "Emails Sent",
    value: "128,930",
    change: { value: "+18.2%", trend: "up" as const },
    subtitle: "Last 30 days",
    accent: "lime" as const,
  },
  {
    label: "Response Rate",
    value: "23.8%",
    change: { value: "+4.1%", trend: "up" as const },
    subtitle: "Quarterly target: 22%",
    accent: "green" as const,
  },
  {
    label: "Active Domains",
    value: "42",
    change: { value: "3 domains warming up", trend: "steady" as const },
    subtitle: "Managed via Mailcow",
    accent: "emerald" as const,
  },
];

const campaigns = [
  {
    id: "camp-1",
    name: "SaaS Partner Onboarding EU",
    status: "Running",
    statusTone: "info" as const,
    schedule: "Nurture flow · 4 emails · 3 conditions",
    replies: "17.4%",
    nextStep: "Follow-up 3 scheduled tomorrow at 10:15 AM",
  },
  {
    id: "camp-2",
    name: "Black Friday Expansion LATAM",
    status: "Scheduled",
    statusTone: "warning" as const,
    schedule: "Batch 85,000 contacts · dynamic segments",
    replies: "–",
    nextStep: "Verify domains and warming 78% complete",
  },
  {
    id: "camp-3",
    name: "Founder Re-engagement",
    status: "Under Review",
    statusTone: "neutral" as const,
    schedule: "Manual path · dedicated sales team",
    replies: "31.2%",
    nextStep: "Assign CRM owner before go-live",
  },
];

const deliverability = [
  { metric: "Bounce rate", value: "1.12%", detail: "Target < 2%", tone: "success" as const },
  { metric: "Spam complaints", value: "0.08%", detail: "Postmaster monitoring", tone: "warning" as const },
  { metric: "Warm-up completed", value: "12/15 domains", detail: "2 domains in phase 2", tone: "info" as const },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Command Center"
        description="Operational overview of campaigns, deliverability and contact pipeline for your team."
        breadcrumbs={[
          { label: "App" },
          { label: "Dashboard" },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur-sm transition hover:border-[#06FF00]/30 hover:bg-[#06FF00]/10 hover:text-[#06FF00]"
            >
              <CalendarCheck className="h-4 w-4" />
              Schedule Send
            </Link>
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#06FF00] to-emerald-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-[#06FF00]/25 transition hover:shadow-[#06FF00]/40"
            >
              <Sparkles className="h-4 w-4" />
              New Campaign
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
              <h2 className="text-lg font-semibold text-white">Active Campaigns</h2>
              <p className="text-sm text-slate-400">Real-time monitoring of status, reply rate and next steps.</p>
            </div>
            <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm font-semibold text-[#06FF00] transition hover:text-emerald-400">
              View Board
              <ArrowRight className="h-4 w-4" />
            </Link>
          </header>

          <div className="mt-6 space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent px-4 py-4 backdrop-blur-sm transition hover:border-[#06FF00]/30 hover:bg-[#06FF00]/5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-white">{campaign.name}</h3>
                      <StatusPill label={campaign.status} tone={campaign.statusTone} />
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{campaign.schedule}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Reply rate</p>
                      <p className="text-lg font-semibold text-white">{campaign.replies}</p>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-400 backdrop-blur-sm transition hover:border-[#06FF00]/30 hover:text-[#06FF00]">
                      Open Canvas
                    </button>
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  <Zap className="h-3.5 w-3.5 text-[#06FF00]" />
                  Next Step · {campaign.nextStep}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${panelStyles} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-white">Deliverability Health</h2>
            <p className="mt-1 text-sm text-slate-400">Technical indicators aggregated from MX and Mailcow.</p>
          </header>
          <div className="space-y-4">
            {deliverability.map((item) => (
              <div
                key={item.metric}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent px-4 py-3 backdrop-blur-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{item.metric}</p>
                  <p className="text-xs text-slate-400">{item.detail}</p>
                </div>
                <StatusPill label={item.value} tone={item.tone} />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-gradient-to-br from-[#06FF00]/10 to-emerald-500/5 p-4 text-sm backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#06FF00]/20">
                <MailCheck className="h-4.5 w-4.5 text-[#06FF00]" />
              </div>
              <div>
                <p className="font-semibold text-white">Auto Warm-up in Progress</p>
                <p className="mt-1 text-xs text-emerald-200/80">3 new mailboxes are completing phase 2 thanks to the connected Mailcow module.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={`${panelStyles} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Priority CRM Pipeline</h2>
              <p className="text-sm text-slate-400">Overview of high-potential deals coordinated with email sequences.</p>
            </div>
            <Link href="/crm" className="text-sm font-semibold text-[#06FF00] transition hover:text-emerald-400">
              Go to CRM
            </Link>
          </header>

          <div className="grid gap-3">
            {["Discovery", "Evaluation", "Negotiation", "Closed Won"].map((stage, index) => (
              <div
                key={stage}
                className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent px-4 py-3 backdrop-blur-sm transition hover:border-[#06FF00]/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{stage}</p>
                    <p className="text-xs text-slate-400">{4 - index} active deals · ${(index + 1) * 35}k pipeline</p>
                  </div>
                  <StatusPill label={index === 3 ? "+12% vs target" : "On track"} tone={index === 3 ? "success" : "info"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${panelStyles} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Today's Activities</h2>
              <p className="text-sm text-slate-400">Scheduled actions from marketing and sales team.</p>
            </div>
            <button className="text-sm font-semibold text-[#06FF00] transition hover:text-emerald-400">Sync Calendar</button>
          </header>

          <div className="space-y-4">
            {[
              {
                time: "09:30 AM",
                icon: Send,
                title: "ES Retail Batch",
                detail: "Send 2,500 emails + check Amazon SES domains",
              },
              {
                time: "11:00 AM",
                icon: Inbox,
                title: "Review Priority Replies",
                detail: "Assign replies to sales team within 2 hours",
              },
              {
                time: "03:30 PM",
                icon: Flame,
                title: "Warm-up Update",
                detail: "Check IP reputation 185.61.204.24 - OVH cluster",
              },
            ].map((item) => (
              <div key={item.title} className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent px-4 py-3 backdrop-blur-sm transition hover:border-[#06FF00]/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#06FF00]/10 text-[#06FF00] transition group-hover:bg-[#06FF00]/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{item.time}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
