import type { Metadata, Viewport } from "next";
import { Inter, Lora, Playfair_Display } from "next/font/google";

import { SITE } from "@/lib/data";
import { getSiteSettings } from "@/sanity/fetch";

import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const serif = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = `${settings.name} | Barbershop in Dakabin & Mango Hill, QLD`;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: title,
      template: `%s | ${settings.name}`,
    },
    description: settings.description,
    keywords: [
      "barber",
      "barbershop",
      "Dakabin barber",
      "Mango Hill barber",
      "North Lakes barber",
      "mens haircut Queensland",
      "skin fade",
      "hot towel shave",
    ],
    authors: [{ name: settings.name }],
    applicationName: settings.name,
    openGraph: {
      type: "website",
      locale: "en_AU",
      url: SITE.url,
      siteName: settings.name,
      title,
      description: settings.description,
      images: [{ url: "/img/about-us-hero.jpg", width: 1200, height: 630, alt: settings.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: settings.description,
      images: ["/img/about-us-hero.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/img/icon.png",
      shortcut: "/img/icon.png",
      apple: "/img/icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${display.variable} ${serif.variable} ${sans.variable}`}
    >
      <body className="bg-paper text-charcoal">{children}</body>
    </html>
  );
}
