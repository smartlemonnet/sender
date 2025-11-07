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
  "rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(6,255,0,0.08)] backdrop-blur";

// TODO: Bind settings to Supabase/Auth services (workspace, notifications, API keys).

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Configure workspace, security, and integrations for the entire BlueLime team."
        breadcrumbs={[
          { label: "App" },
          { label: "Settings" },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className={`${panel} space-y-6`}>
          <div>
            <h2 className="text-lg font-semibold text-white">Organization Profile</h2>
            <p className="text-sm text-slate-400">Update main information and shared branding with the suite.</p>
          </div>

          <form className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="org-name" className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Organization Name
                </label>
                <input
                  id="org-name"
                  defaultValue="BlueLime Universe"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#06FF00]/30 backdrop-blur"
                />
              </div>
              <div>
                <label htmlFor="workspace-domain" className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Workspace Domain
                </label>
                <input
                  id="workspace-domain"
                  defaultValue="sender.bluelime.universe"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#06FF00]/30 backdrop-blur"
                />
              </div>
            </div>

            <div>
              <label htmlFor="timezone" className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Primary Timezone
              </label>
              <select
                id="timezone"
                defaultValue="Europe/Rome"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#06FF00]/30 backdrop-blur"
              >
                <option value="Europe/Rome">Europe / Rome</option>
                <option value="Europe/Paris">Europe / Paris</option>
                <option value="America/New_York">America / New York</option>
                <option value="Asia/Singapore">Asia / Singapore</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Email Branding
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {[
                  "logo-bluelime.svg",
                  "banner-outreach.png",
                  "footer-legal.html",
                ].map((asset) => (
                  <span key={asset} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-400 backdrop-blur">
                    {asset}
                  </span>
                ))}
                <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-dashed border-[#06FF00]/30 px-4 py-2 text-xs font-semibold text-[#06FF00]">
                  <Sparkles className="h-4 w-4" />
                  Upload Asset
                </button>
              </div>
            </div>
          </form>

          <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-xs text-[#06FF00] backdrop-blur">
            <p className="font-semibold">Suite Alignment</p>
            <p className="mt-1 text-[#06FF00]/80">Graphic identity is synced with active modules in the BlueLime Universe suite.</p>
          </div>
        </div>

        <div className={`${panel} space-y-5`}>
          <header>
            <h2 className="text-lg font-semibold text-white">Notifications & Roles</h2>
            <p className="mt-1 text-sm text-slate-400">Manage operational alerts and granular permissions for teams.</p>
          </header>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Deliverability Alerts</p>
                  <p className="text-xs text-slate-400">Email + Slack whenever bounce or spam exceed threshold.</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <span className="flex h-6 w-11 items-center rounded-full bg-white/10 transition peer-checked:bg-[#06FF00] peer-checked:shadow-[0_0_0_6px_rgba(6,255,0,0.15)]">
                    <span className="ml-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5" />
                  </span>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <UserCog className="h-5 w-5 text-[#06FF00]" />
                <div>
                  <p className="text-sm font-semibold text-white">Advanced Roles</p>
                  <p className="text-xs text-slate-400">Assign granular permissions for campaigns, CRM, and automations.</p>
                </div>
              </div>
              <Link href="/settings/roles" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#06FF00]">
                Configure Roles
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-[#06FF00]" />
                <div className="space-y-2">
                  <p className="font-semibold text-white">Daily Digest</p>
                  <p className="text-xs text-slate-400">Report emails sent, priority replies, and warm-up status.</p>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 text-xs text-slate-400">
                      <input type="checkbox" defaultChecked />
                      Email
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-slate-400">
                      <input type="checkbox" defaultChecked />
                      Slack
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-slate-400">
                      <input type="checkbox" />
                      Webhook
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#06FF00]/20 bg-[#06FF00]/10 p-4 text-xs text-[#06FF00] backdrop-blur">
              <p className="font-semibold">API Access</p>
              <p className="mt-1 text-[#06FF00]/80">Generate scoped keys for integration with the BlueLime suite.</p>
              <Link href="/settings/api" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
                Manage Keys
                <KeySquare className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-[#06FF00]" />
                <div className="space-y-1">
                  <p className="font-semibold text-white">Advanced Security</p>
                  <p className="text-xs text-slate-400">SAML SSO, mandatory 2FA, and shared password policies in the suite.</p>
                  <Link href="/settings/security" className="inline-flex items-center gap-2 text-xs font-semibold text-[#06FF00]">
                    Open Settings
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
