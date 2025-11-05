"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

type TopbarProps = {
  activeItemLabel: string;
  onOpenMobileNav: () => void;
};

export function AppTopbar({ activeItemLabel, onOpenMobileNav }: TopbarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[var(--background)]/80 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 px-4 py-4 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.45)] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-6">
        <div className="flex w-full items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/80 text-[var(--foreground)] shadow-sm lg:hidden"
            onClick={onOpenMobileNav}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden shrink-0 items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2 text-sm font-semibold text-blue-600 sm:flex">
            <Sparkles className="h-4 w-4" />
            <span>{activeItemLabel}</span>
          </div>

          <div className="relative flex w-full items-center gap-3">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-[var(--muted)]" />
            <input
              type="search"
              placeholder="Cerca campagne, contatti o domini..."
              className={cn(
                "w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/60 pl-12 pr-4 text-sm font-medium text-[var(--foreground)] outline-none transition",
                isSearchFocused ? "border-blue-200 shadow-[0_20px_40px_-30px_rgba(37,99,235,0.65)]" : "hover:border-[var(--border-strong)]",
              )}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl border border-blue-200 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-500/15 lg:inline-flex"
          >
            <Plus className="h-4 w-4" />
            Nuova Automazione
          </button>

          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--border-strong)]"
          >
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500 text-white shadow-md">
              <span>BL</span>
            </div>
            <div className="hidden flex-col items-start leading-tight sm:flex">
              <span>Bluelime HQ</span>
              <span className="text-xs font-medium text-[var(--muted)]">Plan: Infinity</span>
            </div>
            <ChevronDown className="h-4 w-4 text-[var(--muted)]" />
          </button>
        </div>
      </div>
    </header>
  );
}
