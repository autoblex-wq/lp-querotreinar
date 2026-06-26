// <section id="features"> — DESTAQUES. Two alternating highlight rows.
const destaques = [
  {
    title: "Veja tudo em um lugar só.",
    text: "Veja todas as informações do aluno num lugar só — treinos, evolução, progresso e muito mais. Acompanhe cada detalhe de um jeito simples, sem ficar caçando em mil apps.",
    img: "/images/destaque-treino.png",
    alt: "Painel do aluno com treinos, evolução e progresso",
    right: false,
  },
  {
    title: "Evolução completa",
    text: "Veja gráficos de evolução de todos os exercícios, podendo sempre progredir analisando os resultados anteriores.",
    img: "/images/destaque-evolucao.png",
    alt: "Gráficos de evolução de carga por exercício",
    right: true,
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
