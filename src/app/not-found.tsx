import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[80dvh] items-center overflow-hidden bg-charcoal pt-24 text-cream">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f2a36f]">Error 404</p>
        <h1 className="mt-3 text-5xl font-bold sm:text-7xl">This plate is empty.</h1>
        <p className="mt-4 max-w-md text-lg text-cream/70">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/menu" variant="outline-light">Explore the menu</Button>
          <Button href="/outlets" variant="outline-light">Find an outlet</Button>
        </div>
      </Container>
    </section>
  );
}
