import { DAY_SHORT, formatTime12h } from "@/lib/data";
import type { OpeningHour, SiteSettings, StoreInfo } from "@/types";
import Logo from "./Logo";

export default function Footer({
  hours,
  stores,
  settings,
}: {
  hours: OpeningHour[];
  stores: StoreInfo[];
  settings: SiteSettings;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal px-6 py-16 text-paper">
      <div className="mx-auto grid max-w-content gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo siteName={settings.name} mark="wordmark" size="md" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70">
            {settings.description}
          </p>
        </div>

        <div>
          <h4 className="kicker text-gold">Trading Hours</h4>
          <ul className="mt-4 space-y-1.5 text-sm">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-6 text-paper/80">
                <span>{DAY_SHORT[h.day]}</span>
                <span>
                  {h.closed ? "Closed" : `${formatTime12h(h.open)} – ${formatTime12h(h.close)}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="kicker text-gold">Our Stores</h4>
          <ul className="mt-4 space-y-4 text-sm text-paper/80">
            {stores.map((store) => (
              <li key={store.slug}>
                <p className="font-medium text-paper">{store.name}</p>
                <p>
                  {store.addressLine}, {store.suburb} {store.region}
                </p>
                <a
                  href={`tel:${store.phone.replace(/[^\d+]/g, "")}`}
                  className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
                >
                  {store.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-content border-t border-paper/10 pt-6 text-xs text-paper/50">
        &copy; {year} {settings.name}. All rights reserved.
      </div>
    </footer>
  );
}
