import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Mail, MapPin, Navigation, Phone, UtensilsCrossed } from "lucide-react";
import { brand } from "@/data/brand";
import { directionsUrl, formatDays, formatSlot, getActiveOutlets, getOutletBySlug, telHref } from "@/lib/outlets";
import { getFacilityIcon } from "@/lib/icons";
import { JsonLd, outletJsonLd, pageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Visual } from "@/components/ui/visual";
import { SampleNotice } from "@/components/ui/sample-notice";
import { OutletStatusBadge } from "@/components/outlets/status-badge";
import { OutletMap } from "@/components/outlets/outlet-map-lazy";
import { MenuBrowser } from "@/components/menu/menu-browser";

export function generateStaticParams() {
  return getActiveOutlets().map((o) => ({ slug: o.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/outlets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const outlet = getOutletBySlug(slug);
  if (!outlet) return {};
  return pageMetadata({
    title: `${outlet.name} — ${outlet.locality}, ${outlet.city}`,
    description: `${brand.name} at ${outlet.locality}, ${outlet.city}. Address, opening hours, phone, directions and the menu available at this outlet.`,
    path: `/outlets/${outlet.slug}`,
  });
}

export default async function OutletPage({ params }: PageProps<"/outlets/[slug]">) {
  const { slug } = await params;
  const outlet = getOutletBySlug(slug);
  if (!outlet) notFound();

  const others = getActiveOutlets().filter((o) => o.id !== outlet.id);

  return (
    <>
      <JsonLd data={outletJsonLd(outlet)} />

      {/* banner */}
      <section className="grain relative isolate flex min-h-[26rem] items-end overflow-hidden bg-charcoal pb-12 pt-36 text-cream sm:min-h-[32rem]">
        <div className="absolute inset-0 -z-10">
          <Visual image={outlet.images[0]} seed={outlet.id} kind="outlet" priority sizes="100vw" quiet />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        </div>
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-cream/70">
            <Link href="/outlets" className="hover:text-white">Outlets</Link> <span aria-hidden>/</span> <span aria-current="page">{outlet.name}</span>
          </nav>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] sm:text-7xl">{outlet.name}</h1>
          <p className="mt-3 text-lg text-cream/80">{outlet.locality}, {outlet.city}</p>
          <div className="mt-5"><OutletStatusBadge outlet={outlet} /></div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={directionsUrl(outlet)} size="lg"><Navigation className="size-5" aria-hidden /> Get Directions</Button>
            <Button href={telHref(outlet.phone)} size="lg" variant="outline-light"><Phone className="size-5" aria-hidden /> Call Outlet</Button>
            <Button href="#outlet-menu" size="lg" variant="outline-light"><UtensilsCrossed className="size-5" aria-hidden /> Explore Menu</Button>
          </div>
        </Container>
      </section>

      {/* info + map */}
      <section className="py-14 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-5">
          <Reveal className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-bold">Visit us</h2>
              <ul className="mt-5 space-y-4 text-[15px]">
                <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /><address className="not-italic">{outlet.completeAddress}</address></li>
                <li className="flex gap-3"><Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /><a href={telHref(outlet.phone)} className="hover:text-accent">{outlet.phone}</a></li>
                {outlet.email && <li className="flex gap-3"><Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden /><a href={`mailto:${outlet.email}`} className="break-all hover:text-accent">{outlet.email}</a></li>}
              </ul>
              <div className="mt-6 border-t border-charcoal/10 pt-6">
                <h3 className="flex items-center gap-2 text-lg font-bold"><Clock className="size-5 text-accent" aria-hidden /> Opening hours</h3>
                <dl className="mt-3 space-y-2 text-[15px]">
                  {outlet.openingHours.map((s) => (
                    <div key={s.days.join()} className="flex justify-between gap-4">
                      <dt className="text-charcoal/65">{formatDays(s.days)}</dt>
                      <dd className="font-semibold">{formatSlot(s)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-bold">Facilities</h2>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {outlet.facilities.map((f) => {
                  const Icon = getFacilityIcon(f);
                  return (
                    <li key={f} className="flex items-center gap-2.5 rounded-xl bg-cream px-3 py-2.5 text-sm font-medium">
                      <Icon className="size-4 shrink-0 text-sage" aria-hidden /> {f}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="h-80 overflow-hidden rounded-3xl shadow-card sm:h-[28rem] lg:h-full lg:min-h-[32rem]">
              <OutletMap outlets={[outlet]} selectedSlug={outlet.slug} />
            </div>
            {!outlet.coordinatesVerified && (
              <p className="mt-3 text-xs text-charcoal/55">Map pin is approximate; directions use the written address. Exact coordinates will be confirmed.</p>
            )}
          </Reveal>
        </Container>
      </section>

      {/* photos */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <SectionHeading eyebrow="Inside the outlet" title="Take a look around." />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {outlet.images.map((img, i) => (
              <Reveal key={i} delay={i * 0.06} className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${i === 0 ? "col-span-2 aspect-[16/9] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-80" : "aspect-[4/3]"}`}>
                <Visual image={img} seed={`${outlet.id}-${i}`} kind={i % 2 ? "interior" : "outlet"} sizes="(min-width:768px) 33vw, 50vw" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* menu */}
      <section id="outlet-menu" className="scroll-mt-20 border-t border-charcoal/10 bg-cream-deep/40 pt-14 sm:pt-20">
        <Container>
          <SectionHeading eyebrow="Menu at this outlet" title={`What's cooking at ${outlet.locality}`} description="Prices and availability below are specific to this outlet." />
          <SampleNotice className="mt-6 max-w-2xl">Sample menu data — dishes, prices and availability are placeholders.</SampleNotice>
        </Container>
        <Suspense fallback={<div className="h-96" aria-busy />}>
          <MenuBrowser outlets={[outlet]} fixedOutletId={outlet.id} />
        </Suspense>
      </section>

      {/* other outlets */}
      {others.length > 0 && (
        <section className="py-14 sm:py-20">
          <Container>
            <h2 className="text-3xl font-bold">Other outlets</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li key={o.id}>
                  <Link href={`/outlets/${o.slug}`} className="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-card transition-shadow hover:shadow-lift">
                    <span>
                      <span className="block font-display text-lg font-bold">{o.name}</span>
                      <span className="text-sm text-charcoal/60">{o.locality}, {o.city}</span>
                    </span>
                    <ArrowRight className="size-5 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
