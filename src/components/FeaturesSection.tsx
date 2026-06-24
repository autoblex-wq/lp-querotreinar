import { Placeholder } from "@/components/Placeholder";

// <section id="features"> — DESTAQUES. Three alternating highlight rows.
const destaques = [
  {
    title: "Treinos com vídeo",
    text: "Monte fichas com a biblioteca de exercícios e vídeos. O aluno executa por um player guiado, série a série — e registra a carga por voz.",
    right: false,
  },
  {
    title: "Dietas inteligentes",
    text: "Refeições com alimentos da tabela TACO, substituições por alimento e macros reais calculados automaticamente.",
    right: true,
  },
  {
    title: "Evolução completa",
    text: "Fotos, medidas e progresso por grupo muscular. O aluno vê o avanço e fica motivado a continuar.",
    right: false,
  },
];

export function FeaturesSection() {
  return (
    <section id="features">
      <ul>
        {destaques.map((d) => (
          <li key={d.title} className={d.right ? "right" : undefined}>
            <Placeholder label="imagem" />
            <div>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
