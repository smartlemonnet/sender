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
  "rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_30px_60px_-45px_rgba(6,255,0,0.15)] backdrop-blur";

// TODO: Connect tickets and SLA with Supabase + helpdesk integration.

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Help Center"
        description="Resources, SLA, and direct channels for Sender module support."
        breadcrumbs={[
          { label: "App" },
          { label: "Support" },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-6`}>
          <div>
            <h2 className="text-lg font-semibold text-white">Priority Requests</h2>
            <p className="text-sm text-slate-400">Open tickets for deliverability, infrastructure, and enterprise billing.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Deliverability & IP",
                description: "Warm-up, reputation, blacklist, and feedback loop management.",
                icon: RadioReceiver,
              },
              {
                title: "Automations",
                description: "Canvas support, webhooks, multi-tool orchestration.",
                icon: MessageSquare,
              },
              {
                title: "Billing & Contracts",
                description: "Plan upgrades, corporate bundles, dedicated SLA.",
                icon: Files,
              },
              {
                title: "Compliance & Privacy",
                description: "Legal requests, audits, anti-spam policies by country.",
                icon: ShieldAlert,
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                <div className="flex items-start gap-3">
                  <card.icon className="h-5 w-5 text-[#06FF00]" />
                  <div>
                    <p className="text-sm font-semibold text-white">{card.title}</p>
                    <p className="text-xs text-slate-400">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-6 text-sm text-[#06FF00] backdrop-blur">
            <div className="flex items-start gap-4">
              <LifeBuoy className="h-6 w-6" />
              <div className="space-y-2">
                <p className="text-lg font-semibold">Open Enterprise Ticket</p>
                <p className="text-xs text-[#06FF00]/80">2h SLA for critical incidents, direct escalation with deliverability specialist and Mail DevOps.</p>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-[#06FF00]/40 bg-[#06FF00]/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#06FF00]/30 hover:shadow-[0_0_20px_rgba(6,255,0,0.3)]">
                  Start Request
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-white">Direct Channels</h2>
            <p className="mt-1 text-sm text-slate-400">Contact the BlueLime team according to your priorities.</p>
          </header>

          <div className="space-y-4 text-sm text-slate-400">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
              <p className="text-sm font-semibold text-white">Slack Connect</p>
              <p className="text-xs text-slate-400">#sender-support channel · 35 min average response time.</p>
              <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#06FF00]">
                Open Conversation
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
              <p className="text-sm font-semibold text-white">Dedicated Email</p>
              <p className="text-xs text-[#06FF00]">support@sender.bluelime.universe</p>
              <p className="mt-1 text-xs text-slate-400">Automatic priority if Postfix/Mailcow log attached.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
              <p className="text-sm font-semibold text-white">Knowledge Base</p>
              <p className="text-xs text-slate-400">Guides on domain setup, warm-up, automations, and CRM.</p>
              <Link href="#" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#06FF00]">
                Browse Articles
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <UserCircle2 className="h-5 w-5 text-[#06FF00]" />
              <div className="space-y-1">
                <p className="font-semibold text-white">Dedicated Account Manager</p>
                <p className="text-xs text-slate-400">Chiara Lombardi • Available 9:00 - 18:00 CET · 1h SLA.</p>
                <button className="inline-flex items-center gap-2 text-xs font-semibold text-[#06FF00]">
                  Book Call
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
