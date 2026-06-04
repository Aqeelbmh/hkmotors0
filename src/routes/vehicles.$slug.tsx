import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Truck, Car, ArrowLeft } from "lucide-react";
import { findVehicle, partsForVehicle } from "@/data/catalog";
import { PageHero } from "@/components/PageHero";
import { PartCard } from "@/components/PartCard";

export const Route = createFileRoute("/vehicles/$slug")({
  loader: ({ params }) => {
    const vehicle = findVehicle(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle, parts: partsForVehicle(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.vehicle.name} Spare Parts — H.K. Motors` },
      { name: "description", content: `Genuine and aftermarket spare parts for ${loaderData.vehicle.name}. ${loaderData.parts.length} parts available with island-wide delivery.` },
      { property: "og:title", content: `${loaderData.vehicle.name} Spare Parts — H.K. Motors` },
      { property: "og:description", content: loaderData.vehicle.tagline },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/vehicles/${loaderData.vehicle.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <div className="container-page section-y text-center">
      <h1 className="font-display text-3xl font-bold">Vehicle not found</h1>
      <Link to="/vehicles" className="mt-4 inline-block text-accent hover:underline">← Back to all vehicles</Link>
    </div>
  ),
  component: VehicleDetail,
});

function VehicleDetail() {
  const { vehicle, parts } = Route.useLoaderData();
  const Icon = vehicle.type === "Commercial" ? Truck : Car;

  return (
    <>
      <PageHero
        title={`${vehicle.name} Spare Parts`}
        subtitle={vehicle.tagline}
        crumbs={[{ label: "Home", to: "/" }, { label: "Vehicles", to: "/vehicles" }, { label: vehicle.name }]}
      >
        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 font-semibold text-accent border border-accent/30">
            <Icon className="h-3.5 w-3.5" /> {vehicle.type}
          </span>
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 font-semibold">{vehicle.brand}</span>
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 font-semibold">{parts.length} parts available</span>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <Link to="/vehicles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent">
            <ArrowLeft className="h-4 w-4" /> All vehicles
          </Link>
          <h2 className="mt-6 font-display text-2xl font-bold text-foreground">Available parts for {vehicle.name}</h2>

          {parts.length === 0 ? (
            <div className="mt-8 rounded-lg border border-dashed p-12 text-center text-muted-foreground">
              No parts listed yet. Contact us — we can source it for you.
            </div>
          ) : (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {parts.map((p: typeof parts[number]) => <PartCard key={p.id} part={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
