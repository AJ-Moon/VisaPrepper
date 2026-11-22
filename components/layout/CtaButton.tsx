import { LinkButton } from "@/components/ui/Button";
import { CTA_PRIMARY_LABEL, EXTERNAL_APP_URL, EXTERNAL_SIGNUP_URL } from "@/lib/config/site";
export function CtaButton({ label = CTA_PRIMARY_LABEL, size = "md", className, intent = "paid", variant = "primary" }: {
  label?: string; size?: "md" | "lg"; className?: string; intent?: "paid" | "free"; variant?: "primary" | "accent";
}) {
  // "Start Free" and the other free-start buttons open account creation (not the
  // sign-in screen); package buttons keep the app entry. Log In links use EXTERNAL_LOGIN_URL.
  const href = intent === "free" ? EXTERNAL_SIGNUP_URL : EXTERNAL_APP_URL;
  return <LinkButton href={href} external variant={variant} size={size} className={className} data-intent={intent}>{label}</LinkButton>;
}
