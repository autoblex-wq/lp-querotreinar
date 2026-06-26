"use client";

import { useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
};

// Video with native controls (play button + audio). Pressing play expands it
// to fullscreen (desktop and mobile) so it's easier to watch.
export function PlayableVideo({ src, poster, className, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  function expandOnPlay() {
    const v = ref.current;
    if (!v) return;
    if (document.fullscreenElement) return; // already fullscreen
    const el = v as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    try {
      if (typeof el.requestFullscreen === "function") {
        el.requestFullscreen().catch(() => {});
      } else if (typeof el.webkitEnterFullscreen === "function") {
        el.webkitEnterFullscreen(); // iOS Safari
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
      onPlay={expandOnPlay}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
