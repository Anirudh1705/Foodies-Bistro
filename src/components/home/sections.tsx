import Link from "next/link";
import { ArrowRight, Clock, Flame, Leaf, Sparkles, Star, Zap } from "lucide-react";
import { brand } from "@/data/brand";
import { galleryImages } from "@/data/gallery";
import { testimonials } from "@/data/testimonials";
import { getActiveOutlets } from "@/lib/outlets";
import { formatPrice, getSignatureItems, menuCategories } from "@/lib/menu";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Visual } from "@/components/ui/visual";
import { DietBadge } from "@/components/ui/diet-badge";
import { OutletCard } from "@/components/outlets/outlet-card";
import { SampleNotice } from "@/components/ui/sample-notice";

export function Marquee() {
  const items = ["Freshly Prepared", "Quality Ingredients", "Great Taste", "Quick Service", "Big Flavours"];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-charcoal/10 bg-accent py-4 text-white" aria-hidden>
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-lg font-bold uppercase tracking-wider">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t} <Sparkles className="size-4" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function PopularDishes() {
  const dishes = getSignatureItems().slice(0, 6);
  return (
    <section id="popular" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Signature dishes" title="Crowd favourites, made fresh." description="A taste of what our regulars keep coming back for." />
          <Reveal>
            <Button href="/menu" variant="dark">Explore Full Menu <ArrowRight className="size-4" aria-hidden /></Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((d, i) => {
            const cat = menuCategories.find((c) => c.slug === d.category);
            return (
              <Reveal key={d.id} delay={(i % 3) * 0.08}>
                <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Visual image={d.image} seed={d.id} iconKey={cat?.icon} className="transition-transform duration-500 group-hover:scale-105" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                    {d.isBestseller && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                        <Star className="size-3 fill-current" aria-hidden /> Bestseller
                      </span>
                    )}
                    {d.isSpicy && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-700 px-2.5 py-1 text-[11px] font-bold uppercase text-white shadow">
                        <Flame className="size-3" aria-hidden /> Spicy
                      </span>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="flex items-start gap-2.5 text-xl font-bold leading-snug">
                        <DietBadge type={d.dietaryType} className="mt-1" /> {d.name}
                      </h3>
                      <span className="font-display text-xl font-bold text-accent">{formatPrice(d.price)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{d.description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <SampleNotice className="mt-8">Dishes and prices shown are sample data until the real menu is supplied.</SampleNotice>
      </Container>
    </section>
  );
}

export function AboutTeaser() {
  const points = ["Fresh ingredients, prepared daily", "Recipes tuned for bold, balanced flavour", "Consistent quality at every outlet"];
  return (
    <section className="overflow-hidden bg-sage py-20 text-cream sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
            <Visual seed="about-main" kind="kitchen" sizes="(min-width:1024px) 40vw, 100vw" />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden w-1/2 overflow-hidden rounded-3xl border-8 border-sage shadow-lift sm:block">
            <div className="relative aspect-square">
              <Visual seed="about-small" kind="food" iconKey="burgers" quiet sizes="25vw" />
            </div>
          </div>
        </Reveal>
        <div>
          <SectionHeading tone="dark" eyebrow="About the brand" title={<>Good food, made the honest way.</>} description={`${brand.name} started with a simple idea: quick-service food should never feel like a compromise. We cook with fresh ingredients, season with intent, and serve with a smile — every outlet, every time.`} />
          <ul className="mt-8 space-y-4">
            {points.map((p, i) => (
              <li key={p}>
                <Reveal delay={i * 0.08} className="flex items-center gap-3 text-lg">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream text-sage"><Leaf className="size-4" aria-hidden /></span>
                  {p}
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-9">
            <Button href="/about" variant="light" size="lg">Our Story <ArrowRight className="size-5" aria-hidden /></Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

const features = [
  { icon: Flame, title: "Freshly Prepared", text: "Every order is cooked when you place it — never sitting under a lamp." },
  { icon: Leaf, title: "Quality Ingredients", text: "Carefully sourced produce and proteins, checked daily at every kitchen." },
  { icon: Sparkles, title: "Great Taste", text: "Bold, balanced flavours developed and tested by our culinary team." },
  { icon: Zap, title: "Quick Service", text: "Friendly counters and efficient kitchens keep your wait short." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading align="center" eyebrow="Why choose us" title="Fast food, done properly." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-charcoal/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-lift">
                <span className="grid size-14 place-items-center rounded-2xl bg-accent/10 text-accent"><f.icon className="size-7" aria-hidden /></span>
                <h3 className="mt-6 text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function OutletsPreview() {
  const outlets = getActiveOutlets();
  return (
    <section className="bg-cream-deep/60 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Our outlets" title={`${outlets.length} places to find us.`} description="Walk in, take away or hang out — find the outlet closest to you." />
          <Reveal><Button href="/outlets" variant="dark">All outlets & map <ArrowRight className="size-4" aria-hidden /></Button></Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {outlets.map((o) => (
            <OutletCard key={o.id} outlet={o} compact />
          ))}
        </div>
        <SampleNotice className="mt-8">Outlet names, addresses and phone numbers are placeholders until real details are supplied.</SampleNotice>
      </Container>
    </section>
  );
}

export function GalleryPreview() {
  const picks = galleryImages.slice(0, 6);
  const spans = ["", "", "", "", "", ""];
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Gallery" title="A taste of the atmosphere." />
          <Reveal><Button href="/gallery" variant="outline">View gallery <ArrowRight className="size-4" aria-hidden /></Button></Reveal>
        </div>
        <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-3">
          {picks.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.06} className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${spans[i]}`}>
              <Link href="/gallery" aria-label={`Gallery: ${g.caption}`} className="group absolute inset-0">
                <Visual image={g.image} seed={g.id} kind={g.category === "interiors" ? "interior" : g.category === "outlets" ? "outlet" : g.category === "kitchen" ? "kitchen" : g.category === "brand-moments" ? "brand" : "food"} className="transition-transform duration-700 group-hover:scale-110" sizes="(min-width:768px) 33vw, 50vw" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null; // only rendered with authentic review data
  return (
    <section className="bg-charcoal py-20 text-cream sm:py-28">
      <Container>
        <SectionHeading tone="dark" align="center" eyebrow="Kind words" title="What our guests say." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t.id}>
              <figure className="h-full rounded-3xl bg-charcoal-soft p-7">
                <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-cream/60">— {t.author}{t.source ? `, ${t.source}` : ""}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28">
      <Reveal className="grain relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-accent px-6 py-16 text-center text-white sm:py-24">
        <div aria-hidden className="absolute -left-20 -top-20 -z-10 size-72 rounded-full bg-white/10" />
        <div aria-hidden className="absolute -bottom-24 -right-12 -z-10 size-96 rounded-full bg-charcoal/15" />
        <Clock className="mx-auto size-10 opacity-80" aria-hidden />
        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">Craving Something Delicious?</h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-white/85">Browse the menu, then walk into your nearest {brand.name} outlet.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/menu" size="lg" variant="dark">Explore Our Menu</Button>
          <Button href="/outlets" size="lg" variant="outline-light">Find Your Nearest Outlet</Button>
        </div>
      </Reveal>
    </section>
  );
}
