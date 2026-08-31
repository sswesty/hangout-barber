import { DAY_LABEL, SITE } from "@/lib/data";
import type { OpeningHour, SiteSettings, StoreInfo } from "@/types";

function buildOpeningHoursSpecification(hours: OpeningHour[]) {
  return hours
    .filter((h) => !h.closed)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DAY_LABEL[h.day]}`,
      opens: h.open,
      closes: h.close,
    }));
}

export default function JsonLd({
  stores,
  hours,
  settings,
}: {
  stores: StoreInfo[];
  hours: OpeningHour[];
  settings: SiteSettings;
}) {
  const graph = stores.map((store) => ({
    "@type": "HairSalon",
    "@id": `${SITE.url}/#${store.slug}`,
    name: `${settings.name} — ${store.name}`,
    image: `${SITE.url}${store.heroImage.url}`,
    url: SITE.url,
    telephone: store.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: store.addressLine,
      addressLocality: store.suburb,
      addressRegion: store.region,
      addressCountry: "AU",
    },
    openingHoursSpecification: buildOpeningHoursSpecification(hours),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
