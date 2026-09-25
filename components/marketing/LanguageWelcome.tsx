import { APPLICANT_COUNTRIES } from "@/lib/config/offering";
import { LOCALES } from "@/lib/config/site";
import { NATIVE_SCRIPT_BY_LOCALE } from "@/lib/fonts";
import { LanguageChip } from "@/components/marketing/LanguageChip";

const MESSAGES: Record<string, { text: string; status: string }> = {
  en: { text: "Find your words. Feel more prepared.", status: "Available now" },
  ur: { text: "اپنے ویزا انٹرویو کی تیاری کریں، اعتماد سے جواب دیں۔", status: "اب دستیاب ہے" },
  hi: { text: "अपने वीज़ा इंटरव्यू की तैयारी करें, भरोसे से जवाब दें।", status: "अब उपलब्ध है" },
  bn: { text: "ভিসা ইন্টারভিউয়ের প্রস্তুতি নিন, আত্মবিশ্বাসের সঙ্গে উত্তর দিন।", status: "শীঘ্রই আসছে" },
};

export function LanguageWelcome() {
  return (
    <>
      <ul className="mb-8 flex flex-wrap gap-3">
        {APPLICANT_COUNTRIES.map((country) => <li key={country.name} className="rounded-full border border-border bg-surface px-4 py-2 text-sm"><span aria-hidden="true">{country.flag} </span><span className="font-semibold">{country.name}</span><span className="text-muted-foreground"> · {country.status === "live" ? "Available now" : "Coming soon"}</span></li>)}
      </ul>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LOCALES.map((locale) => {
          const script = NATIVE_SCRIPT_BY_LOCALE[locale.code];
          return <div key={locale.code} className="rounded-2xl border border-border bg-surface p-5">
            <LanguageChip locale={locale} size="sm" />
            <p lang={locale.code} dir={script?.dir} className={`mt-5 text-lg leading-loose ${script?.className ?? ""}`}>{MESSAGES[locale.code].text}</p>
            {locale.code !== "en" && <p lang={locale.code} dir={script?.dir} className={`mt-3 text-sm text-muted-foreground ${script?.className ?? ""}`}>{MESSAGES[locale.code].status}</p>}
          </div>;
        })}
      </div>
    </>
  );
}
