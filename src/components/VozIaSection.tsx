import { VozPlayer } from "@/components/VozPlayer";

// <section id="voz-ia"> — NOVIDADE: voice-dictated workout with AI.
export function VozIaSection() {
  return (
    <section id="voz-ia">
      <div className="voz-wrap">
        <span className="voz-badge">NOVIDADE</span>
        <h2 className="voz-title">Treino ditado por voz com IA</h2>
        <VozPlayer />
      </div>
    </section>
  );
}
