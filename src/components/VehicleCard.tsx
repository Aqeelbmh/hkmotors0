import { Link } from "@tanstack/react-router";
import { Truck, Car, ArrowUpRight, Pin } from "lucide-react";
import type { Vehicle } from "@/data/catalog";
import { motion } from "framer-motion";
import { useGarage } from "@/lib/garage";
import { cn } from "@/lib/utils";

import { useI18n } from "@/lib/i18n";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const Icon = vehicle.type === "Commercial" ? Truck : Car;
  const { myVehicle, setVehicle } = useGarage();
  const { t } = useI18n();
  const isMine = myVehicle?.slug === vehicle.slug;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group"
    >
      <Link
        to="/parts"
        search={{ vehicle: vehicle.slug } as any}
        className={cn(
          "relative flex flex-col h-full rounded-2xl border transition-all overflow-hidden p-6",
          isMine ? "border-accent bg-accent/5 ring-1 ring-accent" : "border-border bg-card hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5"
        )}
      >
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="h-5 w-5 text-accent" />
        </div>

        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground border border-border">
            {vehicle.type}
          </span>
          <Icon className="h-8 w-8 text-muted-foreground/40 group-hover:text-accent transition-colors duration-500" />
        </div>

        <div className="mt-8">
          <h3 className="font-display text-xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors">{vehicle.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{vehicle.tagline}</p>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-primary/60">{vehicle.brand}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setVehicle(isMine ? null : vehicle.slug);
            }}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all",
              isMine ? "bg-accent text-white" : "bg-surface text-muted-foreground hover:bg-accent hover:text-white"
            )}
          >
            <Pin className="h-3 w-3" />
            {isMine ? t("garage_title") : t("garage_empty")}
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
