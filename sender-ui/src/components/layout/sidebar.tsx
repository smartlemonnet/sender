"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import { Menu, X, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

type SidebarProps = {
  sections: NavSection[];
  activePath: string;
  isMobileOpen: boolean;
  onMobileClose: () => void;
};

export function AppSidebar({ sections, activePath, isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileOpen) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const content = (
    <div className="flex h-full flex-col gap-6 overflow-hidden border-r border-white/10 bg-black/50 px-4 pb-6 pt-6 shadow-[8px_0_30px_-20px_rgba(6,255,0,0.15)] backdrop-blur lg:px-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#06FF00] to-emerald-500 text-black shadow-[0_0_30px_rgba(6,255,0,0.4)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#06FF00]">BlueLime Universe</p>
            <p className="text-lg font-semibold text-white">Sender Control</p>
          </div>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-[#06FF00]/30 hover:text-white lg:hidden"
          onClick={onMobileClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto pr-1 text-sm">
        {sections.map((section) => (
          <Fragment key={section.title ?? "main"}>
            {section.title ? (
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {section.title}
              </p>
            ) : null}
            <div className="mt-3 space-y-1">
              {section.items.map((item) => {
                const isActive =
                  activePath === item.href ||
                  (item.href !== "/" && activePath.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-all",
                      "border border-transparent",
                      isActive
                        ? "border-[#06FF00]/20 bg-[#06FF00]/10 text-[#06FF00] shadow-[0_0_20px_rgba(6,255,0,0.15)]"
                        : "text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </span>
                    {item.badge ? (
                      <span className="rounded-full bg-[#06FF00]/20 px-2 py-0.5 text-xs font-semibold text-[#06FF00]">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </Fragment>
        ))}
      </nav>

      <div className="rounded-2xl border border-[#06FF00]/20 bg-gradient-to-br from-[#06FF00]/10 via-emerald-500/10 to-lime-500/10 p-5 text-white shadow-[0_0_30px_rgba(6,255,0,0.15)] backdrop-blur">
        <p className="text-sm font-semibold">Unlimited Cold Outreach</p>
        <p className="mt-1 text-sm text-slate-300">
          Unlock advanced automations, additional mailboxes, and enhanced reports for your team.
        </p>
        <Link
          href="/billing"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#06FF00]/20 px-4 py-2 text-sm font-semibold text-[#06FF00] backdrop-blur transition hover:bg-[#06FF00]/30"
        >
          Upgrade Plan
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onMobileClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 -translate-x-full bg-black/95 shadow-xl transition-transform lg:translate-x-0",
          isMobileOpen && "translate-x-0",
        )}
      >
        {content}
      </aside>

      <button
        type="button"
        className="fixed left-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/80 text-white shadow-lg backdrop-blur lg:hidden"
        onClick={onMobileClose}
        aria-label="Close mobile navigation"
      >
        <X className={cn("h-5 w-5", isMobileOpen ? "block" : "hidden")} />
        <Menu className={cn("h-5 w-5", isMobileOpen ? "hidden" : "block")} />
      </button>

      <aside className="pointer-events-none fixed inset-y-0 left-0 hidden w-72 lg:pointer-events-auto lg:block">
        {content}
      </aside>
    </>
  );
}
