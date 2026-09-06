import { b1b2 } from "@/content/visa-types/b1-b2";
import { f1 } from "@/content/visa-types/f1";
import { familyImmigrant } from "@/content/visa-types/family-immigrant";
import { h1b } from "@/content/visa-types/h1b";
import { h4 } from "@/content/visa-types/h4";
import { j1 } from "@/content/visa-types/j1";
import type { VisaTypeContent } from "@/content/visa-types/types";

const ALL_VISA_TYPES: VisaTypeContent[] = [b1b2, f1, h1b, h4, j1, familyImmigrant];

export function getAllVisaTypes(): VisaTypeContent[] {
  return ALL_VISA_TYPES;
}

export function getAllVisaTypeSlugs(): string[] {
  return ALL_VISA_TYPES.map((visaType) => visaType.slug);
}

export function getVisaTypeBySlug(slug: string): VisaTypeContent | undefined {
  return ALL_VISA_TYPES.find((visaType) => visaType.slug === slug);
}

export type { VisaTypeContent };
