import type { FaqEntry } from "@/lib/seo/json-ld";

export type VisaTypeContent = {
  slug: string;
  code: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  whoItsFor: string[];
  informationUsed: string[];
  topics: { title: string; description: string }[];
  faqs: FaqEntry[];
};
