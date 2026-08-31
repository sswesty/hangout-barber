/**
 * Sits on the seam between two adjacent sections — zero height in flow, set
 * 30px into the section below so it reads as embedded in that section's
 * color rather than centered on the boundary line.
 */
export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative z-10 h-0 w-full ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-[30px] flex items-center gap-5 px-6 sm:gap-8 sm:px-10">
        <span className="divider-line flex-1" />
        <span className="divider-star" />
        <span className="divider-line flex-1" />
      </div>
    </div>
  );
}
