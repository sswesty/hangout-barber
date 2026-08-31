export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface OpeningHour {
  _id?: string;
  day: DayOfWeek;
  open: string; // "HH:MM" 24hr
  close: string; // "HH:MM" 24hr
  closed?: boolean;
}

export interface SanityImageRef {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface StoreInfo {
  _id?: string;
  name: string;
  slug: string;
  addressLine: string;
  suburb: string;
  region: string;
  postcode?: string;
  phone: string;
  mapEmbedUrl: string;
  blurb: string;
  heroImage: SanityImageRef;
  order?: number;
}

export interface GalleryImage {
  _id?: string;
  image: SanityImageRef;
  alt: string;
  store: string; // matches StoreInfo.slug
  order?: number;
}

export interface AboutStat {
  value: string;
  label: string;
}

/** Singleton document — every editable piece of on-page copy outside the store/hours data. */
export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  heroKicker: string;
  heroPrimaryButtonLabel: string;
  heroSecondaryButtonLabel: string;
  aboutParagraphs: string[];
  aboutStats: AboutStat[];
  storesKicker: string;
  storesHeading: string;
  storesSubtext: string;
  findUsKicker: string;
  findUsHeading: string;
  findUsSubtext: string;
  navAboutLabel: string;
  navStoresLabel: string;
  navContactLabel: string;
}
