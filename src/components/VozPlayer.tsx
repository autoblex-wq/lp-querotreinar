"use client";

import { useState } from "react";

// Phone silhouette preview (looping, muted) with a play button. Clicking opens
// the full, clean recording maximized with audio.
export function VozPlayer() {
  const [open, setOpen] = useState(false);

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

      {open && (
        <div
          className="voz-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <button type="button" className="voz-modal-close" aria-label="Fechar">
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
        </div>
      )}
    </div>
  );
}
