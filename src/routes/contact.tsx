import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, MessageCircle, AlertTriangle, CheckCircle2, UserCheck, ShieldCheck, Headphones } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Connect with Specialists — ${SITE.name} Technical Support` },
      { name: "description", content: `Get expert automotive advice and rapid component sourcing from the ${SITE.name} specialist team. Direct support for Tata, Mahindra, and Maruti parts.` },
      { property: "og:title", content: `Contact ${SITE.name} — Expert Automotive Support` },
      { property: "og:description", content: `Our technical specialists are standing by to ensure you find the exact component for your vehicle. Reach out via WhatsApp or phone.` },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  vehicle: z.string().trim().min(1, "Vehicle model is required").max(80),
  partName: z.string().trim().max(120).optional().or(z.literal("")),
  partNumber: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Please add a short message").max(800),
});
type FormState = z.infer<typeof schema>;

function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = useState<FormState>({ name: "", phone: "", vehicle: "", partName: "", partNumber: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const e: Partial<Record<keyof FormState, string>> = {};
      result.error.issues.forEach((i) => { e[i.path[0] as keyof FormState] = i.message; });
      setErrors(e);
      return;
    }
    setErrors({});
    const msg = `Hello HK Motors Specialist,\n\nName: ${form.name}\nPhone: ${form.phone}\nVehicle: ${form.vehicle}${form.partName ? `\nPart: ${form.partName}` : ""}${form.partNumber ? `\nPart No: ${form.partNumber}` : ""}\n\n${form.message}`;
    window.open(whatsappLink(msg), "_blank", "noopener");
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title={t("contact_title")}
        subtitle={t("contact_subtitle")}
        crumbs={[{ label: t("nav_home"), to: "/" }, { label: t("nav_support") }]}
      />

      <section className="section-y">
        <div className="container-page grid lg:grid-cols-[1.3fr_1fr] gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-border bg-card p-8 lg:p-12 shadow-2xl shadow-primary/5"
          >
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-4">Direct Enquiry</span>
              <h2 className="font-display text-3xl font-bold text-foreground">{t("contact_title")}</h2>
              <p className="mt-4 text-muted-foreground font-light leading-relaxed">{t("contact_subtitle")}</p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center"
              >
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground">Enquiry Transmitted</h3>
                <p className="mt-2 text-muted-foreground">Your request is being processed. Our WhatsApp specialist has been notified.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 font-bold text-accent hover:underline uppercase tracking-widest text-xs">Send another request</button>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-12 grid sm:grid-cols-2 gap-8">
                <Field label="Your Name" error={errors.name}>
                  <input value={form.name} onChange={update("name")} className={inputCls(errors.name)} placeholder="Full Name" />
                </Field>
                <Field label="Direct Line" error={errors.phone}>
                  <input value={form.phone} onChange={update("phone")} className={inputCls(errors.phone)} placeholder="+94 XX XXX XXXX" />
                </Field>
                <Field label="Vehicle Model & Year" error={errors.vehicle}>
                  <input value={form.vehicle} onChange={update("vehicle")} className={inputCls(errors.vehicle)} placeholder="e.g. Tata Ace (2021)" />
                </Field>
                <Field label="Required Component" error={errors.partName}>
                  <input value={form.partName} onChange={update("partName")} className={inputCls(errors.partName)} placeholder="e.g. Turbocharger Unit" />
                </Field>
                <Field label="Part Serial Number (Optional)" error={errors.partNumber} className="sm:col-span-2">
                  <input value={form.partNumber} onChange={update("partNumber")} className={inputCls(errors.partNumber)} placeholder="Enter OEM number if available" />
                </Field>
                <Field label="Detailed Requirements" error={errors.message} className="sm:col-span-2">
                  <textarea value={form.message} onChange={update("message")} rows={4} className={inputCls(errors.message)} placeholder="Specific details regarding symptoms or requirements…" />
                </Field>
                <div className="sm:col-span-2 pt-4">
                  <button type="submit" className="w-full flex items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-5 text-sm font-bold uppercase tracking-widest text-white hover:bg-black transition-all shadow-xl shadow-black/10">
                    <MessageCircle className="h-5 w-5" /> Secure Secure via WhatsApp
                  </button>
                  <p className="mt-4 text-[10px] text-center uppercase tracking-widest font-bold text-muted-foreground/50">Confidentiality Assured • Rapid Response Guaranteed</p>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info & Humanization */}
          <div className="space-y-8">
            <div className="grid gap-6">
              <InfoCard icon={Headphones} title="Expert Consultation">
                <p className="leading-relaxed">Speak directly with our senior parts analysts. We offer technical guidance, not just sales.</p>
                <div className="mt-4 flex flex-col gap-2">
                  {SITE.phoneNumbers.map((num) => (
                    <a key={num} href={`tel:${num.replace(/\s+/g, "")}`} className="flex items-center gap-2 font-black text-primary hover:text-accent transition-colors">
                      <Phone className="h-3 w-3" /> {num}
                    </a>
                  ))}
                </div>
              </InfoCard>

              <InfoCard icon={MapPin} title="The Hub">
                <p className="leading-relaxed">{SITE.address}</p>
                <span className="mt-2 block text-[11px] font-bold uppercase tracking-wider text-accent italic">Logistics Center & Showroom</span>
              </InfoCard>

              <InfoCard icon={ShieldCheck} title="Service Integrity">
                <div className="space-y-4">
                  {SITE.hours.map((h) => (
                    <div key={h.day} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-muted-foreground">{h.day}</span>
                      <span className="text-foreground font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </InfoCard>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl bg-accent p-8 text-white shadow-2xl shadow-accent/20 border-l-8 border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6" />
                <h3 className="font-display text-xl font-bold uppercase tracking-widest">Fleet Emergency?</h3>
              </div>
              <p className="text-sm font-medium opacity-90 leading-relaxed">
                Logistics downtime is costly. For critical fleet failures outside standard hours, our priority response line is open.
              </p>
              <a href={SITE.phoneHref} className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 text-xs font-black text-accent uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Critical Support Call
              </a>
            </motion.div>

            <div className="p-8 rounded-3xl border border-border bg-surface text-center">
              <UserCheck className="h-10 w-10 text-primary/40 mx-auto mb-4" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Certified Parts Specialist</p>
              <p className="mt-2 text-sm font-medium italic">"We don't just sell parts; we restore confidence in your vehicle's capability."</p>
            </div>
          </div>
        </div>

        {/* Map Modernized */}
        <div className="container-page mt-24">
          <div className="group relative rounded-[3rem] overflow-hidden border border-border bg-surface aspect-[16/6] shadow-2xl">
            <div className="absolute inset-0 bg-primary/5 group-hover:opacity-0 transition-opacity z-10 pointer-events-none" />
            <iframe
              title="HK Motors Gunnepana HQ"
              src={`https://maps.google.com/maps?q=${encodeURIComponent("41/2 Yakgahapitiya - Amunugama Road, Gunnepana 20270")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="h-full w-full grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000 border-none"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

const inputCls = (err?: string) =>
  cn(
    "w-full rounded-2xl border bg-background px-5 py-4 text-sm transition-all focus:outline-none focus:ring-4 placeholder:text-muted-foreground/50",
    err ? "border-destructive focus:ring-destructive/10" : "border-border focus:border-accent focus:ring-accent/10"
  );

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 px-1">{label}</span>
      {children}
      {error && <span className="text-[10px] font-bold text-destructive px-1">{error}</span>}
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 group hover:border-accent/30 transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground group-hover:bg-accent transition-colors duration-500">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="text-sm font-light text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}
