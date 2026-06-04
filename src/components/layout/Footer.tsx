import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle, Wrench, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { vehicles } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page section-y grid gap-10 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-accent">
              <Wrench className="h-5 w-5 text-accent-foreground" />
            </span>
            <span className="font-display text-xl font-bold">H.K. MOTORS</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
            Sri Lanka's trusted supplier of genuine and aftermarket spare parts for commercial and passenger vehicles since 2008.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-md bg-white/10 hover:bg-accent">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-md bg-white/10 hover:bg-accent">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-md bg-white/10 hover:bg-accent">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/vehicles" className="hover:text-accent">Shop by Vehicle</Link></li>
            <li><Link to="/parts" className="hover:text-accent">Parts Catalogue</Link></li>
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">Vehicle Categories</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            {vehicles.slice(0, 7).map((v) => (
              <li key={v.slug}>
                <Link to="/vehicles/$slug" params={{ slug: v.slug }} className="hover:text-accent">
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />{SITE.address}</li>
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-accent shrink-0" /><a href={SITE.phoneHref} className="hover:text-accent">{SITE.phone}</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a></li>
            <li className="flex gap-3"><Clock className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <div>
                {SITE.hours.map((h) => (
                  <div key={h.day}>{h.day}: <span className="text-primary-foreground/60">{h.time}</span></div>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs text-primary-foreground/60">
          <span>© {new Date().getFullYear()} H.K. Motors. All rights reserved.</span>
          <span>Genuine Parts • Reliable Service • Trusted Across Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
}
