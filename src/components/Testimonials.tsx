import type { Testimonial } from "@/types/content";
import { Placeholder } from "@/components/Placeholder";

// Placeholder testimonials — swap for real quotes. They fade-cycle via CSS.
const depoimentos: Testimonial[] = [
  {
    position: "one",
    quote: "“[Espaço para um depoimento real — o que mudou no seu acompanhamento.]”",
    author: "Nome · Personal Trainer",
  },
  {
    position: "two",
    quote: "“[Espaço para um depoimento real — sobre dietas e adesão dos alunos.]”",
    author: "Nome · Nutricionista",
  },
  {
    position: "three",
    quote: "“[Espaço para um depoimento real — sobre cobrança e organização.]”",
    author: "Nome · Profissional",
  },
  {
    position: "four",
    quote: "“[Espaço para um depoimento real — sobre ter o app com a sua marca.]”",
    author: "Nome · Profissional",
  },
];

// <footer> — DEPOIMENTOS + CTA final.
export function Testimonials() {
  return (
    <footer>
      <h3>O que dizem.</h3>
      <ul id="quotes">
        {depoimentos.map((q) => (
          <li key={q.position} className={q.position}>
            <blockquote>
              <a href="#">{q.quote}</a>
            </blockquote>
            <p>
              <Placeholder label="" />
              {q.author}
            </p>
          </li>
        ))}
      </ul>
      <div className="final-cta" id="cta">
        <h2 className="cta-title">Comece hoje. Saúde manda em tudo.</h2>
        <p className="cta-text">
          Crie sua conta e teste a plataforma completa por 7 dias. Sem cartão,
          sem compromisso.
        </p>
        <div className="actions">
          <a className="btn btn-primary" href="#">
            Começar teste grátis
          </a>
          <a className="btn btn-secondary" href="#">
            Já tenho conta
          </a>
        </div>
      </div>
    </footer>
  );
}
