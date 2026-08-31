import { CogIcon, ImagesIcon, PinIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const SITE_SETTINGS_DOC_ID = "siteSettings";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Hangout Barber Club")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SITE_SETTINGS_DOC_ID),
        ),
      S.divider(),
      S.listItem()
        .title("Stores")
        .icon(PinIcon)
        .child(S.documentTypeList("storeInfo").title("Stores")),
      S.listItem()
        .title("Gallery Images")
        .icon(ImagesIcon)
        .child(S.documentTypeList("galleryImage").title("Gallery Images")),
      S.listItem()
        .title("Opening Hours")
        .icon(CogIcon)
        .child(S.documentTypeList("openingHours").title("Opening Hours")),
    ]);
