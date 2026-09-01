import type { GalleryImage, OpeningHour, SiteSettings, StoreInfo } from "@/types";

/**
 * Fallback content used whenever Sanity is not configured (no project ID)
 * or a query fails/returns empty. This keeps the site fully static and
 * buildable out of the box while remaining editable from the Sanity Studio
 * the moment real content is published.
 */

// Infra-level identity — not owner-editable copy, so it stays a plain
// constant rather than living in the Site Settings singleton.
export const SITE = {
  shortName: "HBC",
  url: "https://www.hangoutbarberclub.com.au",
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  name: "Hangout Barber Club",
  tagline: "Traditional cuts. Modern club.",
  description:
    "Hangout Barber Club is a heritage-inspired barbershop with locations in Dakabin and Mango Hill, Queensland — old-school skin fades, straight-razor line-ups and hot towel shaves.",
  heroKicker: "Est. Dakabin & Mango Hill, QLD",
  heroPrimaryButtonLabel: "Our Stores",
  heroSecondaryButtonLabel: "Find Us",
  aboutParagraphs: [
    "Hangout Barber Club was built on an old-fashioned idea: a great haircut is a craft, not a quick transaction. Our chairs are held by a mix of seasoned barbers and apprentices learning the trade the right way — trained under a watchful eye, blade in hand, earning the trust of the regulars who sit in it week after week.",
    "From skin fades and scissor cuts to straight-razor line-ups and hot towel shaves, we keep the traditions of the trade alive across two Queensland shopfronts — Dakabin and Mango Hill — while running a clean, modern club underneath the heritage signage.",
  ],
  aboutStats: [
    { value: "2", label: "Locations" },
    { value: "10+", label: "Barbers & Apprentices" },
    { value: "7", label: "Days a Week" },
  ],
  storesKicker: "Two Shopfronts, One Standard",
  storesHeading: "Our Locations",
  storesSubtext:
    "Walk-ins welcome at either chair house — same crew culture, same attention to detail, seven days a week between the two of us.",
  findUsKicker: "Get In Touch",
  findUsHeading: "Find Us",
  findUsSubtext: "Drop by, call ahead, or plug the address straight into your maps app.",
  navAboutLabel: "About",
  navStoresLabel: "Stores",
  navContactLabel: "Contact",
};

export const DEFAULT_OPENING_HOURS: OpeningHour[] = [
  { day: "monday", open: "09:00", close: "18:00" },
  { day: "tuesday", open: "09:00", close: "18:00" },
  { day: "wednesday", open: "09:00", close: "18:00" },
  { day: "thursday", open: "09:00", close: "20:00" },
  { day: "friday", open: "09:00", close: "18:00" },
  { day: "saturday", open: "09:00", close: "17:00" },
  { day: "sunday", open: "09:00", close: "16:00" },
];

export const DEFAULT_STORES: StoreInfo[] = [
  {
    name: "Mango Hill",
    slug: "mango-hill",
    addressLine: "1751 Anzac Ave",
    suburb: "Mango Hill",
    region: "QLD",
    phone: "(07) 3385 5242",
    mapEmbedUrl:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("1751 Anzac Ave, Mango Hill QLD") +
      "&output=embed",
    blurb:
      "Our original home base — a stripped-back, brick-and-timber shop where the clippers have barely stopped since day one.",
    heroImage: { url: "/img/north-lakes-hero.jpg", alt: "Inside the Hangout Barber Club Mango Hill store" },
    order: 1,
  },
  {
    name: "Dakabin",
    slug: "dakabin",
    addressLine: "289 Old Gympie Rd",
    suburb: "Dakabin",
    region: "QLD",
    phone: "(07) 3283 8833",
    mapEmbedUrl:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("289 Old Gympie Rd, Dakabin QLD") +
      "&output=embed",
    blurb:
      "Our second chair house on Old Gympie Rd — same standards, same crew culture, built for the regulars who found us next.",
    heroImage: { url: "/img/dakabin-hero.jpg", alt: "Inside the Hangout Barber Club Dakabin store" },
    order: 2,
  },
];

export const DEFAULT_GALLERY: GalleryImage[] = [
  { image: { url: "/img/dakabin-1.jpg", alt: "Barber chairs at the Dakabin store" }, alt: "Barber chairs at the Dakabin store", store: "dakabin", order: 1 },
  { image: { url: "/img/dakabin-2.jpg", alt: "Fresh fade at the Dakabin store" }, alt: "Fresh fade at the Dakabin store", store: "dakabin", order: 2 },
  { image: { url: "/img/north-lakes-1.jpg", alt: "Barber chairs at the Mango Hill store" }, alt: "Barber chairs at the Mango Hill store", store: "mango-hill", order: 1 },
  { image: { url: "/img/north-lakes-2.jpg", alt: "Fresh fade at the Mango Hill store" }, alt: "Fresh fade at the Mango Hill store", store: "mango-hill", order: 2 },
];

export const ABOUT_IMAGE = { url: "/img/about-us-1.jpg", alt: "A barber at Hangout Barber Club mid-cut" };
export const HERO_IMAGE = { url: "/img/about-us-hero.jpg", alt: "The Hangout Barber Club crew" };
export const LOGO_IMAGE = {
  url: "/img/logo.png",
  alt: "Hangout Barber Club crest — straight razor, scissors and moustache emblem",
  width: 1280,
  height: 962,
};

export const NAVBAR_LOGO_IMAGE = {
  url: "/img/navbar-logo.png",
  alt: "Hangout Barber Club",
  width: 1102,
  height: 576,
};

export const DAY_LABEL: Record<OpeningHour["day"], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const DAY_SHORT: Record<OpeningHour["day"], string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

/** "09:00" -> "9:00am", "18:00" -> "6:00pm" */
export function formatTime12h(time: string): string {
  const [hStr, mStr] = time.split(":");
  const h = parseInt(hStr, 10);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const minutes = mStr === "00" ? "" : `:${mStr}`;
  return `${hour12}${minutes}${period}`;
}
