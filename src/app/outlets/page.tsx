import { pageMetadata } from "@/lib/seo";
import { getActiveOutlets, getCities } from "@/lib/outlets";
import { brand } from "@/data/brand";
import { Container, PageHero } from "@/components/ui/section";
import { OutletDirectory } from "@/components/outlets/outlet-directory";
import { SampleNotice } from "@/components/ui/sample-notice";

export const metadata = pageMetadata({
  title: "Our Outlets",
  description: `Find a ${brand.name} outlet near you. Addresses, opening hours, phone numbers, map and directions for every location.`,
  path: "/outlets",
});

export default function OutletsPage() {
  return (
    <>
      <PageHero eyebrow="Our outlets" title="Find the one nearest you." description="Search by area, switch to the map, or let us find the closest outlet — location access is always optional." />
      <Container className="py-10 sm:py-14">
        <OutletDirectory outlets={getActiveOutlets()} cities={getCities()} />
        <SampleNotice className="mt-10">Outlet addresses and phone numbers are placeholders; map pins are approximate locality positions.</SampleNotice>
      </Container>
    </>
  );
}
