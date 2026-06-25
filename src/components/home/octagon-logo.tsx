export function OctagonLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Octagon mark with a square negative space — an homage to the Chase octagon.
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 2H27.5L38 12.5V27.5L27.5 38H12.5L2 27.5V12.5L12.5 2ZM16 16V24H24V16H16Z"
        fill="currentColor"
      />
    </svg>
  );
}
