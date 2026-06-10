import { Link } from "@tanstack/react-router";
import { MessageCircle, ShoppingBag } from "lucide-react";
import type { Part } from "@/data/catalog";
import { findVehicle } from "@/data/catalog";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const stockStyles: Record<Part["stock"], string> = {
  "In Stock": "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  "Low Stock": "bg-amber-500/10 text-amber-600 border-amber-200",
  "Pre-Order": "bg-slate-500/10 text-slate-600 border-slate-200",
};

export function PartCard({ part, view = "grid" }: { part: Part; view?: "grid" | "list" }) {
  const compatNames = part.compatible.map((s) => findVehicle(s)?.name).filter(Boolean).join(", ");
  const enquireMsg = `Hello H.K. Motors, I would like to enquire about: ${part.name} (Part No: ${part.partNumber}).`;

  if (view === "list") {
    return (
      <div className="flex gap-6 rounded-2xl border border-border bg-card p-5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
        <Link to="/parts/$id" params={{ id: part.id }} className="shrink-0 relative overflow-hidden rounded-xl bg-surface group">
          <img src={part.image} alt={part.name} loading="lazy" width={160} height={160} className="h-32 w-32 object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-accent mb-1">{part.brand}</div>
              <Link to="/parts/$id" params={{ id: part.id }} className="text-lg font-bold text-foreground hover:text-accent transition-colors block leading-tight">{part.name}</Link>
            </div>
            <span className={cn("shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border", stockStyles[part.stock])}>{part.stock}</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-3">
            <span>Part: <span className="font-mono font-bold text-foreground/80">{part.partNumber}</span></span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{part.category}</span>
          </div>
          <div className="mt-auto pt-4 flex items-center justify-between">
            {part.price ? (
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Price</span>
                <span className="font-display font-bold text-xl text-foreground">LKR {part.price.toLocaleString()}</span>
              </div>
            ) : (
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic">Price on request</span>
            )}
            <div className="flex gap-2">
              <a href={whatsappLink(enquireMsg)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl bg-surface border border-border px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-all">
                <MessageCircle className="h-4 w-4 text-emerald-500" /> Enquire
              </a>
              <Link to="/parts/$id" params={{ id: part.id }} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:bg-accent transition-all shadow-lg shadow-black/10">
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5"
    >
      <Link to="/parts/$id" params={{ id: part.id }} className="relative block aspect-square overflow-hidden bg-surface">
        <img src={part.image} alt={part.name} loading="lazy" width={400} height={400} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className={cn("absolute top-4 left-4 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] backdrop-blur-md border", stockStyles[part.stock])}>
          {part.stock}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">{part.brand}</div>
        <Link to="/parts/$id" params={{ id: part.id }} className="font-bold text-foreground hover:text-accent transition-colors line-clamp-2 min-h-[2.8rem] leading-tight text-lg">
          {part.name}
        </Link>
        <div className="mt-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-surface px-2.5 py-1.5 rounded-lg border border-border w-fit">
            <span className="font-bold">SN:</span>
            <span className="font-mono text-foreground/80">{part.partNumber}</span>
          </div>
          <div className="text-xs text-muted-foreground line-clamp-1 italic px-0.5">Fits: {compatNames}</div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <div className="flex flex-col">
            {part.price ? (
              <>
                <span className="text-[9px] uppercase font-bold text-muted-foreground mb-0.5">List Price</span>
                <span className="font-display font-bold text-xl text-foreground">LKR {part.price.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">POA</span>
            )}
          </div>
          <a href={whatsappLink(enquireMsg)} target="_blank" rel="noopener" className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground hover:bg-accent transition-all duration-300 shadow-lg shadow-black/10 group/btn">
            <MessageCircle className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
