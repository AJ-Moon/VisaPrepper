import { LinkButton } from "@/components/ui/Button";
import { CTA_PRIMARY_LABEL } from "@/lib/config/site";
export function CtaButton({ label = CTA_PRIMARY_LABEL, size = "md", className, intent = "paid" }: {
  label?: string; size?: "md" | "lg"; className?: string; intent?: "paid" | "free";
}) {
  return <LinkButton href={intent === "free" ? "/start?intent=free" : "/start"} size={size} className={className}>{label}</LinkButton>;
}
