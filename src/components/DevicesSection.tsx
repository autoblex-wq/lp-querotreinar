// <section id="devices"> — gray section, now personalized for nutritionists.
const itens = [
  {
    title: "Dietas inteligentes",
    text: "Refeições com alimentos da tabela TACO, substituições por alimento e macros reais calculados automaticamente.",
    img: "/images/destaque-dieta.png",
    alt: "Montagem de dieta com a Tabela TACO e cálculo de macros",
    right: false,
  },
  {
    title: "Vincule-se a um Personal",
    text: "Conecte-se a um Personal Trainer que usa o app e compartilhem os mesmos alunos. Dieta e treino centralizados num só lugar — uma solução completa para o seu aluno.",
    img: "/images/vinculados.png",
    alt: "Tela de vínculo entre nutricionista e personal, com alunos compartilhados",
    right: true,
  },
];

export function DevicesSection() {
  return (
    <section id="devices">
      <h2 className="section-title">Ei, Nutricionista, tem para você também!</h2>
      <ul>
        {itens.map((d) => (
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
