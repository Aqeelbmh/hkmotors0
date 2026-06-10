import { Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <section className="relative bg-primary text-primary-foreground overflow-hidden min-h-[40vh] flex items-center">
      {/* Premium background effects */}
      <div className="absolute inset-0 diagonal-stripes opacity-20" aria-hidden />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-primary" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 blur-[100px] rounded-full" />

      <div className="relative container-page py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {crumbs && (
            <nav className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-2">
                  {c.to ? (
                    <Link to={c.to} className="hover:text-accent transition-colors flex items-center gap-1">
                      {i === 0 && <Sparkles className="h-3 w-3" />}
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-accent">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 text-white/20" />}
                </span>
              ))}
            </nav>
          )}

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.1] text-balance">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-primary-foreground/60 font-light leading-relaxed text-balance">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-10">{children}</div>}
        </motion.div>
      </div>

      {/* Modern bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
