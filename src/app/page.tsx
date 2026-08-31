import About from "@/components/About";
import FindUs from "@/components/FindUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import SectionDivider from "@/components/SectionDivider";
import Stores from "@/components/Stores";
import { getGalleryImages, getOpeningHours, getSiteSettings, getStores } from "@/sanity/fetch";

// Fully static generation — content is (re)validated on-demand, not per-request.
export const dynamic = "force-static";
export const revalidate = 3600;

export default async function HomePage() {
  const [stores, gallery, hours, settings] = await Promise.all([
    getStores(),
    getGalleryImages(),
    getOpeningHours(),
    getSiteSettings(),
  ]);

  return (
    <>
      <JsonLd stores={stores} hours={hours} settings={settings} />
      <Header settings={settings} />
      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <SectionDivider />
        <Stores stores={stores} gallery={gallery} settings={settings} />
        <SectionDivider />
        <FindUs stores={stores} settings={settings} />
      </main>
      <Footer hours={hours} stores={stores} settings={settings} />
    </>
  );
}
