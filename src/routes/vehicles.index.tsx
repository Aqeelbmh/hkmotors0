import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { SITE } from "@/lib/site";
import { vehicles } from "@/data/catalog";
import { VehicleCard } from "@/components/VehicleCard";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/vehicles/")({
  head: () => ({
    meta: [
      { title: `Shop by Vehicle — ${SITE.name} Spare Parts` },
      { name: "description", content: `Browse spare parts by vehicle model. We stock genuine components for Tata Ace, Mahindra Bolero, Maruti Alto, and major commercial fleets.` },
      { property: "og:title", content: `Shop by Vehicle — ${SITE.name} Curated Portfolio` },
      { property: "og:description", content: "Select your vehicle to see compatible original and aftermarket parts in stock." },
    ],
    links: [{ rel: "canonical", href: "/vehicles" }],
  }),
  component: VehiclesPage,
});

function VehiclesPage() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [type, setType] = useState<"All" | "Commercial" | "Passenger">("All");
  const [brand, setBrand] = useState<string>("All");

  const brands = ["All", ...Array.from(new Set(vehicles.map((v) => v.brand)))];

  const filtered = vehicles.filter((v) => {
    if (type !== "All" && v.type !== type) return false;
    if (brand !== "All" && v.brand !== brand) return false;
    if (q) {
      const hays = `${v.name} ${v.brand} ${v.type}`.toLowerCase();
      const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
      return tokens.every(token => hays.includes(token));
    }
    return true;
  });

  return (
    <>
      <PageHero
        title={t("nav_vehicles")}
        subtitle="Choose your vehicle to see the spare parts we stock for it. Genuine and aftermarket options available."
        crumbs={[{ label: t("nav_home"), to: "/" }, { label: t("nav_vehicles") }]}
      />

      <section className="section-y">
        <div className="container-page grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Search</label>
              <div className="mt-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Vehicle name…"
                  className="w-full rounded-md border border-border bg-card pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            <FilterGroup label="Vehicle Type" value={type} options={["All", "Commercial", "Passenger"]} onChange={(v) => setType(v as typeof type)} />
            <FilterGroup label="Brand" value={brand} options={brands} onChange={setBrand} />

            <div className="rounded-lg border border-border bg-surface p-4">
              <h4 className="font-display font-bold text-foreground text-sm">Need help finding parts?</h4>
              <p className="mt-1.5 text-xs text-muted-foreground">{t("contact_subtitle")}</p>
              <Link to="/contact" className="mt-3 inline-flex w-full justify-center rounded-md bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent/90">{t("nav_support")}</Link>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
              <span><strong className="text-foreground">{filtered.length}</strong> vehicles</span>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
                No vehicles match your filters.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((v) => <VehicleCard key={v.slug} vehicle={v} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${value === opt ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card text-foreground hover:border-accent"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
