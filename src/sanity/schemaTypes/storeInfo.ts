import { PinIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "storeInfo",
  title: "Store",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "name",
      title: "Store name",
      type: "string",
      description: "e.g. Dakabin",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "addressLine",
      title: "Street address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "suburb",
      title: "Suburb",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "State",
      type: "string",
      initialValue: "QLD",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postcode",
      title: "Postcode",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps embed URL",
      description:
        "The 'output=embed' Google Maps URL used in the Find Us iframe.",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "Short blurb",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "suburb", media: "heroImage" },
  },
});
