import { Link } from "@tanstack/react-router";
import { Truck, Car } from "lucide-react";
import type { Vehicle } from "@/data/catalog";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const Icon = vehicle.type === "Commercial" ? Truck : Car;
  return (
    <Link
      to="/vehicles/$slug"
      params={{ slug: vehicle.slug }}
      className="group relative flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {vehicle.type}
        </span>
        <Icon className="h-7 w-7 text-muted-foreground group-hover:text-accent transition-colors" />
      </div>
      <h3 className="mt-6 font-display text-lg font-bold text-foreground">{vehicle.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{vehicle.tagline}</p>
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{vehicle.brand}</span>
        <span className="font-semibold text-accent group-hover:underline">View Parts →</span>
      </div>
    </Link>
  );
}
