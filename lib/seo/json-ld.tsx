import type { PublicPlan } from "@/lib/config/live-offering";
import { CONTACT_EMAIL, SITE_ALTERNATE_NAMES, SITE_NAME, SITE_URL } from "@/lib/config/site";
import { PLANS, SOCIAL_LINKS } from "@/lib/config/offering";
import { APPLICANT_SCOPE, INTERVIEW_LANGUAGE_SCOPE } from "@/lib/config/product-scope";

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
    url: `${SITE_URL}/`,
    "@id": `${SITE_URL}/#organization`,
    logo: `${SITE_URL}/images/brand/visaprepper.jpg`,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    email: CONTACT_EMAIL,
    description:
      `VisaPrepper offers independent visa interview preparation and document checks, with free educational guides for readers worldwide. ${APPLICANT_SCOPE} ${INTERVIEW_LANGUAGE_SCOPE}`,
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
      `Application-based AI visa interview practice and document consistency checks for supported categories. ${APPLICANT_SCOPE} ${INTERVIEW_LANGUAGE_SCOPE}`,
    url: `${SITE_URL}/`,
    inLanguage: ["en", "ur", "hi"],
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: `${plan.price === 0
        ? "One free document check and preparation tips for eligible users. No interviews."
        : `${plan.interviews} complete AI video interviews, ${plan.checks} document checks, personalised practice tips, and results after each interview. 90 days from purchase. One-time payment.`} ${APPLICANT_SCOPE}`,
      price: plan.price,
      priceCurrency: "USD",
      ...(plan.price > 0 ? { availability: "https://schema.org/InStock" } : {}),
      url: `${SITE_URL}/#pricing`,
      eligibleRegion: { "@type": "Place", name: "Worldwide" },
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

// Bylines that name the in-house team rather than a person. The `name` in the
// markup must stay identical to the visible byline.
const ORGANIZATION_AUTHORS = new Set(["Visa Prepper Editorial Team"]);

export function buildArticleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  publishDate: string;
  updatedDate?: string;
  author: string;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    inLanguage: "en",
    headline: post.title,
    description: post.description,
    image: [`${SITE_URL}/opengraph-image`],
    datePublished: post.publishDate,
    dateModified: post.updatedDate ?? post.publishDate,
    author: ORGANIZATION_AUTHORS.has(post.author)
      ? {
          "@type": "Organization",
          "@id": `${SITE_URL}/#editorial-team`,
          name: post.author,
          url: `${SITE_URL}/about`,
          parentOrganization: { "@id": `${SITE_URL}/#organization` },
        }
      : { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand/visaprepper.jpg`,
        width: 1254,
        height: 1254,
      },
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntityOfPage: url,
  };
}
