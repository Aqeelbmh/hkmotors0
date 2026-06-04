import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, LayoutGrid, List as ListIcon } from "lucide-react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { parts, categories, vehicles } from "@/data/catalog";
import { PartCard } from "@/components/PartCard";
import { PageHero } from "@/components/PageHero";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "All").default("All"),
  vehicle: fallback(z.string(), "All").default("All"),
  sort: fallback(z.enum(["name", "price-asc", "price-desc"]), "name").default("name"),
});

export const Route = createFileRoute("/parts/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Parts Catalogue — H.K. Motors" },
      { name: "description", content: "Browse our full catalogue of automotive spare parts. Filter by category, vehicle and brand. Engine, brakes, filters, suspension, cooling, fuel system and more." },
      { property: "og:title", content: "Parts Catalogue — H.K. Motors" },
      { property: "og:description", content: "Genuine and aftermarket automotive parts in stock." },
      { property: "og:url", content: "/parts" },
    ],
    links: [{ rel: "canonical", href: "/parts" }],
  }),
  component: PartsPage,
});

function PartsPage() {
  const initial = Route.useSearch();
  const [q, setQ] = useState(initial.q);
  const [category, setCategory] = useState(initial.category);
  const [vehicle, setVehicle] = useState(initial.vehicle);
  const [stock, setStock] = useState<string>("All");
  const [sort, setSort] = useState<"name" | "price-asc" | "price-desc">(initial.sort);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = parts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (vehicle !== "All" && !p.compatible.includes(vehicle)) return false;
      if (stock !== "All" && p.stock !== stock) return false;
      if (q) {
        const hay = `${p.name} ${p.partNumber} ${p.brand} ${p.category}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-asc") list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sort === "price-desc") list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    return list;
  }, [q, category, vehicle, stock, sort]);

  return (
    <>
      <PageHero
        title="Parts Catalogue"
        subtitle={`${parts.length}+ spare parts across all major vehicle brands. Filter, search and enquire instantly.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "Parts Catalogue" }]}
      />

      <section className="section-y">
        <div className="container-page grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="space-y-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Search</label>
              <div className="mt-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Part name or number…"
                  className="w-full rounded-md border border-border bg-card pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <SidebarFilter label="Category" value={category} options={["All", ...categories]} onChange={setCategory} />
            <SidebarFilter label="Vehicle" value={vehicle} options={["All", ...vehicles.map((v) => v.slug)]} onChange={setVehicle} renderOption={(o) => o === "All" ? "All vehicles" : vehicles.find((v) => v.slug === o)?.name ?? o} />
            <SidebarFilter label="Availability" value={stock} options={["All","In Stock","Low Stock","Pre-Order"]} onChange={setStock} />

            <button
              onClick={() => { setQ(""); setCategory("All"); setVehicle("All"); setStock("All"); }}
              className="w-full rounded-md border border-border px-3 py-2 text-xs font-semibold hover:border-accent"
            >Reset filters</button>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">{filtered.length}</strong> parts found</p>
              <div className="flex items-center gap-3">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:border-accent"
                >
                  <option value="name">Sort: Name</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <div className="flex rounded-md border border-border bg-card overflow-hidden">
                  <button aria-label="Grid view" onClick={() => setView("grid")} className={`p-2 ${view==="grid"?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground"}`}>
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button aria-label="List view" onClick={() => setView("list")} className={`p-2 ${view==="list"?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground"}`}>
                    <ListIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
                No parts match your filters. Try resetting or contact us.
              </div>
            ) : view === "grid" ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => <PartCard key={p.id} part={p} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((p) => <PartCard key={p.id} part={p} view="list" />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function SidebarFilter({ label, value, options, onChange, renderOption }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void; renderOption?: (o: string) => string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="mt-2 space-y-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`w-full text-left rounded-md px-3 py-2 text-sm transition-colors ${
              value === opt ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
            }`}
          >
            {renderOption ? renderOption(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  );
}
