import { SITE_NAME, SITE_URL } from "@/lib/config/site";
import { PLANS, SOCIAL_LINKS } from "@/lib/config/offering";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    "@id": `${SITE_URL}/#organization`,
    logo: `${SITE_URL}/images/brand/visaprepper.jpg`,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    description:
      "VisaPrepper is an independent visa interview preparation platform. It is not affiliated with the U.S. Department of State, USCIS, or any embassy or consulate.",
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "Visa Prepper",
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web, Android",
    description:
      "U.S. visa interview preparation for applicants in Pakistan, with English and Urdu interviews, document checks, and personal feedback in paid packages.",
    url: SITE_URL,
    inLanguage: ["en", "ur"],
    offers: PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.price === 0
        ? "One free document check and preparation tips. No interviews."
        : `${plan.practice} practice interviews, ${plan.realistic} realistic interviews, ${plan.checks ?? "unlimited"} document checks, and personal feedback. One-time payment.`,
      price: plan.price,
      priceCurrency: "USD",
      url: `${SITE_URL}/#pricing`,
      eligibleRegion: { "@type": "Country", name: "Pakistan" },
    })),
  };
}

export type BreadcrumbEntry = {
  name: string;
  path: string;
};

export function buildBreadcrumbJsonLd(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: `${SITE_URL}${entry.path}`,
    })),
  };
}

export type FaqEntry = {
  question: string;
  answer: string;
};

export function buildFaqJsonLd(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function buildArticleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  publishDate: string;
  updatedDate?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "en",
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate,
    dateModified: post.updatedDate ?? post.publishDate,
    author: {
      "@type": post.author === "VisaPrepper Editorial Team" ? "Organization" : "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand/visaprepper.jpg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}
