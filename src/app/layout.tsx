import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { brand } from "@/data/brand";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd, brandJsonLd } from "@/lib/seo";

const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const sans = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: `${brand.name} — ${brand.tagline}`, template: `%s | ${brand.name}` },
  description: brand.description,
  applicationName: brand.name,
  openGraph: { siteName: brand.name, type: "website", locale: "en_IN" },
};

export const viewport: Viewport = {
  themeColor: "#191919",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-accent px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
        <JsonLd data={brandJsonLd()} />
      </body>
    </html>
  );
}
