import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton — edited via the dedicated "Site Settings" pane in structure.ts
 * (fixed document id "siteSettings"), not as a list of documents. Covers
 * every piece of on-page marketing copy that isn't already a Store or
 * Opening Hours document.
 */
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "sections", title: "Section headings" },
    { name: "nav", title: "Navigation" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Business name",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site description",
      description: "Used for search engines/social previews and the footer blurb.",
      type: "text",
      rows: 3,
      group: "general",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "heroKicker",
      title: "Hero kicker",
      description: 'Small line above the logo, e.g. "Est. Dakabin & Mango Hill, QLD".',
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "tagline",
      title: "Hero tagline",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroPrimaryButtonLabel",
      title: "Primary button label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryButtonLabel",
      title: "Secondary button label",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "aboutParagraphs",
      title: "About paragraphs",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "aboutStats",
      title: "About stats",
      description: 'Small stat row, e.g. "2 / Locations".',
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { value: "value", label: "label" },
            prepare({ value, label }) {
              return { title: `${value ?? ""} — ${label ?? ""}` };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "storesKicker",
      title: "Stores section kicker",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "storesHeading",
      title: "Stores section heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "storesSubtext",
      title: "Stores section subtext",
      type: "text",
      rows: 2,
      group: "sections",
    }),
    defineField({
      name: "findUsKicker",
      title: "Find Us section kicker",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "findUsHeading",
      title: "Find Us section heading",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "findUsSubtext",
      title: "Find Us section subtext",
      type: "text",
      rows: 2,
      group: "sections",
    }),

    defineField({
      name: "navAboutLabel",
      title: '"About" nav label',
      type: "string",
      group: "nav",
    }),
    defineField({
      name: "navStoresLabel",
      title: '"Stores" nav label',
      type: "string",
      group: "nav",
    }),
    defineField({
      name: "navContactLabel",
      title: '"Contact" button label',
      type: "string",
      group: "nav",
    }),
  ],
  preview: {
    select: { title: "name" },
    prepare({ title }) {
      return { title: title || "Site Settings" };
    },
  },
});
