import type { CSSProperties } from "react";

// Visible image placeholder — sized by CSS (via parent selectors) or inline style.
// Swap these for real <img> later.
export function Placeholder({
  label = "imagem",
  className = "",
  style,
}: {
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  // Rendered as <span> (not <div>) so it is valid HTML even inside a <p>
  // (e.g. the testimonial author line). `.ph` sets display:flex via CSS.
  return (
    <span className={`ph ${className}`.trim()} style={style} aria-hidden="true">
      {label}
    </span>
  );
}
