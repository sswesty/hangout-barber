import Image from "next/image";

import AnimatedStat from "@/components/AnimatedStat";
import { ABOUT_IMAGE } from "@/lib/data";
import type { SiteSettings } from "@/types";

export default function About({ settings }: { settings: SiteSettings }) {
  return (
    <section id="about" className="bg-paper px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-content items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <span className="kicker text-charcoal/60">The Club</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
            About {settings.name}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-charcoal/80 sm:text-lg">
            {settings.aboutParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
            {settings.aboutStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-bold text-ink sm:text-4xl">
                  <AnimatedStat value={stat.value} />
                </dd>
                <dd className="mt-1 text-xs uppercase tracking-widest2 text-charcoal/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div className="img-frame relative mx-auto aspect-[4/5] w-full max-w-md">
            <Image
              src={ABOUT_IMAGE.url}
              alt={ABOUT_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 448px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
