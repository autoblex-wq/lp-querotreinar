// <section id="devices"> — gray section, now personalized for nutritionists.
const itens = [
  {
    title: "Dietas inteligentes",
    text: "Refeições com alimentos da tabela TACO, substituições por alimento e macros reais calculados automaticamente.",
    video: "/videos/dieta.mp4",
    poster: "/images/dieta-poster.jpg",
    alt: "Demonstração da montagem de dieta com a Tabela TACO",
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
            {d.video ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={d.poster}
                aria-label={d.alt}
              >
                <source src={d.video} type="video/mp4" />
              </video>
            ) : (
              <img src={d.img} alt={d.alt} />
            )}
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
