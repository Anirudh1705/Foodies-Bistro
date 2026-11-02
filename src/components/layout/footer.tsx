import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { brand, navLinks } from "@/data/brand";
import { getActiveOutlets, hoursSummary, telHref } from "@/lib/outlets";
import { Logo } from "./logo";
import { Container } from "@/components/ui/section";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "@/components/ui/social-icons";

const socials = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "x", label: "X (Twitter)", Icon: XIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex gap-3 ${className}`}>
      {socials
        .filter((s) => brand.social[s.key])
        .map(({ key, label, Icon }) => (
          <li key={key}>
            <a
              href={brand.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${brand.name} on ${label}`}
              className="grid size-11 place-items-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              <Icon className="size-5" />
            </a>
          </li>
        ))}
    </ul>
  );
}

export function Footer() {
  const outlets = getActiveOutlets();
  return (
    <footer className="grain relative isolate overflow-hidden bg-charcoal text-cream">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">{brand.description}</p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-[#f2a36f]">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/75 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-[#f2a36f]">Our Outlets</h2>
            <ul className="mt-5 space-y-4 text-sm">
              {outlets.map((o) => (
                <li key={o.id}>
                  <Link href={`/outlets/${o.slug}`} className="group block">
                    <span className="font-medium text-cream group-hover:text-accent">{o.name}</span>
                    <span className="block text-cream/60">{o.locality}, {o.city}</span>
                    <span className="block text-xs text-cream/50">{hoursSummary(o)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-[#f2a36f]">Get in touch</h2>
            <ul className="mt-5 space-y-4 text-sm text-cream/75">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <a href={telHref(brand.phone)} className="hover:text-white">{brand.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <a href={`mailto:${brand.email}`} className="break-all hover:text-white">{brand.email}</a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <span>{brand.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          {brand.showSampleNotices && <p>Menu, prices, addresses and images shown are sample content.</p>}
        </div>
      </Container>
    </footer>
  );
}
