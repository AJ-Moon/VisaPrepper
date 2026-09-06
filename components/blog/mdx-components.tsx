import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { DisclaimerCallout } from "@/components/blog/DisclaimerCallout";

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
  Disclaimer: DisclaimerCallout,
};
