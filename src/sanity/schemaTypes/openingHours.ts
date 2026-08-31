import { ClockIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "openingHours",
  title: "Opening Hours",
  type: "document",
  icon: ClockIcon,
  fields: [
    defineField({
      name: "day",
      title: "Day",
      type: "string",
      options: {
        list: [
          { title: "Monday", value: "monday" },
          { title: "Tuesday", value: "tuesday" },
          { title: "Wednesday", value: "wednesday" },
          { title: "Thursday", value: "thursday" },
          { title: "Friday", value: "friday" },
          { title: "Saturday", value: "saturday" },
          { title: "Sunday", value: "sunday" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "open",
      title: "Opens",
      description: "24 hour time, e.g. 09:00",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
            name: "time",
            invert: false,
          })
          .error("Use 24 hour HH:MM format, e.g. 09:00"),
    }),
    defineField({
      name: "close",
      title: "Closes",
      description: "24 hour time, e.g. 18:00",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
            name: "time",
            invert: false,
          })
          .error("Use 24 hour HH:MM format, e.g. 18:00"),
    }),
    defineField({
      name: "closed",
      title: "Closed all day",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Day of week",
      name: "dayOfWeek",
      by: [{ field: "day", direction: "asc" }],
    },
  ],
  preview: {
    select: { day: "day", open: "open", close: "close", closed: "closed" },
    prepare({ day, open, close, closed }) {
      return {
        title: day ? day.charAt(0).toUpperCase() + day.slice(1) : "Untitled",
        subtitle: closed ? "Closed" : `${open} – ${close}`,
      };
    },
  },
});
