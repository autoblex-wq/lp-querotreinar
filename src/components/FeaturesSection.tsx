// <section id="features"> — DESTAQUES. Three alternating highlight rows.
const destaques = [
  {
    title: "Treinos com vídeo",
    text: "Monte fichas com a biblioteca de exercícios e vídeos. O aluno executa por um player guiado, série a série — e registra a carga por voz.",
    img: "/images/destaque-treino.png",
    alt: "Painel do aluno com treinos e correções em vídeo",
    right: false,
  },
  {
    title: "Dietas inteligentes",
    text: "Refeições com alimentos da tabela TACO, substituições por alimento e macros reais calculados automaticamente.",
    img: "/images/destaque-dieta.png",
    alt: "Montagem de dieta com a Tabela TACO e cálculo de macros",
    right: true,
  },
  {
    title: "Evolução completa",
    text: "Fotos, medidas e progresso por grupo muscular. O aluno vê o avanço e fica motivado a continuar.",
    img: "/images/destaque-evolucao.png",
    alt: "Gráficos de evolução de carga por exercício",
    right: false,
  },
];

export function FeaturesSection() {
  return (
    <section id="features">
      <ul>
        {destaques.map((d) => (
          <li key={d.title} className={d.right ? "right" : undefined}>
            <img src={d.img} alt={d.alt} />
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
