import { LinkButton } from "@/components/ui/Button";
import { CTA_PRIMARY_LABEL, EXTERNAL_APP_URL } from "@/lib/config/site";
export function CtaButton({ label = CTA_PRIMARY_LABEL, size = "md", className, intent = "paid" }: {
  label?: string; size?: "md" | "lg"; className?: string; intent?: "paid" | "free";
}) {
  return <LinkButton href={EXTERNAL_APP_URL} external size={size} className={className} data-intent={intent}>{label}</LinkButton>;
}
