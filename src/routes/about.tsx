import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Award, Users, Truck, Target, Eye } from "lucide-react";
import warehouseImg from "@/assets/about-warehouse.jpg";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — H.K. Motors | Sri Lankan Spare Parts Supplier" },
      { name: "description", content: "Learn about H.K. Motors — Sri Lanka's trusted spare parts dealer with over 15 years of experience serving fleet operators, workshops and vehicle owners." },
      { property: "og:title", content: "About H.K. Motors" },
      { property: "og:description", content: "15+ years of automotive spare parts experience in Sri Lanka." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2008", title: "H.K. Motors founded", desc: "Started as a small spare parts shop in Colombo serving Tata Ace owners." },
  { year: "2012", title: "Expanded to commercial fleet", desc: "Became a trusted supplier for delivery and logistics businesses across the Western Province." },
  { year: "2016", title: "Mahindra & Maruti range added", desc: "Diversified inventory to include passenger vehicles and SUV parts." },
  { year: "2020", title: "Island-wide delivery", desc: "Partnered with national couriers to deliver parts to every district in Sri Lanka." },
  { year: "2024", title: "Online catalogue launched", desc: "Brought our 1000+ part inventory online — making it easy to find and enquire instantly." },
];

const stats = [
  { value: "15+", label: "Years in business" },
  { value: "1000+", label: "Parts in inventory" },
  { value: "11", label: "Vehicle brands" },
  { value: "5000+", label: "Happy customers" },
];

const reasons = [
  "We stock parts — we don't just list them",
  "Same-day dispatch for Colombo and suburbs",
  "Workshops, fleets and walk-in customers all welcome",
  "Honest advice — we tell you if a cheaper option will do",
  "Direct WhatsApp line with our parts team",
  "Returns accepted if part doesn't fit",
];

function AboutPage() {
  return (
    <>
      <PageHero
        title="Sri Lanka's trusted spare parts partner since 2008"
        subtitle="We're an automotive spare parts business built by people who love vehicles — and who've spent over a decade keeping them on the road."
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="section-y">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Story</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">From a single Tata Ace counter to a national parts supplier</h2>
            <div className="mt-5 space-y-4 text-foreground/80 leading-relaxed">
              <p>H.K. Motors began in 2008 as a small spare parts shop in Colombo, started by automotive enthusiasts who had spent years working on Tata commercial vehicles. We knew first-hand how hard it was for owners and mechanics to find the right part at a fair price.</p>
              <p>Today we supply parts for eleven vehicle brands across Sri Lanka — from the popular Tata Ace and Mahindra Maxximo to passenger cars like the Maruti Alto, Nissan Sunny and Mazda Familia. Our customers range from individual owners to fleet operators running dozens of vehicles.</p>
              <p>What hasn't changed is the way we work: stock the right parts, give honest advice, and answer the phone when you call.</p>
            </div>
          </div>
          <div className="relative">
            <img src={warehouseImg} alt="H.K. Motors warehouse" width={1600} height={1024} loading="lazy" className="rounded-lg w-full aspect-[4/3] object-cover" />
            <div className="absolute -bottom-6 -left-6 hidden md:block bg-accent text-accent-foreground p-5 rounded-lg shadow-lg">
              <div className="font-display text-3xl font-bold">15+</div>
              <div className="text-xs uppercase tracking-widest">Years serving Sri Lanka</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-surface section-y">
        <div className="container-page grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-border bg-card p-7">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-foreground">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-foreground">Our Mission</h3>
            <p className="mt-3 text-foreground/75 leading-relaxed">
              To keep Sri Lankan vehicles running reliably by supplying genuine spare parts at fair prices, backed by honest expert advice and dependable service.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-7">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-accent text-accent-foreground">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-foreground">Our Vision</h3>
            <p className="mt-3 text-foreground/75 leading-relaxed">
              To be Sri Lanka's most trusted automotive spare parts brand — the first call every workshop, fleet manager and vehicle owner makes when they need a part.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-y">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="font-display text-4xl font-bold text-accent">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Journey</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">15 years of growing with Sri Lanka's auto industry</h2>
          </div>
          <div className="mt-12 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <div key={t.year} className={`relative flex gap-6 md:gap-0 md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="md:w-1/2 md:px-10">
                    <div className="rounded-lg border border-border bg-card p-5">
                      <div className="font-display text-2xl font-bold text-accent">{t.year}</div>
                      <h3 className="mt-1 font-display text-lg font-bold text-foreground">{t.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 grid h-3 w-3 place-items-center rounded-full bg-accent ring-4 ring-surface" />
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="section-y">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Why Customers Trust Us</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">No upselling. No guesswork. Just the right part.</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {reasons.map((r) => (
              <div key={r} className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="font-medium text-foreground">{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold">Ready to find your part?</h3>
              <p className="mt-2 text-primary-foreground/75">Browse the catalogue or send us your vehicle details directly.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/parts" className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90">Browse Parts</Link>
              <Link to="/contact" className="inline-flex items-center rounded-md border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
