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
    <div className="flex h-full flex-col gap-6 overflow-hidden border-r border-[var(--border)] bg-[var(--surface)]/95 px-4 pb-6 pt-6 shadow-[8px_0_30px_-20px_rgba(15,23,42,0.35)] backdrop-blur lg:px-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-600">Bluelime Universe</p>
            <p className="text-lg font-semibold text-[var(--foreground)]">Sender Control</p>
          </div>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/60 text-[var(--muted)] transition hover:text-[var(--foreground)] lg:hidden"
          onClick={onMobileClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto pr-1 text-sm">
        {sections.map((section) => (
          <Fragment key={section.title ?? "main"}>
            {section.title ? (
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
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
                        ? "border-blue-100 bg-blue-50 text-blue-600 shadow-[0_12px_30px_-18px_rgba(37,99,235,0.65)]"
                        : "text-[var(--muted)] hover:border-[var(--border)] hover:bg-[var(--surface-muted)]/70 hover:text-[var(--foreground)]",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </span>
                    {item.badge ? (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
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

      <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 p-5 text-white shadow-lg">
        <p className="text-sm font-semibold">Cold outreach senza limiti</p>
        <p className="mt-1 text-sm text-blue-50/80">
          Sblocca automazioni avanzate, caselle aggiuntive e report potenziati per il tuo team.
        </p>
        <Link
          href="/billing"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
        >
          Aggiorna Piano
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden",
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onMobileClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 -translate-x-full bg-[var(--surface)] shadow-xl transition-transform lg:translate-x-0",
          isMobileOpen && "translate-x-0",
        )}
      >
        {content}
      </aside>

      <button
        type="button"
        className="fixed left-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-lg lg:hidden"
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
