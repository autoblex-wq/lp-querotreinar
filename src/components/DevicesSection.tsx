import type { Persona } from "@/types/content";
import { Placeholder } from "@/components/Placeholder";

// <section id="devices"> — PARA QUEM É. Two personas (alternating layout).
const personas: Persona[] = [
  {
    name: "Personal Trainer",
    tagline: "Mais alunos, menos planilha.",
    bullets: [
      "Prescreva treinos com vídeo e acompanhe cada série",
      "Centralize anamnese, evolução e conversas",
      "Engaje com gamificação",
    ],
    imageRight: false,
  },
  {
    name: "Nutricionista",
    tagline: "Dietas que o aluno segue.",
    bullets: [
      "Monte dietas com TACO, substituições e macros",
      "Receba a anamnese pronta antes da consulta",
      "Atenda sozinho ou em equipe",
    ],
    imageRight: true,
  },
];

export function DevicesSection() {
  return (
    <section id="devices">
      <h2 className="section-title">Feito para quem vive de resultado.</h2>
      <ul>
        {personas.map((p) => (
          <li key={p.name} className={p.imageRight ? "right" : undefined}>
            <Placeholder label="imagem" />
            <div>
              <h3>{p.name}</h3>
              <p className="tagline">{p.tagline}</p>
              <ul className="bullets">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
