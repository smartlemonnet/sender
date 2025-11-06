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
    <div className="relative flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <AppSidebar
        sections={NAV_SECTIONS}
        activePath={pathname}
        isMobileOpen={isMobileNavOpen}
        onMobileClose={() => setIsMobileNavOpen(false)}
      />

      <div className="flex flex-1 flex-col lg:pl-72">
        <AppTopbar
          activeItemLabel={activeItem?.label ?? "Dashboard"}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
        />
        <main className="flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
