import { LanguageChip } from "@/components/marketing/LanguageChip";
import { LOCALES } from "@/lib/config/site";

export function LanguageAvailabilityGrid({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap justify-center gap-3">
        {LOCALES.map((locale) => (
          <li key={locale.code}>
            <LanguageChip locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}
