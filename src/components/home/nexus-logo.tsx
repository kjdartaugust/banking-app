export function NexusLogo({ className = "h-8 w-8" }: { className?: string }) {
  // Hexagonal "nexus core" — concentric hexagons forming a network-hub mark.
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 2.5 L34.5 11 V29 L20 37.5 L5.5 29 V11 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 12 L27.5 16.4 V25.1 L20 29.5 L12.5 25.1 V16.4 Z"
        fill="currentColor"
      />
    </svg>
  );
}
