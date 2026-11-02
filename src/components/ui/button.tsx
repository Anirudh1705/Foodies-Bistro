import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark shadow-[0_8px_20px_-8px_rgb(230_106_50/0.7)] hover:-translate-y-0.5",
  dark: "bg-charcoal text-cream hover:bg-charcoal-soft hover:-translate-y-0.5",
  light: "bg-cream text-charcoal hover:bg-white hover:-translate-y-0.5",
  outline: "border-2 border-charcoal/85 text-charcoal hover:bg-charcoal hover:text-cream",
  "outline-light": "border-2 border-cream/70 text-cream hover:bg-cream hover:text-charcoal",
  ghost: "text-charcoal hover:bg-charcoal/5",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-14 px-8 text-base",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

type ButtonProps = Common &
  (
    | ({ href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, external, ...anchor } = rest as { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal && !external) {
      return (
        <Link href={href} className={cls} {...anchor}>
          {children}
        </Link>
      );
    }
    const isWeb = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchor}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
