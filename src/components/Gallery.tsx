"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import type { GalleryImage } from "@/types";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showPrev, showNext]);

  if (images.length === 0) return null;

  const active = activeIndex === null ? null : images[activeIndex];

  return (
    <section id="gallery" className="bg-paper px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-2xl text-center">
          <span className="kicker text-charcoal/60">Gallery</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">From the Chair</h2>
          <p className="mt-4 text-base text-charcoal/80 sm:text-lg">
            A running look at the work coming out of both shops — added whenever there&apos;s a
            fresh cut worth sharing.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {images.map((item, i) => (
            <button
              key={item._id ?? i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="img-frame group relative aspect-square cursor-zoom-in"
              aria-label={`View larger image: ${item.alt}`}
            >
              <Image
                src={item.image.url}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 text-paper/80 transition-colors hover:text-gold sm:right-8 sm:top-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-8 w-8"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-paper/80 transition-colors hover:text-gold sm:left-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-paper/80 transition-colors hover:text-gold sm:right-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element -- unconstrained intrinsic size needed for a letterboxed lightbox; next/image requires a pre-sized box */}
          <img
            src={active.image.url}
            alt={active.alt}
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
