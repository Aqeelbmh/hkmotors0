import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { CheckCircle2, Award, Users, Truck, Target, Eye, ShieldCheck, Heart, Sparkles, ArrowRight, Wrench } from "lucide-react";
import warehouseImg from "@/assets/about-warehouse.jpg";
import { PageHero } from "@/components/PageHero";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Our Story — ${SITE.name} Automotive Excellence` },
      { name: "description", content: `Learn about ${SITE.name} — Sri Lanka's premium spare parts destination with a heritage of engineering trust and performance since 2008.` },
      { property: "og:title", content: `Our Story — ${SITE.name} Automotive Excellence` },
      { property: "og:description", content: `A legacy built on grease, grit, and genuine integrity serving the Sri Lankan automotive landscape for over 15 years.` },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2008", title: "Genesis in Colombo", desc: "Founded with a singular vision: to revolutionize the accessibility of genuine Tata components." },
  { year: "2012", title: "Fleet Dominance", desc: "Transformed into the primary logistical backbone for thousands of delivery operations nationwide." },
  { year: "2016", title: "Brand Diversification", desc: "Integrated global automotive giants including Mahindra, Maruti, and Nissan into our curated portfolio." },
  { year: "2020", title: "Digital Logistics", desc: "Pioneered a rapid-response island-wide distribution network to serve remote regions." },
  { year: "2024", title: "Automated Excellence", desc: "Launching high-tech inventory management to deliver instant quotes and unmatched precision." },
];

const stats = [
  { value: "15+", label: "Years of Heritage", icon: ShieldCheck },
  { value: "1.2k+", label: "Product Portfolio", icon: Sparkles },
  { value: "11", label: "Elite Partners", icon: Award },
  { value: "5k+", label: "Success Stories", icon: Heart },
];

const values = [
  {
    title: "Uncompromising Quality",
    desc: "We don't stock alternatives. We stock solutions. Every part is vetted for OEM precision.",
    icon: ShieldCheck
  },
  {
    title: "Human Expertise",
    desc: "Beyond parts numbers, we speak your engine's language. Real humans, real advice.",
    icon: Users
  },
  {
    title: "Accelerated Support",
    desc: "Speed is our priority. Rapid dispatch is a commitment, not an option.",
    icon: Truck
  }
];

function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        title={t("about_title")}
        subtitle={t("about_desc")}
        crumbs={[{ label: t("nav_home"), to: "/" }, { label: t("nav_about") }]}
      />

      {/* Narrative Section */}
      <section className="section-y overflow-hidden">
        <div className="container-page grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-6">Our DNA</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">A Legacy Built on Grease, Grit, and Genuine Integrity.</h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
              <p>HK Motors wasn't born in a boardroom; it was forged in the workshops of Colombo. Our founders didn't just see parts; they saw the lifelines of businesses and families.</p>
              <p>Today, while we utilize state-of-the-art logistics and a digital-first approach, our soul remains unchanged. We believe that a vehicle's performance is a reflection of its owner's commitment to quality. That's why we only curate the best.</p>
              <p className="font-medium text-foreground">Whether you're managing a nationwide logistics fleet or caring for your family's first car, you deserve parts that don't just fit—they perform.</p>
            </div>

            <div className="mt-10 flex gap-12">
              <div className="flex flex-col">
                <span className="font-display text-4xl font-black text-primary">15+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-4xl font-black text-accent">100%</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">Genuine Parts</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/10 rounded-[2rem] rotate-3 -z-10" />
            <img
              src={warehouseImg}
              alt="Engineers at work"
              className="rounded-[2rem] shadow-2xl w-full aspect-[4/5] object-cover border-4 border-white"
            />
            <div className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-3xl shadow-3xl text-white hidden md:block max-w-[200px]">
              <Sparkles className="h-8 w-8 text-accent mb-4" />
              <p className="text-sm font-bold leading-tight">Pioneering automotive standards across Sri Lanka.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="bg-primary py-20">
        <div className="container-page">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="inline-grid h-16 w-16 place-items-center rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                  <s.icon className="h-8 w-8 text-accent group-hover:text-white" />
                </div>
                <div className="font-display text-5xl font-black text-white">{s.value}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] font-bold text-white/40">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-4">Our Commitment</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">The Pillars of HK Motors</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 rounded-3xl hover:shadow-2xl hover:shadow-primary/5 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                  <v.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Humanized */}
      <section className="section-y">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-4">Evolution</span>
            <h2 className="font-display text-4xl font-bold text-foreground">Growing Alongside Our Nation</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />
            <div className="space-y-24">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="font-display text-6xl font-black text-accent/20 mb-2">{t.year}</span>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4">{t.title}</h3>
                    <p className="text-muted-foreground font-light max-w-sm">{t.desc}</p>
                  </div>
                  <div className="hidden md:flex h-4 w-4 rounded-full bg-accent ring-8 ring-accent/10 z-10" />
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Humanized */}
      <section className="section-y pt-0">
        <div className="container-page">
          <div className="rounded-[3rem] bg-accent p-12 lg:p-20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <Wrench className="h-64 w-64 text-white" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display text-5xl font-bold text-accent-foreground leading-tight">Experience Automotive Precision Today.</h2>
              <p className="mt-6 text-lg text-accent-foreground/80 font-medium">Don't compromise on your vehicle's integrity. Let our experts guide you to the perfect component.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/parts" className="inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-xl shadow-black/20">
                  Browse Inventory <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-3 rounded-2xl bg-white/20 backdrop-blur-md px-8 py-4 text-sm font-bold text-accent-foreground hover:bg-white/30 transition-all">
                  Contact Specialist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
