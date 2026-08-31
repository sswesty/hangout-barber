import type { GalleryImage, SiteSettings, StoreInfo } from "@/types";
import StoreCard from "./StoreCard";

export default function Stores({
  stores,
  gallery,
  settings,
}: {
  stores: StoreInfo[];
  gallery: GalleryImage[];
  settings: SiteSettings;
}) {
  return (
    <section id="stores" className="bg-smoke px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker text-charcoal/60">{settings.storesKicker}</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
            {settings.storesHeading}
          </h2>
          <p className="mt-4 text-base text-charcoal/80 sm:text-lg">{settings.storesSubtext}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {stores.map((store) => (
            <StoreCard
              key={store.slug}
              store={store}
              gallery={gallery.filter((g) => g.store === store.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
