import Image from "next/image";

import type { GalleryImage, StoreInfo } from "@/types";

export default function StoreCard({
  store,
  gallery,
}: {
  store: StoreInfo;
  gallery: GalleryImage[];
}) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${store.addressLine}, ${store.suburb} ${store.region}`,
  )}`;

  return (
    <article className="flex flex-col border border-ink/10 border-t-4 border-t-gold bg-paper">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={store.heroImage.url}
          alt={store.heroImage.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <h3 className="absolute bottom-4 left-6 font-display text-2xl font-bold text-paper sm:text-3xl">
          {store.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
        <p className="text-base leading-relaxed text-charcoal/80">{store.blurb}</p>

        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest2 text-charcoal/50">Address</dt>
            <dd className="mt-1">
              {store.addressLine}, {store.suburb} {store.region}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest2 text-charcoal/50">Phone</dt>
            <dd className="mt-1">
              <a
                href={`tel:${store.phone.replace(/[^\d+]/g, "")}`}
                className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                {store.phone}
              </a>
            </dd>
          </div>
        </dl>

        {gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((item, i) => (
              <div key={item._id ?? i} className="img-frame relative aspect-square">
                <Image
                  src={item.image.url}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-2 self-start border-b border-ink pb-1 text-sm font-semibold uppercase tracking-widest2 text-ink transition-colors hover:border-gold hover:text-gold"
        >
          Get Directions
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
