import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle, Phone, CheckCircle2, ArrowLeft, ShieldCheck, Truck, Headset } from "lucide-react";
import { findPart, findVehicle, parts as allParts } from "@/data/catalog";
import { whatsappLink, SITE } from "@/lib/site";
import { PartCard } from "@/components/PartCard";

export const Route = createFileRoute("/parts/$id")({
  loader: ({ params }) => {
    const part = findPart(params.id);
    if (!part) throw notFound();
    const related = allParts.filter((p) => p.id !== part.id && (p.category === part.category || p.compatible.some((c) => part.compatible.includes(c)))).slice(0, 3);
    return { part, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.part.name} — Part No. ${loaderData.part.partNumber} | H.K. Motors` },
      { name: "description", content: `${loaderData.part.name} (${loaderData.part.partNumber}) by ${loaderData.part.brand}. ${loaderData.part.description.slice(0, 140)}` },
      { property: "og:title", content: `${loaderData.part.name} — H.K. Motors` },
      { property: "og:description", content: loaderData.part.description.slice(0, 200) },
      { property: "og:type", content: "product" },
      { property: "og:image", content: loaderData.part.image },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/parts/${loaderData.part.id}` }] : [],
  }),
  notFoundComponent: () => (
    <div className="container-page section-y text-center">
      <h1 className="font-display text-3xl font-bold">Part not found</h1>
      <Link to="/parts" className="mt-4 inline-block text-accent hover:underline">← Back to catalogue</Link>
    </div>
  ),
  component: PartDetail,
});

function PartDetail() {
  const { part, related } = Route.useLoaderData();
  const enquireMsg = `Hello H.K. Motors, I would like to enquire about: ${part.name} (Part No: ${part.partNumber}). Please share availability and price.`;

  return (
    <>
      <div className="bg-surface border-b border-border">
        <div className="container-page py-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link> / <Link to="/parts" className="hover:text-accent">Parts Catalogue</Link> / <span className="text-foreground">{part.name}</span>
        </div>
      </div>

      <section className="section-y">
        <div className="container-page">
          <Link to="/parts" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to catalogue
          </Link>

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div className="aspect-square rounded-lg overflow-hidden bg-surface border border-border">
                <img src={part.image} alt={part.name} width={800} height={800} className="h-full w-full object-cover" />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="aspect-square rounded-md overflow-hidden bg-surface border border-border opacity-60">
                    <img src={part.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-muted px-2.5 py-1 font-semibold uppercase tracking-wider text-muted-foreground">{part.category}</span>
                <span className="text-muted-foreground">•</span>
                <span className="font-semibold text-foreground">{part.brand}</span>
              </div>
              <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">{part.name}</h1>
              <div className="mt-2 text-sm text-muted-foreground">Part Number: <span className="font-mono text-foreground">{part.partNumber}</span></div>

              <div className="mt-5 flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  part.stock === "In Stock" ? "bg-success/15 text-success" : part.stock === "Low Stock" ? "bg-warning/20 text-warning-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" /> {part.stock}
                </span>
                {part.price && <span className="font-display text-3xl font-bold text-foreground">LKR {part.price.toLocaleString()}</span>}
              </div>

              <p className="mt-5 text-foreground/80 leading-relaxed">{part.description}</p>

              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Compatible Vehicles</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {part.compatible.map((slug: string) => {
                    const v = findVehicle(slug);
                    if (!v) return null;
                    return (
                      <Link key={slug} to="/vehicles/$slug" params={{ slug }} className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-accent hover:text-accent">
                        {v.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <a href={whatsappLink(enquireMsg)} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
                  <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
                </a>
                <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-secondary">
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                <div className="flex flex-col items-center text-center gap-1.5 rounded-lg border border-border p-3">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Genuine</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 rounded-lg border border-border p-3">
                  <Truck className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 rounded-lg border border-border p-3">
                  <Headset className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Expert Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="mt-14 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground">Technical Specifications</h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {part.specs.map((s: { label: string; value: string }, i: number) => (
                      <tr key={s.label} className={i % 2 === 0 ? "bg-surface" : "bg-card"}>
                        <td className="px-4 py-3 font-medium text-muted-foreground w-1/3">{s.label}</td>
                        <td className="px-4 py-3 text-foreground">{s.value}</td>
                      </tr>
                    ))}
                    <tr className={part.specs.length % 2 === 0 ? "bg-surface" : "bg-card"}>
                      <td className="px-4 py-3 font-medium text-muted-foreground">Brand</td>
                      <td className="px-4 py-3 text-foreground">{part.brand}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">What's included</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {["1 × " + part.name, "Fitting hardware (where applicable)", "H.K. Motors quality assurance"].map((t) => (
                  <li key={t} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-accent shrink-0" /> {t}</li>
                ))}
              </ul>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-foreground">Related Parts</h2>
              <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p: typeof related[number]) => <PartCard key={p.id} part={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
