import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { getActiveOutlets } from "@/lib/outlets";
import { brand } from "@/data/brand";
import { PageHero } from "@/components/ui/section";
import { SampleNotice } from "@/components/ui/sample-notice";
import { MenuBrowser } from "@/components/menu/menu-browser";

export const metadata = pageMetadata({
  title: "Our Menu",
  description: `Browse the full ${brand.name} menu — burgers, pizzas, rolls, sides, snacks, combos, desserts and beverages with prices for every outlet.`,
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <PageHero eyebrow="Our menu" title="Pick your craving." description="Burgers to beverages — filter by category and choose an outlet to see its exact prices and availability.">
        <SampleNotice dark className="max-w-2xl">Sample menu: dish names, descriptions and prices are placeholders until the real menu is supplied.</SampleNotice>
      </PageHero>
      <Suspense fallback={<div className="h-96" aria-busy />}>
        <MenuBrowser outlets={getActiveOutlets()} />
      </Suspense>
    </>
  );
}
