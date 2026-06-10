import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SITE, whatsappLink } from "@/lib/site";
import {
  Search, Truck, ShieldCheck, Headset, Tag, ArrowRight,
  Wrench, Gauge, Disc3, Filter, Fuel, Settings, Cog, CheckCircle2, Star
} from "lucide-react";
import heroImg from "@/assets/hero-workshop.jpg";
import { vehicles, parts, categories } from "@/data/catalog";
import { VehicleCard } from "@/components/VehicleCard";
import { PartCard } from "@/components/PartCard";
import { motion } from "framer-motion";
import { HeroParts } from "@/components/HeroParts";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — Premium Spare Parts for Tata, Mahindra & Maruti` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: `${SITE.name} — Genuine Spare Parts in Sri Lanka` },
      { property: "og:description", content: "Keep your fleet moving with OEM-grade reliability. Browse our inventory or contact us on WhatsApp." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const features = [
  { icon: Truck, title: "Island-wide Delivery", desc: "Fast dispatch across Sri Lanka with reliable courier partners." },
  { icon: ShieldCheck, title: "Genuine Parts", desc: "OEM-grade and authentic aftermarket parts from trusted brands." },
  { icon: Headset, title: "Expert Advice", desc: "15+ years of automotive experience — we help you find the right fit." },
  { icon: Tag, title: "Competitive Prices", desc: "Wholesale rates for fleet operators and workshops." },
];

const trustItems = [
  "Genuine Products from Authorised Suppliers",
  "Direct Relationships with Reliable Manufacturers",
  "Fast Customer Support over WhatsApp & Phone",
  "Over 15 Years of Automotive Industry Experience",
];

const popularCategories = [
  { name: "Engine", icon: Cog },
  { name: "Brakes", icon: Disc3 },
  { name: "Filters", icon: Filter },
  { name: "Suspension", icon: Gauge },
  { name: "Fuel System", icon: Fuel },
  { name: "Transmission", icon: Settings },
];

function Home() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const featuredParts = parts.slice(0, 6);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/parts", search: { q } as never });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[90vh] flex items-center overflow-hidden bg-primary text-primary-foreground">
        <img src={heroImg} alt="" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover opacity-20 filter grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/95 to-primary" aria-hidden />

        {/* 3D Element Container */}
        <div className="absolute right-[-10%] top-0 bottom-0 w-2/3 hidden lg:block">
          <HeroParts />
        </div>

        <div className="relative container-page py-20 lg:py-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-6">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" /> Precision Engineered Support
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
              {t("hero_title")}
            </h1>
            <p className="mt-8 max-w-xl text-lg sm:text-xl text-primary-foreground/70 leading-relaxed font-light">
              {t("hero_subtitle")}
            </p>

            <form onSubmit={onSearch} className="mt-12 flex w-full max-w-2xl items-center gap-2 rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-2 shadow-[0_0_50px_rgba(0,0,0,0.3)] group/form hover:border-accent/50 transition-all duration-500">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="h-5 w-5 text-accent animate-pulse" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("search_placeholder")}
                  className="w-full bg-transparent text-white placeholder:text-white/20 focus:outline-none text-base py-4 font-light tracking-wide"
                />
              </div>
              <button className="relative overflow-hidden rounded-xl bg-accent px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-accent-foreground hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20 group">
                <span className="relative z-10">{t("hero_cta_primary")}</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </button>
            </form>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/parts" className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-4 text-sm font-bold text-primary hover:bg-white/90 transition-all shadow-xl">
                Browse Full Catalogue <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold backdrop-blur-sm hover:bg-white/10 transition-all">
                Connect with Experts
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.25em] text-primary-foreground/40 font-bold">
              <span>Trusted Heritage:</span>
              {["Tata", "Mahindra", "Maruti Suzuki", "Nissan", "Mitsubishi"].map((b) => (
                <span key={b} className="text-primary-foreground/60 hover:text-accent transition-colors">{b}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {popularCategories.map((c) => (
              <Link
                key={c.name}
                to="/parts"
                search={{ category: c.name } as never}
                className="group flex flex-col items-center gap-2 rounded-2xl bg-card border border-border px-8 py-5 hover:border-accent hover:bg-accent/5 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="h-10 w-10 rounded-xl bg-surface grid place-items-center mb-1 group-hover:bg-accent group-hover:text-white transition-colors">
                  <c.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-foreground transition-colors">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section-y relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-4"
              >
                {t("trust_title")}
              </motion.span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.1]">{t("trust_heading")}</h2>
            </div>
            <p className="max-w-md text-base text-muted-foreground leading-relaxed">
              {t("trust_desc")}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card p-8 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500"
              >
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary text-primary-foreground group-hover:bg-accent group-hover:scale-110 transition-all duration-500 shadow-lg shadow-black/10">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-8 font-display text-xl font-bold text-foreground">{f.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground/80">{f.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VEHICLES */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">{t("category_title")}</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">{t("category_title")}</h2>
            </div>
            <Link to="/vehicles" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
              View all vehicles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {vehicles.slice(0, 10).map((v) => <VehicleCard key={v.slug} vehicle={v} />)}
          </div>
        </div>
      </section>

      {/* FEATURED PARTS */}
      <section className="section-y">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Featured Parts</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">Most enquired this week</h2>
            </div>
            <Link to="/parts" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
              Full catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredParts.map((p) => <PartCard key={p.id} part={p} />)}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section-y bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripes opacity-30" aria-hidden />
        <div className="relative container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Why customers trust us</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">A spare parts partner, not just a supplier</h2>
            <p className="mt-4 text-primary-foreground/75 leading-relaxed">
              Whether you run a single van or a fleet of mini-trucks, we help you keep them moving — with the right part, the first time.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
              About H.K. Motors <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="space-y-3">
            {trustItems.map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GOOGLE REVIEWS MOCKUP */}
      <section className="section-y bg-surface/50">
        <div className="container-page">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-4">Verified Experience</span>
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">4.9/5 Service Excellence</h2>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-5 w-5 fill-accent text-accent" />)}
            </div>
            <p className="mt-4 text-muted-foreground">Based on 500+ genuine reviews across Sri Lanka</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sampath K.", role: "Fleet Manager", content: "Fastest dispatch I've experienced in Kandy. The Mahindra parts are 100% genuine and competitively priced." },
              { name: "Mohamed R.", role: "Workshop Owner", content: "Their technical advice is what sets them apart. They don't just sell; they make sure you're buying the right part." },
              { name: "Nimal P.", role: "Private Owner", content: "Found a turbo kit for my Tata Ace that nobody else in Colombo had in stock. Rapid response on WhatsApp!" }
            ].map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3 w-3 fill-accent text-accent" />)}
                </div>
                <p className="text-sm italic leading-relaxed text-foreground/80">"{r.content}"</p>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="font-bold text-foreground">{r.name}</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1">{r.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">Can't find the part you need?</h3>
              <p className="mt-2 text-muted-foreground max-w-xl">Send us the part number or vehicle details on WhatsApp. We'll source it for you.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact" className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-semibold hover:border-accent">Send Enquiry</Link>
              <a href={whatsappLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
                <Wrench className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
