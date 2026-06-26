"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
};

// Video with native controls (play button + audio). Pressing play opens it
// maximized: iOS does it natively (no playsInline); desktop/Android use the
// Fullscreen API, and on phones the screen is rotated to landscape.
export function PlayableVideo({ src, poster, className, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  // Release the orientation lock once the user leaves fullscreen.
  useEffect(() => {
    function onFsChange() {
      if (!document.fullscreenElement) {
        try {
          screen.orientation?.unlock?.();
        } catch {
          /* not supported */
        }
      }
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  function lockLandscape() {
    const o = screen.orientation as ScreenOrientation & {
      lock?: (orientation: "landscape") => Promise<void>;
    };
    if (
      o &&
      typeof o.lock === "function" &&
      window.matchMedia("(max-width: 900px)").matches
    ) {
      o.lock("landscape").catch(() => {});
    }
  }

  function expandOnPlay() {
    const v = ref.current;
    if (!v) return;
    // iOS Safari opens video fullscreen on play by itself (no playsInline) and
    // doesn't support the Fullscreen / Orientation APIs — leave it to the OS.
    const isIOS =
      typeof navigator !== "undefined" &&
      (/iP(hone|ad|od)/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
    if (isIOS) return;
    if (document.fullscreenElement) {
      lockLandscape();
      return;
    }
    const el = v as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    try {
      if (typeof el.requestFullscreen === "function") {
        el.requestFullscreen().then(lockLandscape).catch(() => {});
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
