import Image from "next/image";

import { LOGO_IMAGE, NAVBAR_LOGO_IMAGE } from "@/lib/data";

const ASSETS = {
  crest: LOGO_IMAGE,
  wordmark: NAVBAR_LOGO_IMAGE,
} as const;

// Width classes tuned per mark so "sm"/"md"/"lg" render at roughly the same
// visual height across the crest's ~4:3 art and the wordmark's wide ~1.9:1 crop.
const SIZES = {
  crest: {
    sm: "w-14 sm:w-16",
    md: "w-28 sm:w-32",
    lg: "w-56 sm:w-72 md:w-80",
  },
  wordmark: {
    sm: "w-20 sm:w-24",
    md: "w-40 sm:w-44",
    lg: "w-80 sm:w-96",
  },
} as const;

export default function Logo({
  siteName,
  mark = "crest",
  size = "md",
  tone = "light",
  priority = false,
  className = "",
}: {
  /** Accessible name announced for the mark — pass the current Site Settings name. */
  siteName: string;
  mark?: keyof typeof ASSETS;
  size?: keyof (typeof SIZES)["crest"];
  /** The mark is a solid-white cutout — "light" for dark backgrounds, "dark" inverts it to black for light backgrounds. */
  tone?: "light" | "dark";
  priority?: boolean;
  className?: string;
}) {
  const asset = ASSETS[mark];

  return (
    <span className={`inline-block shrink-0 ${SIZES[mark][size]} ${className}`}>
      <Image
        src={asset.url}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        priority={priority}
        className={`h-auto w-full ${tone === "dark" ? "invert" : ""}`}
        sizes="(min-width: 768px) 320px, 200px"
      />
      <span className="sr-only">{siteName}</span>
    </span>
  );
}
