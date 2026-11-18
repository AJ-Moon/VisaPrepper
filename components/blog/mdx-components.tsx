import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { DisclaimerCallout } from "@/components/blog/DisclaimerCallout";
import { CtaButton } from "@/components/layout/CtaButton";

function MdxLink({ href = "", children, ...rest }: React.ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  table: ({ children, ...props }) => (
    <div className="my-6">
      <p className="mb-2 text-xs text-muted-foreground sm:hidden">Scroll horizontally to compare all columns.</p>
      <div role="region" aria-label="Comparison table" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
        <table {...props} className="w-full min-w-[36rem] border-collapse text-left text-sm leading-relaxed">{children}</table>
      </div>
    </div>
  ),
  th: ({ children, ...props }) => <th {...props} scope="col" className="border-b bg-marigold-soft px-4 py-3 align-top font-semibold text-foreground">{children}</th>,
  td: ({ children, ...props }) => <td {...props} className="border-b px-4 py-3 align-top">{children}</td>,
  Disclaimer: DisclaimerCallout,
  AppCTA: CtaButton,
};
