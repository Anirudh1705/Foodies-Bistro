import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { brand } from "@/data/brand";
import { pageMetadata } from "@/lib/seo";
import { getActiveOutlets, telHref } from "@/lib/outlets";
import { Container, PageHero } from "@/components/ui/section";
import { ContactForm } from "@/components/contact/contact-form";
import { SampleNotice } from "@/components/ui/sample-notice";
import { SocialLinks } from "@/components/layout/footer";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact ${brand.name} — phone, email, business address and outlet contact numbers.`,
  path: "/contact",
});

export default function ContactPage() {
  const outlets = getActiveOutlets();
  const rows = [
    { Icon: Phone, label: "Phone", value: brand.phone, href: telHref(brand.phone) },
    { Icon: Mail, label: "Customer support", value: brand.email, href: `mailto:${brand.email}` },
    { Icon: MapPin, label: "Business address", value: brand.address },
  ];
  return (
    <>
      <PageHero eyebrow="Contact us" title="We'd love to hear from you." description="Questions, feedback or enquiries — reach us here, or call your nearest outlet directly." />
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <ul className="space-y-6">
              {rows.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent"><Icon className="size-5" aria-hidden /></span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-charcoal/50">{label}</p>
                    {href ? <a href={href} className="break-words font-medium hover:text-accent">{value}</a> : <p className="font-medium">{value}</p>}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-charcoal/10 pt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-charcoal/50">Follow us</p>
              <div className="rounded-2xl bg-charcoal p-3"><SocialLinks /></div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-bold">Outlet numbers</h2>
            <ul className="mt-4 divide-y divide-charcoal/10">
              {outlets.map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <Link href={`/outlets/${o.slug}`} className="font-medium hover:text-accent">{o.name}</Link>
                  <a href={telHref(o.phone)} className="text-charcoal/65 hover:text-accent">{o.phone}</a>
                </li>
              ))}
            </ul>
          </div>
          <SampleNotice>Contact details are placeholders until real information is supplied.</SampleNotice>
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
