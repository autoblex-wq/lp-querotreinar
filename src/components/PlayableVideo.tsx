"use client";

import { useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
};

// Video with native controls (play button + audio). Pressing play opens it
// maximized: iOS does it natively (no playsInline), desktop/Android use the
// Fullscreen API.
export function PlayableVideo({ src, poster, className, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  function expandOnPlay() {
    const v = ref.current;
    if (!v) return;
    // iOS Safari opens video fullscreen on play by itself (no playsInline),
    // and doesn't support Element.requestFullscreen — leave it to the OS.
    const isIOS =
      typeof navigator !== "undefined" &&
      (/iP(hone|ad|od)/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
    if (isIOS) return;
    if (document.fullscreenElement) return; // already fullscreen
    const el = v as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    try {
      if (typeof el.requestFullscreen === "function") {
        el.requestFullscreen().catch(() => {});
      } else if (typeof el.webkitEnterFullscreen === "function") {
        el.webkitEnterFullscreen();
      }
    } catch {
      /* fullscreen not available — keep playing inline */
    }
  }

  return (
    <>
      <video
        ref={ref}
        className={className}
        controls
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPlay={expandOnPlay}
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className="rotate-hint" aria-hidden="true">
        📱 Vire o celular na horizontal para ver melhor o vídeo
      </span>
    </>
  );
}
