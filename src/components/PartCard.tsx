import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import type { Part } from "@/data/catalog";
import { findVehicle } from "@/data/catalog";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const stockStyles: Record<Part["stock"], string> = {
  "In Stock": "bg-success/10 text-success",
  "Low Stock": "bg-warning/15 text-warning-foreground",
  "Pre-Order": "bg-muted text-muted-foreground",
};

export function PartCard({ part, view = "grid" }: { part: Part; view?: "grid" | "list" }) {
  const compatNames = part.compatible.map((s) => findVehicle(s)?.name).filter(Boolean).join(", ");
  const enquireMsg = `Hello H.K. Motors, I would like to enquire about: ${part.name} (Part No: ${part.partNumber}).`;

  if (view === "list") {
    return (
      <div className="flex gap-4 rounded-lg border border-border bg-card p-4 hover:border-accent transition-colors">
        <Link to="/parts/$id" params={{ id: part.id }} className="shrink-0">
          <img src={part.image} alt={part.name} loading="lazy" width={120} height={120} className="h-28 w-28 rounded-md object-cover bg-muted" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link to="/parts/$id" params={{ id: part.id }} className="font-semibold text-foreground hover:text-accent line-clamp-1">{part.name}</Link>
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase", stockStyles[part.stock])}>{part.stock}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Part No: <span className="font-mono text-foreground/80">{part.partNumber}</span> • {part.category} • {part.brand}</div>
          <div className="mt-1.5 text-xs text-muted-foreground line-clamp-1">Fits: {compatNames}</div>
          <div className="mt-3 flex items-center justify-between">
            {part.price ? <span className="font-display font-bold text-lg text-foreground">LKR {part.price.toLocaleString()}</span> : <span className="text-xs text-muted-foreground">Price on request</span>}
            <a href={whatsappLink(enquireMsg)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="h-3.5 w-3.5" /> Enquire
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-accent hover:shadow-lg">
      <Link to="/parts/$id" params={{ id: part.id }} className="relative block aspect-square overflow-hidden bg-muted">
        <img src={part.image} alt={part.name} loading="lazy" width={400} height={400} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={cn("absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider", stockStyles[part.stock])}>{part.stock}</span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{part.category} • {part.brand}</div>
        <Link to="/parts/$id" params={{ id: part.id }} className="mt-1 font-semibold text-foreground hover:text-accent line-clamp-2 min-h-[3rem]">{part.name}</Link>
        <div className="mt-2 text-xs text-muted-foreground">Part No: <span className="font-mono text-foreground/80">{part.partNumber}</span></div>
        <div className="mt-1 text-xs text-muted-foreground line-clamp-1">Fits: {compatNames}</div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          {part.price ? <span className="font-display font-bold text-foreground">LKR {part.price.toLocaleString()}</span> : <span className="text-xs text-muted-foreground">Price on request</span>}
          <a href={whatsappLink(enquireMsg)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-accent">
            <MessageCircle className="h-3.5 w-3.5" /> Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
