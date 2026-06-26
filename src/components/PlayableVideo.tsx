"use client";

import { useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
};

// Video with native controls (play button + audio). On small screens, going
// into play expands it to fullscreen so it's readable on mobile.
export function PlayableVideo({ src, poster, className, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  function expandOnMobile() {
    const v = ref.current;
    if (!v) return;
    if (!window.matchMedia("(max-width: 700px)").matches) return;
    const el = v as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    try {
      if (typeof el.webkitEnterFullscreen === "function") {
        el.webkitEnterFullscreen(); // iOS Safari
      } else if (typeof el.requestFullscreen === "function") {
        el.requestFullscreen().catch(() => {});
      }
    } catch {
      /* fullscreen not available — keep playing inline */
    }
  }

  return (
    <video
      ref={ref}
      className={className}
      controls
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      onPlay={expandOnMobile}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
