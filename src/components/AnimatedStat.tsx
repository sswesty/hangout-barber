"use client";

import { useEffect, useRef, useState } from "react";

/** Fires `inView` once, the first time the element scrolls into the viewport. */
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options ?? { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { ref, inView };
}

/**
 * Renders a stat value ("10+", "7", "2") hidden until it scrolls into view,
 * then fades in while counting up from 0 to its target. A value with no
 * leading number, or a visitor with prefers-reduced-motion, just fades in
 * at its final value with no counting.
 */
export default function AnimatedStat({ value }: { value: string }) {
  const { ref, inView } = useInView();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target === null ? value : "0");

  useEffect(() => {
    if (!inView || target === null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(String(target));
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(String(Math.round(eased * target)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-opacity duration-500 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      {display}
      {suffix}
    </span>
  );
}
