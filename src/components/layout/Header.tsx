import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Search, Wrench, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import logoPng from "@/assets/logo.png";



export function Header() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/", label: t("nav_home") },
    { to: "/vehicles", label: t("nav_vehicles") },
    { to: "/parts", label: t("nav_inventory") },
    { to: "/about", label: t("nav_about") },
    { to: "/contact", label: t("nav_support") },
  ] as const;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500",
      scrolled ? "bg-primary/95 backdrop-blur-xl border-b border-white/10 py-2 shadow-2xl" : "bg-transparent py-4 text-white"
    )}>
      {/* SVG filter to remove white background from logo */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <filter id="chroma-key-white" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1.5 -1.5 -1.5 4.5 -0.1"
          />
        </filter>
      </svg>

      <div className={cn(
        "hidden md:block transition-all duration-500 overflow-hidden",
        scrolled ? "h-0" : "h-10 bg-primary/5 border-b border-primary/5"
      )}>
        <div className="container-page flex h-10 items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-accent" /> Guaranteed OEM Quality</span>
            <span className="w-px h-3 bg-border" />
            <span>Sri Lanka's Preferred Vendor</span>
          </div>
          <a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-accent transition-colors">
            <Phone className="h-3 w-3" /> {SITE.phone}
          </a>
        </div>
      </div>

      <div className={cn(
        "container-page flex items-center justify-between gap-8 transition-all duration-500",
        scrolled ? "h-16" : "h-24"
      )}>
        <Link to="/" className="flex items-center shrink-0 group -ml-4">
          <div className="relative">
            <div className="absolute inset-0 bg-accent blur-2xl opacity-10 group-hover:opacity-30 transition-opacity" />
            <img
              src={logoPng}
              alt="HK Motors"
              className={cn(
                "relative w-auto object-contain transition-all duration-500 group-hover:scale-105",
                scrolled ? "h-14" : "h-20"
              )}
              style={{ filter: "url(#chroma-key-white)" }}
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 bg-surface/50 backdrop-blur-md border border-border p-1 rounded-full">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all rounded-full",
                  active ? "text-white bg-primary shadow-lg shadow-black/10" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden xl:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              className="rounded-xl bg-surface border border-border pl-9 pr-4 py-2.5 text-xs font-bold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all w-48 focus:w-64"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate({ to: '/parts', search: { q: e.currentTarget.value } as any });
                }
              }}
            />
          </div>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center bg-surface border border-border rounded-xl p-1">
            {(["EN", "සිං", "தமிழ்"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-3 py-1.5 text-[10px] font-black transition-all rounded-lg",
                  lang === l ? "bg-accent text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center rounded-xl bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
          >
            Get Quote
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden grid place-items-center rounded-xl border border-border bg-surface p-2.5 hover:border-accent transition-colors"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="container-page py-6 flex flex-col gap-4">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 flex justify-center items-center rounded-xl bg-accent px-6 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground"
              >
                Request Support
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
