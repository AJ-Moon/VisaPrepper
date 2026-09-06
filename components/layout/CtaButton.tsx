import { LinkButton } from "@/components/ui/Button";
import { CTA_PRIMARY_LABEL, EXTERNAL_APP_URL } from "@/lib/config/site";

export function CtaButton({
  label = CTA_PRIMARY_LABEL,
  size = "md",
  className,
}: {
  label?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <LinkButton href={EXTERNAL_APP_URL} variant="primary" size={size} className={className} external>
      {label}
    </LinkButton>
  );
}
