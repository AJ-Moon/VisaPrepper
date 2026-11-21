import Link from "next/link";
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
      <div className="mb-6 rounded-2xl border border-border bg-sage-soft p-5 sm:p-6">
        <p className="text-sm font-semibold text-primary"><span aria-hidden="true">🌍 </span>U.S. visa preparation · Worldwide</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed">For supported U.S. routes, choose <strong>“Another country”</strong>, then select your actual nationality. Applicants from Bangladesh select <strong>Bangladesh</strong>; your real nationality is saved.</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">UK and European routes have country-specific eligibility.</p>
        <nav aria-label="Country preparation guides" className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="text-muted-foreground">Local guides:</span>
          {APPLICANT_COUNTRIES.filter((country) => country.name !== "Worldwide").map((country) => <Link key={country.name} href={country.href} className="font-medium text-primary underline underline-offset-4">{country.name}</Link>)}
        </nav>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LOCALES.map((locale) => {
          const script = NATIVE_SCRIPT_BY_LOCALE[locale.code];
          return <div key={locale.code} className="rounded-2xl border border-border bg-surface p-5">
            <LanguageChip locale={locale} size="sm" />
            {locale.status === "live" && <p className="mt-3 text-sm font-semibold text-primary">{locale.code === "en" ? "U.S. and international interviews" : "U.S. interviews"}</p>}
            <p lang={locale.code} dir={script?.dir} className={`mt-5 text-lg leading-loose ${script?.className ?? ""}`}>{MESSAGES[locale.code].text}</p>
            {locale.code !== "en" && <p lang={locale.code} dir={script?.dir} className={`mt-3 text-sm text-muted-foreground ${script?.className ?? ""}`}>{MESSAGES[locale.code].status}</p>}
          </div>;
        })}
      </div>
    </>
  );
}
