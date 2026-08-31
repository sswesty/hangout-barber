import { groq } from "next-sanity";

export const openingHoursQuery = groq`
  *[_type == "openingHours"] | order(
    select(
      day == "monday" => 0,
      day == "tuesday" => 1,
      day == "wednesday" => 2,
      day == "thursday" => 3,
      day == "friday" => 4,
      day == "saturday" => 5,
      day == "sunday" => 6
    ) asc
  ) {
    _id,
    day,
    open,
    close,
    closed
  }
`;

export const storeInfoQuery = groq`
  *[_type == "storeInfo"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    addressLine,
    suburb,
    region,
    postcode,
    phone,
    mapEmbedUrl,
    blurb,
    order,
    "heroImage": {
      "url": heroImage.asset->url,
      "alt": heroImage.alt,
      "width": heroImage.asset->metadata.dimensions.width,
      "height": heroImage.asset->metadata.dimensions.height
    }
  }
`;

export const siteSettingsQuery = groq`
  *[_id == "siteSettings"][0] {
    name,
    tagline,
    description,
    heroKicker,
    heroPrimaryButtonLabel,
    heroSecondaryButtonLabel,
    aboutParagraphs,
    aboutStats,
    storesKicker,
    storesHeading,
    storesSubtext,
    findUsKicker,
    findUsHeading,
    findUsSubtext,
    navAboutLabel,
    navStoresLabel,
    navContactLabel
  }
`;

export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    alt,
    order,
    "store": store->slug.current,
    "image": {
      "url": image.asset->url,
      "alt": alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  }
`;
