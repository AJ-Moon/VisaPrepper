import type { PublicPlan } from "@/lib/config/live-offering";
import { CONTACT_EMAIL, SITE_ALTERNATE_NAMES, SITE_NAME, SITE_URL } from "@/lib/config/site";
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
    alternateName: SITE_ALTERNATE_NAMES,
    url: SITE_URL,
    "@id": `${SITE_URL}/#organization`,
    logo: `${SITE_URL}/images/brand/visaprepper.jpg`,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    email: CONTACT_EMAIL,
    description:
      "VisaPrepper offers AI video visa interview practice, document checks and personalised feedback for applicants in India and Pakistan. Available in English, Urdu and Hindi. An independent preparation service.",
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    url: `${SITE_URL}/`,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function buildSoftwareApplicationJsonLd(plans:PublicPlan[] = [...PLANS]) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description:
      "Complete AI video visa interview practice for U.S., UK, France, Italy, Germany and Schengen applicants, with document checks, personalised tips, answer feedback and confidence scores.",
    url: SITE_URL,
    inLanguage: ["en", "ur", "hi"],
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.price === 0
        ? "One free document check and preparation tips. No interviews."
        : `${plan.interviews} complete AI video interviews, ${plan.checks} document verification checks, personalised practice tips, and results after each interview. 90 days from purchase. One-time payment.`,
      price: plan.price,
      priceCurrency: "USD",
      url: `${SITE_URL}/#pricing`,
      eligibleRegion: [
        { "@type": "Country", name: "Pakistan" },
        { "@type": "Country", name: "India" },
      ],
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
      "@type": post.author === "Visa Prepper Editorial Team" ? "Organization" : "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand/visaprepper.jpg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}
