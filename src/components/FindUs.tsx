import type { SiteSettings, StoreInfo } from "@/types";

export default function FindUs({
  stores,
  settings,
}: {
  stores: StoreInfo[];
  settings: SiteSettings;
}) {
  return (
    <section id="find-us" className="bg-ink px-6 py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker text-gold">{settings.findUsKicker}</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
            {settings.findUsHeading}
          </h2>
          <p className="mt-4 text-base text-paper/80 sm:text-lg">{settings.findUsSubtext}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {stores.map((store) => (
            <div key={store.slug} className="flex flex-col gap-5">
              <div className="flex items-baseline justify-between border-b border-paper/20 pb-4">
                <h3 className="font-display text-xl font-bold sm:text-2xl">{store.name}</h3>
                <a
                  href={`tel:${store.phone.replace(/[^\d+]/g, "")}`}
                  className="text-sm font-medium text-paper/80 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
                >
                  {store.phone}
                </a>
              </div>

              <p className="text-sm text-paper/70">
                {store.addressLine}, {store.suburb} {store.region}
              </p>

              <div className="aspect-[4/3] w-full overflow-hidden border border-paper/20 sm:aspect-[16/10]">
                <iframe
                  src={store.mapEmbedUrl}
                  title={`Map to ${store.name} — ${store.addressLine}, ${store.suburb} ${store.region}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(1) contrast(1.05)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
