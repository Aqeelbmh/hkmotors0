import { useMemo, useState, useEffect } from "react";
import { useNavigate, createFileRoute } from "@tanstack/react-router";
import { Search, LayoutGrid, List as ListIcon, SlidersHorizontal, ArrowLeftCircle, MessageCircle } from "lucide-react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SITE, whatsappLink } from "@/lib/site";
import { parts, categories, vehicles } from "@/data/catalog";
import { PartCard } from "@/components/PartCard";
import { PageHero } from "@/components/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGarage } from "@/lib/garage";
import { useI18n } from "@/lib/i18n";

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
      { title: `Inventory — ${SITE.name} Automotive Spare Parts` },
      { name: "description", content: `Explore our curated inventory of high-performance automotive components. Genuine Tata, Mahindra, Maruti, and Nissan parts optimized for professional fleets.` },
      { property: "og:title", content: `Full Catalogue — ${SITE.name} Genuine Inventory` },
      { property: "og:description", content: `Over 1000+ spare parts indexed. Search by part number, name, or vehicle compatibility.` },
    ],
  }),
  component: PartsPage,
});

function PartsPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { t } = useI18n();

  const [q, setQ] = useState(search.q);
  const [category, setCategory] = useState(search.category);
  const [vehicle, setVehicle] = useState(search.vehicle);
  const [stock, setStock] = useState<string>("All");
  const [sort, setSort] = useState<"name" | "price-asc" | "price-desc">(search.sort);
  const [view, setView] = useState<"grid" | "list">("grid");

  const { myVehicle, setVehicle: setGarageVehicle } = useGarage();

  // If garage exists and no manual vehicle filter is selected, default to garage
  useEffect(() => {
    if (myVehicle && vehicle === "All" && !search.vehicle) {
      setVehicle(myVehicle.slug);
    }
  }, [myVehicle]);

  // Sync state to URL search params
  useEffect(() => {
    navigate({
      search: (old: any) => ({
        ...old,
        q: q || undefined,
        category: category !== "All" ? category : undefined,
        vehicle: vehicle !== "All" ? vehicle : undefined,
        sort: sort !== "name" ? sort : undefined,
      }),
      replace: true,
    } as any);
  }, [q, category, vehicle, sort, navigate]);

  const filtered = useMemo(() => {
    let list = parts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (vehicle !== "All" && !p.compatible.includes(vehicle)) return false;
      if (stock !== "All" && p.stock !== stock) return false;

      if (q) {
        const hays = `${p.name} ${p.partNumber} ${p.brand} ${p.category}`.toLowerCase();
        const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
        // All tokens must match something in the searchable string
        return tokens.every((token: string) => hays.includes(token));
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
        title={t("nav_inventory")}
        subtitle={`Precision-curated access to ${parts.length}+ premium components. Optimized for professional fleets and workshops.`}
        crumbs={[{ label: t("nav_home"), to: "/" }, { label: t("nav_inventory") }]}
      />

      <section className="section-y bg-surface/30">
        <div className="container-page grid lg:grid-cols-[320px_1fr] gap-12">
          {/* Filters Sidebar */}
          <aside className="space-y-10">
            <div className="bg-card p-8 rounded-[2rem] border border-border sticky top-28 shadow-xl shadow-primary/5">
              <div className="flex items-center gap-3 mb-8">
                <SlidersHorizontal className="h-5 w-5 text-accent" />
                <h2 className="font-display text-xl font-bold uppercase tracking-widest">Filter Portfolio</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-3 block">Search Index</label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Part # or Model…"
                      className="w-full rounded-xl border border-border bg-surface pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all"
                    />
                  </div>
                </div>

                <SidebarFilter label="Component Category" value={category} options={["All", ...categories]} onChange={setCategory} />
                <SidebarFilter label="Vehicle Architecture" value={vehicle} options={["All", ...vehicles.map((v) => v.slug)]} onChange={setVehicle} renderOption={(o) => o === "All" ? "All Platforms" : vehicles.find((v) => v.slug === o)?.name ?? o} />
                <SidebarFilter label="Inventory Status" value={stock} options={["All", "In Stock", "Low Stock", "Pre-Order"]} onChange={setStock} />

                <button
                  onClick={() => { setQ(""); setCategory("All"); setVehicle("All"); setStock("All"); }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all group"
                >
                  <ArrowLeftCircle className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Reset Filters
                </button>

                {myVehicle && (
                  <div className="rounded-2xl bg-accent p-6 text-white shadow-xl shadow-accent/20 border-l-4 border-white/20">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">{t("garage_title")}</div>
                    <div className="font-display font-bold text-lg mb-4">{myVehicle.name}</div>
                    <button
                      onClick={() => { setGarageVehicle(null); setVehicle("All"); }}
                      className="text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                    >
                      Remove Vehicle
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main List */}
          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-accent rounded-full" />
                <p className="text-sm font-medium text-muted-foreground">Identifying <strong className="text-foreground">{filtered.length}</strong> compatible components</p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="rounded-xl border border-border bg-card px-6 py-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all cursor-pointer"
                >
                  <option value="name">Sort: A-Z</option>
                  <option value="price-asc">Price: Ascending</option>
                  <option value="price-desc">Price: Descending</option>
                </select>

                <div className="flex bg-card p-1 rounded-xl border border-border shadow-sm">
                  {[
                    { id: "grid", icon: LayoutGrid },
                    { id: "list", icon: ListIcon }
                  ].map((v) => (
                    <button
                      key={v.id}
                      aria-label={`${v.id} view`}
                      onClick={() => setView(v.id as "grid" | "list")}
                      className={cn(
                        "p-2.5 rounded-lg transition-all",
                        view === v.id ? "bg-primary text-white shadow-lg shadow-black/10" : "text-muted-foreground hover:text-foreground hover:bg-surface"
                      )}
                    >
                      <v.icon className="h-4.5 w-4.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="rounded-[3rem] border-2 border-dashed border-border p-24 text-center bg-card"
                >
                  <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-foreground">No Direct Matches Found</h3>
                  <p className="mt-2 text-muted-foreground max-w-sm mx-auto font-light leading-relaxed mb-8">Try adjusting your filters or contact our technical support for manual sourcing.</p>

                  <div className="inline-flex flex-col items-center p-6 rounded-2xl bg-surface border border-border">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Don't have a part number?</p>
                    <a
                      href={whatsappLink("Hello HK Motors, I can't find my part. Here is a photo of what I need.")}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:bg-[#1ebe5b] transition-all"
                    >
                      <MessageCircle className="h-5 w-5" /> Send a Photo via WhatsApp
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "grid gap-8",
                    view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                  )}
                >
                  {filtered.map((p) => (
                    <motion.div layout key={p.id}>
                      <PartCard part={p} view={view} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-3 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "text-left rounded-xl px-4 py-2.5 text-xs font-bold transition-all border",
              value === opt
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "text-foreground bg-surface border-border hover:border-accent/40"
            )}
          >
            {renderOption ? renderOption(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  );
}
