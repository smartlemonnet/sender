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
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-5 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.55)] lg:flex-row lg:items-center lg:justify-between lg:px-7 lg:py-6">
      <div className="flex flex-col gap-3">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="flex items-center text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <div key={crumb.label} className="flex items-center gap-2">
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="transition hover:text-[var(--foreground)]">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-[var(--foreground)]" : undefined}>
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
          <h1 className="text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm text-[var(--muted)] sm:text-base">{description}</p>
          ) : null}
        </div>
      </div>

      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
}
