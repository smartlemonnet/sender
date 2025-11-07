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
  "rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(6,255,0,0.08)] backdrop-blur";

// TODO: Integrate real data from Mailcow/Supabase (table mailboxes + view warmup_status).
const mailboxes = [
  {
    id: "mb-01",
    address: "outreach@orbitallabs.io",
    domain: "orbitallabs.io",
    plan: "Infinity",
    status: "Warm-up Phase 3",
    tone: "info" as const,
    sendLimit: "1,200/d",
    replyTo: "sales@orbitallabs.io",
  },
  {
    id: "mb-02",
    address: "pipelines@retailia.eu",
    domain: "retailia.eu",
    plan: "Scale",
    status: "Active",
    tone: "success" as const,
    sendLimit: "900/d",
    replyTo: "crm@retailia.eu",
  },
  {
    id: "mb-03",
    address: "latam@hyperlane.com",
    domain: "hyperlane.com",
    plan: "Starter",
    status: "Provisioning",
    tone: "warning" as const,
    sendLimit: "—",
    replyTo: "support@hyperlane.com",
  },
];

export default function MailboxesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Mailboxes & Domains"
        description="Provisioning, warm-up, and reputation monitoring for dedicated cold outreach mailboxes."
        breadcrumbs={[
          { label: "App" },
          { label: "Mailboxes" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-[#06FF00]/30">
              <Layers className="h-4 w-4" />
              Generate Domain
            </button>
            <Link
              href="/billing"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#06FF00] via-emerald-500 to-lime-500 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(6,255,0,0.3)] hover:brightness-110"
            >
              <Mail className="h-4 w-4" />
              Add Mailbox
            </Link>
          </div>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Mailbox Inventory</h2>
              <p className="text-sm text-slate-400">Centralized management with connection to Mailcow OVH cluster.</p>
            </div>
            <button className="text-sm font-semibold text-[#06FF00]">Sync Now</button>
          </header>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.22em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Mailbox</th>
                  <th className="px-4 py-3 text-left">Domain</th>
                  <th className="px-4 py-3 text-left">Plan</th>
                  <th className="px-4 py-3 text-left">Sends</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Reply-to</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {mailboxes.map((mailbox) => (
                  <tr key={mailbox.id} className="bg-black/40 transition hover:bg-[#06FF00]/5">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-white">{mailbox.address}</div>
                      <p className="text-xs text-slate-400">ID {mailbox.id}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-400">{mailbox.domain}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-[#06FF00]/10 px-3 py-1 text-xs font-semibold text-[#06FF00]">
                        {mailbox.plan}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-white">{mailbox.sendLimit}</td>
                    <td className="px-4 py-4">
                      <StatusPill label={mailbox.status} tone={mailbox.tone} />
                    </td>
                    <td className="px-4 py-4 text-[#06FF00]">{mailbox.replyTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-white">Guided Provisioning</h2>
            <p className="mt-1 text-sm text-slate-400">Three-step wizard for custom domain onboarding.</p>
          </header>

          <ol className="space-y-3 text-sm text-slate-400">
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <p className="font-semibold text-white">1. DNS Verification</p>
              <p className="text-xs">SPF, DKIM, DMARC, and MX records automatically generated.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <p className="font-semibold text-white">2. Smart Warm-up</p>
              <p className="text-xs">Progressive sending cycles coordinated with OVH IP reputation.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <p className="font-semibold text-white">3. Continuous Monitoring</p>
              <p className="text-xs">Alerts on bounce rate, spam complaints, and provider throttling.</p>
            </li>
          </ol>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-sm text-[#06FF00] backdrop-blur">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">Compliance & Reputation</p>
                <p className="text-xs text-[#06FF00]/80">Centralized logs for audits, blacklist management, and provider feedback loops.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <Globe2 className="h-5 w-5 text-[#06FF00]" />
              <div className="space-y-2">
                <p className="font-semibold text-white">OVH Cluster</p>
                <div className="space-y-1 text-xs text-slate-400">
                  <p>• VPS-3 · Strasbourg · 8 vCore / 24 GB RAM / 200 GB SSD</p>
                  <p>• IP 51.210.4.94 · IPv6 2001:41d0:404:200::3b95</p>
                  <p>• 99.9% uptime monitor · Manual failover planned Q2</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-xs text-[#06FF00] backdrop-blur">
            <p className="font-semibold">Corporate Bundle</p>
            <p className="mt-1 text-[#06FF00]/80">Offer 25/50/100 mailbox packages with dedicated SLA and custom setup.</p>
            <Link href="/billing" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
              Create Offer
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-[#06FF00]" />
              <div className="space-y-1">
                <p className="font-semibold text-white">API & Integrations</p>
                <p className="text-xs text-slate-400">Provisioning via REST API, webhooks for mail events, and no-code modules for marketing teams.</p>
                <Link href="/settings" className="inline-flex items-center gap-2 text-xs font-semibold text-[#06FF00]">
                  Manage Credentials
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
