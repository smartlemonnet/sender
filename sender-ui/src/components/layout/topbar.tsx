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
    <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 shadow-[0_0_40px_rgba(6,255,0,0.08)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-6">
        <div className="flex w-full items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white shadow-sm lg:hidden"
            onClick={onOpenMobileNav}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden shrink-0 items-center gap-3 rounded-xl border border-[#06FF00]/20 bg-[#06FF00]/10 px-3 py-2 text-sm font-semibold text-[#06FF00] sm:flex">
            <Sparkles className="h-4 w-4" />
            <span>{activeItemLabel}</span>
          </div>

          <div className="relative flex w-full items-center gap-3">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-500" />
            <input
              type="search"
              placeholder="Search campaigns, contacts, or domains..."
              className={cn(
                "w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 py-2.5 text-sm font-medium text-white outline-none transition placeholder:text-slate-500",
                isSearchFocused ? "border-[#06FF00]/30 shadow-[0_0_30px_rgba(6,255,0,0.15)]" : "hover:border-white/20",
              )}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl border border-[#06FF00]/20 bg-[#06FF00]/10 px-3 py-2 text-sm font-semibold text-[#06FF00] transition hover:bg-[#06FF00]/20 lg:inline-flex"
          >
            <Plus className="h-4 w-4" />
            New Automation
          </button>

          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:border-[#06FF00]/30"
          >
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#06FF00] to-emerald-500 text-black shadow-[0_0_20px_rgba(6,255,0,0.3)]">
              <span>BL</span>
            </div>
            <div className="hidden flex-col items-start leading-tight sm:flex">
              <span>BlueLime HQ</span>
              <span className="text-xs font-medium text-slate-400">Plan: Infinity</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
