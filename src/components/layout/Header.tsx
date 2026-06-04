import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Search, Wrench } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/vehicles", label: "Shop by Vehicle" },
  { to: "/parts", label: "Parts Catalogue" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="hidden md:block bg-primary text-primary-foreground/90 text-xs">
        <div className="container-page flex h-9 items-center justify-between">
          <span>Sri Lanka's trusted spare parts supplier — Tata, Mahindra, Maruti, Nissan, Mitsubishi, Isuzu & Mazda</span>
          <a href={SITE.phoneHref} className="inline-flex items-center gap-1.5 hover:text-accent">
            <Phone className="h-3.5 w-3.5" /> {SITE.phone}
          </a>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <Wrench className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-foreground">H.K. MOTORS</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Spare Parts • Sri Lanka</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md",
                  active ? "text-accent" : "text-foreground hover:text-accent"
                )}
              >
                {n.label}
                {active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-accent rounded-full" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/parts"
            className="hidden md:inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-accent"
          >
            <Search className="h-4 w-4" /> Search parts
          </Link>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
          >
            Enquire Now
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden grid place-items-center rounded-md border border-border p-2"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-page py-3 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium border-b border-border last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
