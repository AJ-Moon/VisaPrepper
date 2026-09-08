import { DESTINATIONS } from "@/lib/config/offering";

export function DestinationGrid() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {DESTINATIONS.map((destination) => (
        <li key={destination.name} className={`lift-card rounded-2xl border p-5 ${destination.status === "live" ? "border-primary/30 bg-sage-soft" : "border-border bg-surface"}`}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-2xl" aria-hidden="true">{destination.flag}</span>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${destination.status === "live" ? "bg-primary text-primary-foreground" : "bg-surface-muted text-muted-foreground"}`}>{destination.status === "live" ? "Available now" : "Coming soon"}</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold">{destination.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{destination.detail}</p>
        </li>
      ))}
    </ul>
  );
}
