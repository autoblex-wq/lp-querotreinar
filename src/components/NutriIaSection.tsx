import { PlayableVideo } from "@/components/PlayableVideo";

// <section id="nutri-ia"> — AI diet import (PDF). Continuation of the nutri block.
export function NutriIaSection() {
  return (
    <section id="nutri-ia">
      <div className="ia-wrap">
        <h2 className="ia-title">
          Já tem uma dieta? <span className="accent">Exporte com IA!</span>
        </h2>
        <p className="ia-sub">
          Tem um botão onde você insere um PDF com a dieta: a IA analisa e
          importa tudo para dentro do sistema, cadastrando inclusive os
          alimentos que ainda não existem na plataforma. Tudo vai direto para o
          app do aluno.
        </p>
        <PlayableVideo
          className="ia-video"
          src="/videos/ia.mp4"
          poster="/images/ia-poster.jpg"
          label="Importação de dieta em PDF com inteligência artificial"
        />
      </div>
    </section>
  );
}
