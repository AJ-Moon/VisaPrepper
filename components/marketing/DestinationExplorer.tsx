import { ArrowRight, ChevronRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { EXTERNAL_APP_URL, VISA_TYPES } from "@/lib/config/site";

// France, Italy and Germany each have these six routes in the application catalog.
const europeanCategories = [
  "Student", "Skilled / employed work", "Family reunion",
  "Tourism", "Business visit", "Visit family or friends",
];

const destinations = [
  {
    id: "us",
    name: "United States",
    flag: "🇺🇸",
    headline: "Tell a clear story about your U.S. plans.",
    description: "Work through questions about why you’re going, how you’ll fund your plans and how your answers fit the details in your application.",
    categories: VISA_TYPES.map(({ code, shortLabel }) =>
      code === "Family / Immigrant" ? shortLabel : `${code} · ${shortLabel}`),
    href: "/visa-types",
    action: "Explore U.S. visa types",
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    headline: "Explain what takes you to the UK.",
    description: "Practice describing your course, job, visit or family plans. Prepare to explain how you’ll pay for your stay and what your supporting documents show.",
    categories: ["Student", "Standard Visitor", "Skilled Worker", "Family reunion"],
    href: EXTERNAL_APP_URL,
    action: "Explore UK routes in the app",
  },
  {
    id: "fr",
    name: "France",
    flag: "🇫🇷",
    headline: "Make your plans for France concrete.",
    description: "Prepare to talk through your itinerary and accommodation for a short stay, or connect your study, work or family plans to the details in your application.",
    categories: europeanCategories,
    href: EXTERNAL_APP_URL,
    action: "Explore France routes in the app",
  },
  {
    id: "it",
    name: "Italy",
    flag: "🇮🇹",
    headline: "Put the details of your Italy plans together.",
    description: "Explain why you chose your course or what brings you to Italy. Practice connecting dates, where you’ll stay and how you’ll cover costs to your application.",
    categories: europeanCategories,
    href: EXTERNAL_APP_URL,
    action: "Explore Italy routes in the app",
  },
  {
    id: "de",
    name: "Germany",
    flag: "🇩🇪",
    headline: "Be ready to explain your next step in Germany.",
    description: "Connect your academic or work background to your plans in Germany, or prepare a clear explanation of your visit, family arrangements and funding.",
    categories: europeanCategories,
    href: EXTERNAL_APP_URL,
    action: "Explore Germany routes in the app",
  },
] as const;

export function DestinationExplorer() {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">Choose a destination</legend>
      <div className="grid min-w-0 gap-2 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-x-5 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
        {destinations.map((destination, index) => {
          const selectorId = `destination-select-${destination.id}`;
          const panelId = `destination-panel-${destination.id}`;
          const titleId = `destination-title-${destination.id}`;

          return (
            <div key={destination.id} className="contents">
              <input
                className="peer sr-only"
                type="radio"
                name="homepage-destination"
                id={selectorId}
                defaultChecked={index === 0}
                aria-controls={panelId}
              />
              <label
                htmlFor={selectorId}
                className="destination-choice flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border bg-surface/60 px-3 py-2 text-sm font-semibold transition-colors hover:bg-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal md:col-start-1 md:px-4"
              >
                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface text-lg">{destination.flag}</span>
                <span className="flex-1">{destination.name}</span>
                <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-primary/70" />
              </label>
              <section
                id={panelId}
                aria-labelledby={titleId}
                className="home-forest destination-panel relative row-start-6 mt-2 hidden min-w-0 flex-col items-start overflow-hidden rounded-[1.5rem] border border-primary p-5 text-primary-foreground shadow-lg shadow-primary/15 peer-checked:flex sm:p-8 md:col-start-2 md:row-span-5 md:row-start-1 md:mt-0 lg:p-10"
              >
                <span aria-hidden="true" className="pointer-events-none absolute -end-36 -top-36 size-64 rounded-full border opacity-25 shadow-[0_0_0_2rem_color-mix(in_srgb,var(--vp-sage-soft)_12%,transparent)] sm:-end-24 sm:-top-32 sm:size-80" />
                <div className="relative flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-sage-soft">
                  <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl border border-sage-soft/25 bg-sage-soft/10 text-xl">{destination.flag}</span>
                  {destination.name}
                </div>
                <h3 id={titleId} className="relative mt-4 max-w-[22ch] font-display text-3xl leading-tight font-semibold sm:text-4xl">{destination.headline}</h3>
                <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-sage-soft sm:text-base">{destination.description}</p>
                <div className="relative mt-5 w-full border-t border-sage-soft/20 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sage-soft">Supported visa categories</p>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {destination.categories.map(category => (
                      <li key={category} className="rounded-full border border-sage-soft/25 bg-sage-soft/10 px-3 py-1.5 text-xs leading-snug font-medium sm:text-sm">{category}</li>
                    ))}
                  </ul>
                </div>
                <LinkButton href={destination.href} className="relative mt-6 max-w-full bg-primary-foreground text-primary hover:bg-white focus-visible:outline-white">
                  {destination.action}
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                </LinkButton>
              </section>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
