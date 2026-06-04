import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Truck, ShieldCheck, Headset, Tag, ArrowRight,
  Wrench, Gauge, Disc3, Filter, Fuel, Settings, Cog, CheckCircle2,
} from "lucide-react";
import heroImg from "@/assets/hero-workshop.jpg";
import { vehicles, parts, categories } from "@/data/catalog";
import { VehicleCard } from "@/components/VehicleCard";
import { PartCard } from "@/components/PartCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "H.K. Motors — Genuine Spare Parts for Tata, Mahindra, Maruti & More" },
      { name: "description", content: "Sri Lanka's trusted spare parts supplier for Tata Ace, Mahindra, Maruti Alto, Nissan, Mitsubishi, Isuzu and Mazda. Genuine and aftermarket parts in stock." },
      { property: "og:title", content: "H.K. Motors — Genuine Spare Parts in Sri Lanka" },
      { property: "og:description", content: "Genuine & quality spare parts for every vehicle. Browse parts or contact us on WhatsApp." },
      { property: "og:url", content: "/" },
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
  const [q, setQ] = useState("");
  const featuredParts = parts.slice(0, 6);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/parts", search: { q } as never });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img src={heroImg} alt="" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40" aria-hidden />
        <div className="relative container-page py-16 md:py-28 lg:py-32 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Trusted Across Sri Lanka
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Genuine & Quality <span className="text-accent">Spare Parts</span><br className="hidden sm:block" /> for Every Vehicle
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
            Trusted supplier of genuine and aftermarket spare parts for Tata, Mahindra, Maruti, Nissan, Mitsubishi, Isuzu and Mazda — for commercial and passenger vehicles.
          </p>

          <form onSubmit={onSearch} className="mt-8 flex w-full max-w-2xl items-center gap-2 rounded-lg bg-white p-2 shadow-xl shadow-black/20">
            <Search className="ml-2 h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by part name, number or vehicle (e.g. Tata Ace clutch)"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm py-2"
            />
            <button className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90">Search</button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/parts" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
              Browse Parts <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10">
              Contact Us
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-primary-foreground/60">
            <span className="font-semibold">Brands we stock:</span>
            {["Tata","Mahindra","Maruti Suzuki","Nissan","Mitsubishi","Isuzu","Mazda"].map((b) => (
              <span key={b} className="font-display font-semibold text-primary-foreground/90">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-6">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {popularCategories.map((c) => (
              <Link
                key={c.name}
                to="/parts"
                search={{ category: c.name } as never}
                className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 hover:border-accent hover:shadow-md transition-all"
              >
                <c.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
                <span className="text-xs font-semibold text-foreground">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section-y">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Why Choose H.K. Motors</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">Built on trust. Backed by experience.</h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              We supply garages, fleet operators and individual owners across Sri Lanka — with a parts inventory that keeps vehicles on the road.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="group relative rounded-lg border border-border bg-card p-6 hover:border-accent hover:shadow-md transition-all">
                <div className="grid h-12 w-12 place-items-center rounded-md bg-primary text-primary-foreground group-hover:bg-accent transition-colors">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VEHICLES */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Shop by Vehicle</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">Parts for the vehicles you drive</h2>
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

      {/* CATEGORY CTA */}
      <section className="section-y">
        <div className="container-page">
          <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">Can't find the part you need?</h3>
              <p className="mt-2 text-muted-foreground max-w-xl">Send us the part number or vehicle details on WhatsApp. We'll source it for you.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact" className="inline-flex items-center rounded-md border border-border px-5 py-3 text-sm font-semibold hover:border-accent">Send Enquiry</Link>
              <a href={`https://wa.me/94771234567`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
                <Wrench className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
