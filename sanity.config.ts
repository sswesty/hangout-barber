"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  name: "hangout-barber-club",
  title: "Hangout Barber Club",

  projectId: projectId || "placeholder",
  dataset,

  schema: { types: schemaTypes },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  document: {
    // Site Settings is a singleton edited via its dedicated structure pane
    // (fixed document id) — keep it out of the global "+ Create" menu so a
    // second, orphaned settings document can't be created by accident.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => item.templateId !== "siteSettings")
        : prev,
  },
});
