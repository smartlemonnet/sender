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
  "rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(6,255,0,0.08)] backdrop-blur";

// TODO: Source data from Supabase (tables: contacts, accounts, segments) with RLS policies.
const contacts = [
  {
    id: "lead-1",
    name: "Elena Rizzi",
    role: "Head of Growth",
    company: "Hyperlane",
    email: "elena@hyperlane.com",
    status: "Nurturing",
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
    status: "Ready for Sales",
    tone: "success" as const,
    score: 93,
    lists: ["Warm replies", "SDR Team"],
  },
  {
    id: "lead-3",
    name: "Marta Costa",
    role: "CMO",
    company: "Retailia",
    email: "m.costa@retailia.eu",
    status: "Re-engage",
    tone: "warning" as const,
    score: 55,
    lists: ["Dormant 60d", "Retail"],
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
        title="CRM & Lists"
        description="Segment contacts, assign owners, and connect sales pipelines to automations."
        breadcrumbs={[
          { label: "App" },
          { label: "CRM" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-[#06FF00]/30">
              <Filter className="h-4 w-4" />
              Save Segment
            </button>
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#06FF00] via-emerald-500 to-lime-500 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(6,255,0,0.3)] hover:brightness-110"
            >
              <UserPlus className="h-4 w-4" />
              New Contact
            </Link>
          </div>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-5`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Contact Directory</h2>
              <p className="text-sm text-slate-400">Synced with Supabase + Mailcow for real-time replies.</p>
            </div>
            <button className="text-sm font-semibold text-[#06FF00]">Export CSV</button>
          </header>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.22em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Score</th>
                  <th className="px-4 py-3 text-left">Lists</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="bg-black/40 transition hover:bg-[#06FF00]/5">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-white">{contact.name}</div>
                      <p className="text-xs text-slate-400">{contact.role}</p>
                      <p className="text-xs text-[#06FF00]">{contact.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-white">{contact.company}</div>
                      <p className="text-xs text-slate-400">ICP • {contact.company.length > 8 ? "Enterprise" : "Growth"}</p>
                    </td>
                    <td className="px-4 py-4">
                      <StatusPill label={contact.status} tone={contact.tone} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#06FF00]/10 px-3 py-1 text-sm font-semibold text-[#06FF00]">
                        {contact.score}
                        <span className="text-xs font-medium text-[#06FF00]/70">/100</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2 text-xs">
                        {contact.lists.map((list) => (
                          <span key={list} className="rounded-full bg-white/5 px-3 py-1 font-semibold text-slate-400">
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
            <h2 className="text-lg font-semibold text-white">Dynamic Segmentation</h2>
            <p className="mt-1 text-sm text-slate-400">Use multi-condition filters with real-time preview.</p>
          </header>

          <div className="space-y-3">
            {[
              {
                title: "Primary Segment",
                criteria: "(Industry = SaaS) AND (ARR &gt; 5M) AND (Role IN [Growth, Marketing])",
              },
              {
                title: "Compliance Exclusions",
                criteria: "Global opt-out + regions with insufficient consent",
              },
              {
                title: "Reply Trigger",
                criteria: "Replies in last 3 days OR meeting confirmed",
              },
            ].map((segment) => (
              <div key={segment.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{segment.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">{segment.criteria}</p>
                  </div>
                  <button className="text-xs font-semibold text-[#06FF00]">Edit</button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-xs text-[#06FF00] backdrop-blur">
            <p className="font-semibold">Real-time Supabase Sync</p>
            <p className="mt-1 text-[#06FF00]/80">Instant updates via Row Level Security and custom webhooks.</p>
            <Link href="/settings" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
              Configure Policies
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <NotebookPen className="h-5 w-5 text-[#06FF00]" />
              <div className="space-y-2">
                <p className="font-semibold text-white">Activity Timeline</p>
                <div className="space-y-2 text-xs text-slate-400">
                  <p>• 08:45 · Reply received from thomas@nordicops.io → assigned to SDR</p>
                  <p>• 10:32 · Tag &quot;Q1 Webinar&quot; added to 640 contacts</p>
                  <p>• 12:18 · Updated list &quot;Dormant 60d&quot; from 1,220 → 980 contacts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-sm text-[#06FF00] backdrop-blur">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5" />
              <div>
                <p className="font-semibold">Company Accounts</p>
                <p className="text-xs text-[#06FF00]/80">Link multiple contacts to the same account with consolidated views.</p>
                <Link href="/mailboxes" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold">
                  Mailbox Provisioning
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
