import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative block h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-primary", className)}>
      <Image src="/images/brand/visaprepper.jpg" alt="" width={1254} height={1254} sizes="80px"
        className="absolute h-auto max-w-none"
        style={{ width: "188%", left: "-47.2%", top: "-18%" }} />
    </span>
  );
}

export function Logo({ className, onCharcoal = false }: { className?: string; onCharcoal?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className={cn("font-sans text-lg font-semibold tracking-tight", onCharcoal ? "text-on-charcoal" : "text-foreground")}>
        Visa<span className={onCharcoal ? "text-sage" : "text-primary"}>Prepper</span>
      </span>
    </span>
  );
}
