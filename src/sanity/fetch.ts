import "server-only";

import {
  DEFAULT_GALLERY,
  DEFAULT_OPENING_HOURS,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_STORES,
} from "@/lib/data";
import type { GalleryImage, OpeningHour, SiteSettings, StoreInfo } from "@/types";
import { client } from "./client";
import { isSanityConfigured } from "./env";
import {
  galleryImagesQuery,
  openingHoursQuery,
  siteSettingsQuery,
  storeInfoQuery,
} from "./queries";

/**
 * Every getter degrades gracefully to static fallback content so the site
 * builds and renders correctly before a Sanity project has been connected,
 * and stays online if a fetch ever fails.
 */

export async function getOpeningHours(): Promise<OpeningHour[]> {
  if (!isSanityConfigured) return DEFAULT_OPENING_HOURS;
  try {
    const hours = await client.fetch<OpeningHour[]>(
      openingHoursQuery,
      {},
      { next: { revalidate: 3600 } },
    );
    return hours?.length ? hours : DEFAULT_OPENING_HOURS;
  } catch (error) {
    console.warn("[sanity] Falling back to default opening hours:", error);
    return DEFAULT_OPENING_HOURS;
  }
}

export async function getStores(): Promise<StoreInfo[]> {
  if (!isSanityConfigured) return DEFAULT_STORES;
  try {
    const stores = await client.fetch<StoreInfo[]>(
      storeInfoQuery,
      {},
      { next: { revalidate: 3600 } },
    );
    return stores?.length ? stores : DEFAULT_STORES;
  } catch (error) {
    console.warn("[sanity] Falling back to default store info:", error);
    return DEFAULT_STORES;
  }
}

/**
 * Merges the Site Settings singleton over the static defaults field-by-field,
 * so an owner only filling in a few fields in Studio doesn't blank out the
 * rest of the page.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return DEFAULT_SITE_SETTINGS;
  try {
    const settings = await client.fetch<Partial<SiteSettings> | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 3600 } },
    );
    if (!settings) return DEFAULT_SITE_SETTINGS;
    return {
      name: settings.name || DEFAULT_SITE_SETTINGS.name,
      tagline: settings.tagline || DEFAULT_SITE_SETTINGS.tagline,
      description: settings.description || DEFAULT_SITE_SETTINGS.description,
      heroKicker: settings.heroKicker || DEFAULT_SITE_SETTINGS.heroKicker,
      heroPrimaryButtonLabel:
        settings.heroPrimaryButtonLabel || DEFAULT_SITE_SETTINGS.heroPrimaryButtonLabel,
      heroSecondaryButtonLabel:
        settings.heroSecondaryButtonLabel || DEFAULT_SITE_SETTINGS.heroSecondaryButtonLabel,
      aboutParagraphs: settings.aboutParagraphs?.length
        ? settings.aboutParagraphs
        : DEFAULT_SITE_SETTINGS.aboutParagraphs,
      aboutStats: settings.aboutStats?.length
        ? settings.aboutStats
        : DEFAULT_SITE_SETTINGS.aboutStats,
      storesKicker: settings.storesKicker || DEFAULT_SITE_SETTINGS.storesKicker,
      storesHeading: settings.storesHeading || DEFAULT_SITE_SETTINGS.storesHeading,
      storesSubtext: settings.storesSubtext || DEFAULT_SITE_SETTINGS.storesSubtext,
      findUsKicker: settings.findUsKicker || DEFAULT_SITE_SETTINGS.findUsKicker,
      findUsHeading: settings.findUsHeading || DEFAULT_SITE_SETTINGS.findUsHeading,
      findUsSubtext: settings.findUsSubtext || DEFAULT_SITE_SETTINGS.findUsSubtext,
      navAboutLabel: settings.navAboutLabel || DEFAULT_SITE_SETTINGS.navAboutLabel,
      navStoresLabel: settings.navStoresLabel || DEFAULT_SITE_SETTINGS.navStoresLabel,
      navContactLabel: settings.navContactLabel || DEFAULT_SITE_SETTINGS.navContactLabel,
    };
  } catch (error) {
    console.warn("[sanity] Falling back to default site settings:", error);
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!isSanityConfigured) return DEFAULT_GALLERY;
  try {
    const images = await client.fetch<GalleryImage[]>(
      galleryImagesQuery,
      {},
      { next: { revalidate: 3600 } },
    );
    return images?.length ? images : DEFAULT_GALLERY;
  } catch (error) {
    console.warn("[sanity] Falling back to default gallery images:", error);
    return DEFAULT_GALLERY;
  }
}
