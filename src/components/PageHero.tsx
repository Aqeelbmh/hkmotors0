import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  crumbs,
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; to?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 diagonal-stripes opacity-40" aria-hidden />
      <div className="relative container-page py-14 md:py-20">
        {crumbs && (
          <nav className="mb-4 flex items-center gap-1.5 text-xs text-primary-foreground/60">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.to ? <Link to={c.to} className="hover:text-accent">{c.label}</Link> : <span className="text-primary-foreground">{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base md:text-lg text-primary-foreground/75">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
