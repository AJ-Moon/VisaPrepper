import { LinkButton } from "@/components/ui/Button";
import { CTA_PRIMARY_LABEL, EXTERNAL_APP_URL } from "@/lib/config/site";
export function CtaButton({ label = CTA_PRIMARY_LABEL, size = "md", className, intent = "paid", variant = "primary" }: {
  label?: string; size?: "md" | "lg"; className?: string; intent?: "paid" | "free"; variant?: "primary" | "accent";
}) {
  return <LinkButton href={EXTERNAL_APP_URL} external variant={variant} size={size} className={className} data-intent={intent}>{label}</LinkButton>;
}
