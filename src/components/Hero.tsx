import Image from "next/image";

import { HERO_IMAGE } from "@/lib/data";
import type { SiteSettings } from "@/types";
import Logo from "./Logo";

export default function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section
      id="top"
      className="bg-grain relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink"
    >
      <Image
        src={HERO_IMAGE.url}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />

      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-6 py-40 text-center text-paper animate-fadeUp">
        <span className="kicker text-gold">{settings.heroKicker}</span>

        <Logo siteName={settings.name} size="lg" priority className="mt-6" />

        {/* Visually redundant with the crest above — kept for SEO/screen readers. */}
        <h1 className="sr-only">{settings.name}</h1>

        <p className="mt-8 max-w-xl text-balance font-serif text-lg text-paper/90 sm:text-xl">
          {settings.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#stores"
            className="rounded-full bg-paper px-8 py-3 text-sm font-semibold uppercase tracking-widest2 text-ink transition-transform hover:-translate-y-0.5"
          >
            {settings.heroPrimaryButtonLabel}
          </a>
          <a
            href="#find-us"
            className="rounded-full border border-gold px-8 py-3 text-sm font-semibold uppercase tracking-widest2 text-gold transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-ink"
          >
            {settings.heroSecondaryButtonLabel}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-paper/70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0-6-6m6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
