import {
  Figtree,
  Fraunces,
  Noto_Sans_Arabic,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
} from "next/font/google";

export const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

// Native-script fonts — used only where Urdu/Hindi/Bengali text is actually
// rendered today (homepage/footer language chips), not loaded globally.
export const notoUrdu = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-urdu",
  display: "swap",
  weight: ["500", "600"],
});

export const notoHindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-hindi",
  display: "swap",
  weight: ["500", "600"],
});

export const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  display: "swap",
  weight: ["500", "600"],
});

export const NATIVE_SCRIPT_BY_LOCALE: Record<string, { className: string; dir?: "rtl" }> = {
  ur: { className: notoUrdu.className, dir: "rtl" },
  hi: { className: notoHindi.className },
  bn: { className: notoBengali.className },
};
