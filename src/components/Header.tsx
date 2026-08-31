"use client";

import { useEffect, useState } from "react";

import type { SiteSettings } from "@/types";
import Logo from "./Logo";

export default function Header({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "#about", label: settings.navAboutLabel },
    { href: "#stores", label: settings.navStoresLabel },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-paper shadow-[0_1px_0_0_#000000]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <a href="#top" className="shrink-0">
          <Logo
            siteName={settings.name}
            mark="wordmark"
            size="sm"
            tone={scrolled ? "dark" : "light"}
            priority
          />
        </a>

        <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-5 text-sm uppercase tracking-widest2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`transition-colors hover:text-gold ${
                    scrolled ? "text-ink" : "text-paper"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#find-us"
            className={`hidden rounded-full border px-4 py-1.5 text-sm font-medium uppercase tracking-widest2 transition-colors sm:inline-block ${
              scrolled
                ? "border-ink text-ink hover:bg-ink hover:text-paper"
                : "border-paper text-paper hover:bg-paper hover:text-ink"
            }`}
          >
            {settings.navContactLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
