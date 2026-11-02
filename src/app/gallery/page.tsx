import { pageMetadata } from "@/lib/seo";
import { brand } from "@/data/brand";
import { galleryImages } from "@/data/gallery";
import { PageHero, Container } from "@/components/ui/section";
import { SampleNotice } from "@/components/ui/sample-notice";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata = pageMetadata({
  title: "Gallery",
  description: `Photos of ${brand.name} food, restaurant interiors, outlets, our kitchen and brand moments.`,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Food, faces and places." description="A look at our dishes, kitchens, outlets and the moments we love." />
      <Container className="pt-8"><SampleNotice>Placeholders shown — real photography replaces these via <code>src/data/gallery.ts</code>.</SampleNotice></Container>
      <GalleryGrid images={galleryImages} />
    </>
  );
}
