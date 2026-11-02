import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

interface HeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, align = "left", tone = "light", className, as: Tag = "h2" }: HeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-xs font-bold uppercase tracking-[0.2em]", dark ? "text-[#f2a36f]" : "text-accent")}>
          {eyebrow}
        </p>
      )}
      <Tag className={cn("text-4xl font-bold leading-[1.05] sm:text-5xl", dark ? "text-cream" : "text-charcoal")}>{title}</Tag>
      {description && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-cream/75" : "text-charcoal/70")}>{description}</p>}
    </Reveal>
  );
}

/** Banner shown on pages that still use sample data. Controlled in /src/data/brand.ts. */
export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: React.ReactNode; description?: string; children?: React.ReactNode }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-charcoal pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-[28rem] rounded-full bg-accent/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 left-1/4 -z-10 size-[22rem] rounded-full bg-sage/30 blur-3xl" />
      <Container>
        <SectionHeading as="h1" tone="dark" eyebrow={eyebrow} title={title} description={description} className="max-w-3xl" />
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
