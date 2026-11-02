import { Compass, Leaf, Heart, Zap, Users, ChefHat } from "lucide-react";
import { brand } from "@/data/brand";
import { pageMetadata } from "@/lib/seo";
import { getActiveOutlets } from "@/lib/outlets";
import { Container, PageHero, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Visual, type VisualKind } from "@/components/ui/visual";
import { Button } from "@/components/ui/button";
import { SampleNotice } from "@/components/ui/sample-notice";

export const metadata = pageMetadata({
  title: "About Us",
  description: `The story, mission and food philosophy behind ${brand.name} — fresh ingredients, bold flavours and friendly quick service.`,
  path: "/about",
});

function Split({ eyebrow, title, children, kind, flip, seed }: { eyebrow: string; title: string; children: React.ReactNode; kind: VisualKind; flip?: boolean; seed: string }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className={flip ? "lg:order-2" : ""}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lift sm:aspect-[5/6]">
            <Visual seed={seed} kind={kind} iconKey="burgers" sizes="(min-width:1024px) 45vw, 100vw" />
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-charcoal/75">{children}</Reveal>
        </div>
      </Container>
    </section>
  );
}

const different = [
  { icon: Leaf, title: "Fresh, every day", text: "Ingredients are prepped daily — not days ago." },
  { icon: Zap, title: "Fast without the compromise", text: "Streamlined kitchens that keep quality high and queues short." },
  { icon: Users, title: "Same standard, every outlet", text: "One recipe book and one quality checklist across every location." },
  { icon: Heart, title: "Hospitality first", text: "Friendly teams who remember that food is about people." },
];

export default function AboutPage() {
  const outletCount = getActiveOutlets().length;
  return (
    <>
      <PageHero eyebrow="About us" title={<>Fast food with a <span className="text-[#f2a36f]">slower</span> kind of care.</>} description={brand.description} />
      <Container className="pt-8">
        <SampleNotice>The story and philosophy text on this page is sample copy — replace it with the brand&apos;s real story.</SampleNotice>
      </Container>

      <Split eyebrow="Our story" title="It started with one simple idea." kind="outlet" seed="story">
        <p>Quick-service food shouldn&apos;t feel rushed or forgettable. {brand.name} began as a neighbourhood kitchen focused on doing the basics brilliantly — fresh ingredients, honest cooking, generous flavour.</p>
        <p>Today we serve guests across {outletCount} outlets in {brand.primaryCity} and the neighbouring areas, with the same care at every counter.</p>
      </Split>

      <section className="bg-charcoal py-20 text-cream sm:py-28">
        <Container className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <Compass className="size-10 text-[#f2a36f]" aria-hidden />
            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">Our mission</h2>
            <p className="mt-4 text-xl leading-relaxed text-cream/75">To serve fresh, flavourful food quickly — and make every visit feel worth coming back for.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ChefHat className="size-10 text-[#f2a36f]" aria-hidden />
            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">Food philosophy</h2>
            <p className="mt-4 text-xl leading-relaxed text-cream/75">Keep it simple, season with intent, and never cut corners where you can taste them.</p>
          </Reveal>
        </Container>
      </section>

      <Split eyebrow="Quality & ingredients" title="Good food starts before the kitchen." kind="kitchen" flip seed="quality">
        <p>We choose ingredients for freshness first, check them daily, and prepare them in-house wherever we can.</p>
        <p>Every dish follows a standard recipe so a burger tastes as good at one outlet as it does at another.</p>
      </Split>

      <section className="bg-cream-deep/60 py-20 sm:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="What makes us different" title="Small details, big difference." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {different.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-white p-7 shadow-card">
                  <d.icon className="size-8 text-accent" aria-hidden />
                  <h3 className="mt-5 text-xl font-bold">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Split eyebrow="The restaurant experience" title="Come hungry. Leave happy." kind="interior" seed="experience">
        <p>Bright, comfortable spaces, an open and tidy counter, and teams that greet you like a regular — whether you&apos;re dining in or grabbing a quick bite to go.</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="/menu">Explore the menu</Button>
          <Button href="/outlets" variant="outline">Find an outlet</Button>
        </div>
      </Split>
    </>
  );
}
