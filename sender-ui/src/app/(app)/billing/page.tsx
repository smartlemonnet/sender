import Link from "next/link";
import { ArrowRight, BadgePercent, CreditCard, Shield, Sparkles, Zap } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";

const panel =
  "rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(6,255,0,0.08)] backdrop-blur";

// TODO: Feed plans and usage with Supabase (tables: plans, subscriptions, usage_stats).
const plans = [
  {
    name: "Starter",
    price: "€149",
    send: "150k sends/month",
    features: [
      "2 active domains",
      "Basic automations",
      "Drag & drop editor",
      "Standard support",
    ],
  },
  {
    name: "Scale",
    price: "€349",
    send: "450k sends/month",
    features: [
      "5 active domains",
      "Advanced canvas",
      "Mailcow reply routing",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Infinity",
    price: "Custom",
    send: "Unlimited sends (dedicated policy)",
    features: [
      "Unlimited domains",
      "99.9% SLA",
      "Compliance management",
      "Dedicated account manager",
    ],
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Plans & Billing"
        description="Manage subscriptions, send limits, and add-ons for mailboxes and automations."
        breadcrumbs={[
          { label: "App" },
          { label: "Billing" },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-6`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Available Plans</h2>
              <p className="text-sm text-slate-400">Flexible pricing based on volumes, domains, and active automations.</p>
            </div>
            <button className="text-sm font-semibold text-[#06FF00]">Download Price List</button>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col gap-4 rounded-3xl border px-5 py-6 text-sm backdrop-blur ${
                  plan.highlight
                    ? "border-[#06FF00]/30 bg-gradient-to-br from-[#06FF00]/10 via-black/60 to-emerald-500/10 shadow-[0_0_40px_rgba(6,255,0,0.2)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.highlight ? (
                  <span className="absolute -top-3 right-5 inline-flex rounded-full bg-[#06FF00] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-black">
                    Best seller
                  </span>
                ) : null}
                <div>
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="mt-2 text-3xl font-semibold text-white">{plan.price}<span className="text-sm font-medium text-slate-400">/month</span></p>
                  <p className="mt-1 text-xs text-slate-400">{plan.send}</p>
                </div>
                <ul className="space-y-2 text-xs text-slate-400">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#06FF00]/10 text-[#06FF00]">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#06FF00]/30">
                  Choose Plan
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-sm text-[#06FF00] backdrop-blur">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">Available Add-ons</p>
                <p className="text-xs text-[#06FF00]/80">Accelerated warm-up, advanced analytics, multi-channel SMS/LinkedIn, and multiple workspaces.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${panel} space-y-6`}>
          <header>
            <h2 className="text-lg font-semibold text-white">Active Billing</h2>
            <p className="mt-1 text-sm text-slate-400">Overview of current plan and payment methods.</p>
          </header>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Current Plan</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-white">Infinity Enterprise</p>
                <p className="text-xs text-slate-400">Unlimited sends · Custom SLA</p>
              </div>
              <StatusBadge label="Active" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Next renewal · Mar 01, 2026</span>
              <button className="text-[#06FF00]">Invoice History</button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Payment Method</p>
                <p className="text-xs text-slate-400">Visa ending · 3024 · exp. 08/27</p>
              </div>
              <CreditCard className="h-5 w-5 text-[#06FF00]" />
            </div>
            <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#06FF00]">
              Update Card
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <BadgePercent className="h-5 w-5 text-[#06FF00]" />
              <div className="space-y-1">
                <p className="font-semibold text-white">Monthly Usage</p>
                <p className="text-xs text-slate-400">Sends: 612,340 / unlimited · Positive replies: 132,480</p>
                <div className="h-3 rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#06FF00] to-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-[#06FF00]" />
              <div className="space-y-1">
                <p className="font-semibold text-white">Guaranteed Compliance</p>
                <p className="text-xs text-slate-400">GDPR, CAN-SPAM, CASL, LGPD: documentation and audits on request.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-xs text-[#06FF00] backdrop-blur">
            <p className="font-semibold">Want to scale beyond 5M sends/month?</p>
            <p className="mt-1 text-[#06FF00]/80">Contact the sales team for a dedicated plan, isolated infrastructure, and custom IP pools.</p>
            <Link href="/support" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
              Talk to Us
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
    <span className="inline-flex items-center gap-1 rounded-full border border-[#06FF00]/20 bg-[#06FF00]/10 px-3 py-1 text-xs font-semibold text-[#06FF00]">
      {label}
    </span>
  );
}
