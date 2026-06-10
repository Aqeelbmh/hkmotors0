import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Clock } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { vehicles } from "@/data/catalog";
import logoPng from "@/assets/logo.png";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[#0A0A0B] text-white relative overflow-hidden border-t border-white/5">
      {/* SVG filter to remove white background from logo */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <filter id="chroma-key-footer" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1.5 -1.5 -1.5 4.5 -0.1"
          />
        </filter>
      </svg>

      {/* Premium Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 diagonal-stripes opacity-[0.02]" />

      {/* TOP CTA BAR */}
      <div className="relative border-b border-white/5 bg-white/[0.02] backdrop-blur-3xl">
        <div className="container-page py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h3 className="font-display text-2xl font-bold tracking-tight">{t("hero_cta_secondary")}?</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("contact_subtitle")}</p>
          </div>
          <div className="flex gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-xs font-black uppercase tracking-widest text-accent-foreground hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
            >
              <MessageCircle className="h-4 w-4" /> {t("hero_cta_primary")}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Contact Desk
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page pt-20 pb-12 relative">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block group">
              <div className="relative">
                <div className="absolute inset-0 bg-accent blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <img
                  src={logoPng}
                  alt="HK Motors"
                  className="relative h-24 w-auto object-contain transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: "url(#chroma-key-footer)" }}
                />
              </div>
            </Link>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
              Redefining automotive reliability across Sri Lanka. A tradition of genuine precision and unmatched engineering support since 2008.
            </p>
            <div className="mt-10 flex items-center gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: MessageCircle, href: whatsappLink() }
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-accent hover:border-accent hover:text-white transition-all duration-500 hover:-translate-y-1"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-10">Navigation</h4>
            <ul className="space-y-5">
              {[
                { label: t("nav_home"), to: "/" },
                { label: t("nav_vehicles"), to: "/vehicles" },
                { label: t("nav_inventory"), to: "/parts" },
                { label: t("nav_about"), to: "/about" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-all flex items-center gap-3 group"
                  >
                    <span className="h-1 w-0 bg-accent group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet Selection */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-10">Garage</h4>
            <ul className="space-y-5">
              {vehicles.slice(0, 5).map((v) => (
                <li key={v.slug}>
                  <Link
                    to="/parts"
                    search={{ vehicle: v.slug } as any}
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-all flex items-center gap-3 group"
                  >
                    <span className="h-1 w-0 bg-accent group-hover:w-4 transition-all duration-300" />
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connectivity */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-10">Connectivity</h4>
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <div className="text-xs text-muted-foreground leading-relaxed italic">{SITE.address}</div>
              </div>
              <div className="flex gap-4">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <div className="flex flex-col gap-3">
                  {SITE.phoneNumbers.map((num) => (
                    <a key={num} href={`tel:${num}`} className="text-sm font-black tracking-tight text-white hover:text-accent transition-colors">
                      {num}
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Service Hours</span>
                </div>
                <div className="space-y-2">
                  {SITE.hours.map((h) => (
                    <div key={h.day} className="flex justify-between text-[10px] font-bold">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="text-white">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              © {new Date().getFullYear()} HK Motors Automation. All Rights Reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
            <span className="hover:text-accent transition-colors cursor-default">OEM Certified</span>
            <span className="hover:text-accent transition-colors cursor-default">Express Logistics</span>
            <span className="hover:text-accent transition-colors cursor-default">Technical Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
