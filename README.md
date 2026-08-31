# Hangout Barber Club

A one-page, SEO-static marketing site for Hangout Barber Club, built with
**Next.js (App Router)**, **Tailwind CSS**, and **Sanity CMS**.

## Stack

- Next.js 14 (App Router, static generation)
- Tailwind CSS (Playfair Display / Lora / Inter via `next/font`)
- Sanity Studio embedded at `/studio`
- JSON-LD `LocalBusiness` (`HairSalon`) structured data for both stores

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your Sanity project ID
npm run dev
```

The site renders with sensible fallback content (see `src/lib/data.ts`) even
without a Sanity project connected, so `npm run build` works out of the box.

## Connecting Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to
   `.env.local`.
3. Run `npm run dev` and open [`/studio`](http://localhost:3000/studio) to
   sign in and start publishing:
   - **Site Settings** — singleton pane pinned at the top of the Studio menu.
     Every other piece of on-page copy: hero tagline/buttons, About paragraphs
     and stats, section headings/subtext, and nav labels.
   - **Store** — name, address, phone, map embed URL, blurb, cover image.
   - **Gallery Image** — image, alt text, linked store.
   - **Opening Hours** — one document per day of the week.

Once documents are published, the homepage automatically prefers CMS content
over the static fallbacks (revalidated hourly). A field left blank in Site
Settings falls back to the static default for that field only, so a partial
edit never blanks out the rest of the page.

## Deploying (free)

- **Hosting** — push this repo to GitHub and import it on
  [Vercel](https://vercel.com) (Hobby/free tier). Add the same env vars from
  `.env.local` in the Vercel project settings, then deploy.
- **CMS** — Sanity's free plan covers this project's usage comfortably (no
  card required). The `/studio` route ships as part of the same deploy, so
  the business owner edits content at `https://<your-domain>/studio`.
- **Domain** — point your domain's DNS at Vercel (works whether the domain is
  registered with GoDaddy or anywhere else); no separate hosting purchase
  needed.

## Project structure

```
src/
  app/                 Routes, layout, metadata, sitemap/robots, OG image
    studio/[[...tool]] Embedded Sanity Studio
  components/          Hero, About, Stores, FindUs, Footer, etc.
  lib/data.ts          Static fallback content + formatting helpers
  sanity/              Client, image builder, GROQ queries, fetch helpers
  sanity/schemaTypes/  openingHours, storeInfo, galleryImage schemas
  types/                TypeScript models shared across the app
sanity.config.ts       Root Sanity Studio configuration
public/img/            All site imagery (hero, about, store galleries)
```

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm run dev`       | Start the dev server           |
| `npm run build`     | Production build (static)      |
| `npm run start`     | Serve the production build     |
| `npm run lint`      | ESLint                         |
| `npm run typecheck` | TypeScript, no emit            |
