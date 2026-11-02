import { brand } from "@/data/brand";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { AboutTeaser, FinalCta, GalleryPreview, Marquee, OutletsPreview, PopularDishes, Testimonials, WhyChooseUs } from "@/components/home/sections";

export const metadata = {
  ...pageMetadata({
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    path: "/",
  }),
  title: { absolute: `${brand.name} — Fresh Quick-Service Food Across ${brand.primaryCity}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <PopularDishes />
      <AboutTeaser />
      <WhyChooseUs />
      <OutletsPreview />
      <GalleryPreview />
      <Testimonials />
      <FinalCta />
    </>
  );
}
