import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, MessageCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact H.K. Motors — Sri Lanka Spare Parts Supplier" },
      { name: "description", content: "Get in touch with H.K. Motors for spare parts enquiries. WhatsApp, phone or visit our Colombo branch. We respond within hours." },
      { property: "og:title", content: "Contact H.K. Motors" },
      { property: "og:description", content: "Phone, WhatsApp, email and location for H.K. Motors Sri Lanka." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
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
    // Compose WhatsApp message
    const msg = `Hello H.K. Motors,\n\nName: ${form.name}\nPhone: ${form.phone}\nVehicle: ${form.vehicle}${form.partName ? `\nPart: ${form.partName}` : ""}${form.partNumber ? `\nPart No: ${form.partNumber}` : ""}\n\n${form.message}`;
    window.open(whatsappLink(msg), "_blank", "noopener");
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title="Get in touch"
        subtitle="Have a question or need a part sourced? Send us a message — we typically respond within a few hours during business hours."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="section-y">
        <div className="container-page grid lg:grid-cols-[1.2fr_1fr] gap-10">
          {/* Form */}
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Send an enquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fill in your details and we'll get back to you with availability and pricing.</p>

            {submitted ? (
              <div className="mt-6 rounded-md border border-success/40 bg-success/10 p-5 text-sm">
                <div className="flex items-center gap-2 text-success font-semibold"><CheckCircle2 className="h-5 w-5" /> Enquiry ready to send</div>
                <p className="mt-2 text-foreground/80">Your WhatsApp should have opened with your enquiry pre-filled. Press send to message us.</p>
                <button onClick={() => setSubmitted(false)} className="mt-3 text-accent font-semibold hover:underline text-sm">Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field label="Your Name *" error={errors.name}>
                  <input value={form.name} onChange={update("name")} className={inputCls(errors.name)} placeholder="Saman Perera" />
                </Field>
                <Field label="Phone Number *" error={errors.phone}>
                  <input value={form.phone} onChange={update("phone")} className={inputCls(errors.phone)} placeholder="+94 77 123 4567" />
                </Field>
                <Field label="Vehicle Model *" error={errors.vehicle}>
                  <input value={form.vehicle} onChange={update("vehicle")} className={inputCls(errors.vehicle)} placeholder="e.g. Tata Ace 2018" />
                </Field>
                <Field label="Part Name" error={errors.partName}>
                  <input value={form.partName} onChange={update("partName")} className={inputCls(errors.partName)} placeholder="e.g. Clutch Plate" />
                </Field>
                <Field label="Part Number" error={errors.partNumber} className="sm:col-span-2">
                  <input value={form.partNumber} onChange={update("partNumber")} className={inputCls(errors.partNumber)} placeholder="If known — e.g. HK-CL-2410" />
                </Field>
                <Field label="Message *" error={errors.message} className="sm:col-span-2">
                  <textarea value={form.message} onChange={update("message")} rows={4} className={inputCls(errors.message)} placeholder="Tell us what you're looking for…" />
                </Field>
                <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
                    <MessageCircle className="h-4 w-4" /> Send via WhatsApp
                  </button>
                  <span className="text-xs text-muted-foreground">By submitting you agree to be contacted regarding your enquiry.</span>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            <InfoCard icon={MapPin} title="Visit Our Branch">
              {SITE.address}<br /><span className="text-muted-foreground">Free parking available</span>
            </InfoCard>
            <InfoCard icon={Phone} title="Call Us">
              <a href={SITE.phoneHref} className="hover:text-accent">{SITE.phone}</a><br />
              <span className="text-muted-foreground">Mon–Sat, business hours</span>
            </InfoCard>
            <InfoCard icon={MessageCircle} title="WhatsApp">
              <a href={whatsappLink()} target="_blank" rel="noopener" className="hover:text-accent">Chat with our parts team</a><br />
              <span className="text-muted-foreground">Fastest way to reach us</span>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a>
            </InfoCard>
            <InfoCard icon={Clock} title="Business Hours">
              {SITE.hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <span>{h.day}</span>
                  <span className="text-muted-foreground">{h.time}</span>
                </div>
              ))}
            </InfoCard>

            <div className="rounded-lg border border-accent/30 bg-accent/5 p-5">
              <div className="flex items-center gap-2 text-accent font-display font-bold">
                <AlertTriangle className="h-5 w-5" /> Emergency / After-Hours
              </div>
              <p className="mt-2 text-sm text-foreground/80">
                For urgent breakdowns or commercial fleet emergencies outside business hours, call our after-hours line.
              </p>
              <a href={SITE.phoneHref} className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-secondary">
                <Phone className="h-4 w-4" /> Call Emergency Line
              </a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="container-page mt-12">
          <div className="rounded-lg overflow-hidden border border-border bg-surface aspect-[16/6] relative">
            <iframe
              title="H.K. Motors Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=79.84%2C6.87%2C79.88%2C6.91&layer=mapnik&marker=6.89%2C79.86"
              className="h-full w-full"
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
  `w-full rounded-md border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent ${err ? "border-destructive" : "border-border"}`;

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
      </div>
      <div className="mt-3 text-sm text-foreground/85">{children}</div>
    </div>
  );
}
