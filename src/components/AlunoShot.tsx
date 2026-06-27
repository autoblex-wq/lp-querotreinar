"use client";

import { useState } from "react";

// Clickable student-app image that opens maximized in a lightbox, plus a
// "Clique aqui!" hand prompt pointing at it.
export function AlunoShot({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="aluno-shot">
      <img
        className="aluno-img"
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
      />
      <button
        type="button"
        className="aluno-cta"
        onClick={() => setOpen(true)}
        aria-label="Ampliar imagem"
      >
        <span className="hand" aria-hidden="true">
          👈
        </span>
        <span className="cta-text">Clique aqui!</span>
      </button>

      {open && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <button type="button" className="lightbox-close" aria-label="Fechar">
            ×
          </button>
          <img className="lightbox-img" src={src} alt={alt} />
        </div>
      )}
    </div>
  );
}
