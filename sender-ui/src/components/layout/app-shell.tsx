"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Send,
  GitBranch,
  Users2,
  Mail,
  BarChart3,
  CreditCard,
  Settings,
  LifeBuoy,
} from "lucide-react";

import { AppSidebar, type NavSection } from "./sidebar";
import { AppTopbar } from "./topbar";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Campaigns", href: "/campaigns", icon: Send },
      { label: "Automations", href: "/automations", icon: GitBranch },
      { label: "CRM", href: "/crm", icon: Users2 },
      { label: "Mailboxes", href: "/mailboxes", icon: Mail },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Billing & Plans", href: "/billing", icon: CreditCard },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
  {
    title: "Support",
    items: [{ label: "Help Center", href: "/support", icon: LifeBuoy }],
  },
];

const FLAT_NAV = NAV_SECTIONS.flatMap((section) => section.items);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const activeItem = useMemo(
    () =>
      FLAT_NAV.find((item) =>
        pathname === "/" ? item.href === "/dashboard" : pathname.startsWith(item.href),
      ) ?? null,
    [pathname],
  );

  return (
    <div className="relative flex min-h-screen bg-[#0A0A0A] text-slate-50">
      {/* Animated background gradient */}
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#06FF00]/20 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]" />
      </div>

      <AppSidebar
        sections={NAV_SECTIONS}
        activePath={pathname}
        isMobileOpen={isMobileNavOpen}
        onMobileClose={() => setIsMobileNavOpen(false)}
      />

      <div className="relative z-10 flex flex-1 flex-col lg:pl-72">
        <AppTopbar
          activeItemLabel={activeItem?.label ?? "Dashboard"}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
        />
        <main className="flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
