import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
};

export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm px-5 py-5 shadow-[0_8px_32px_rgba(6,255,0,0.08)] lg:flex-row lg:items-center lg:justify-between lg:px-7 lg:py-6">
      <div className="flex flex-col gap-3">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="flex items-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <div key={crumb.label} className="flex items-center gap-2">
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="transition hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-white" : undefined}>
                      {crumb.label}
                    </span>
                  )}
                  {!isLast ? <ChevronRight className="h-3 w-3" /> : null}
                </div>
              );
            })}
          </nav>
        ) : null}

        <div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm text-slate-400 sm:text-base">{description}</p>
          ) : null}
        </div>
      </div>

      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
}
