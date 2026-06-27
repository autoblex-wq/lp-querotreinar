"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Phone silhouette preview (looping, muted) with a play button. Clicking opens
// the full, clean recording maximized (over everything) with audio.
export function VozPlayer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="voz-player">
      <video
        className="voz-preview"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/voz.mp4" type="video/mp4" />
      </video>

      <button
        type="button"
        className="voz-play"
        onClick={() => setOpen(true)}
        aria-label="Assistir o vídeo com áudio"
      >
        <span aria-hidden="true">▶</span>
      </button>

      {open &&
        createPortal(
          <div
            className="voz-modal"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              className="voz-modal-close"
              aria-label="Fechar"
            >
              ×
            </button>
            <video
              className="voz-modal-video"
              src="/videos/voz-full.mp4"
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
