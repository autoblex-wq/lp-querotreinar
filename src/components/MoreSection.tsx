import type { Recurso } from "@/types/content";
import { Placeholder } from "@/components/Placeholder";

const recursos: Recurso[] = [
  {
    title: "Player com voz",
    description:
      "O aluno registra a carga falando (‘na primeira série…’) e o treino avança sozinho.",
  },
  {
    title: "Treino e dieta com IA (add-on)",
    description:
      "Gere planos com periodização e cronograma semanal e acompanhe a progressão.",
  },
  {
    title: "Anamnese física e nutricional",
    description:
      "Link público personalizado pro aluno preencher antes de começar — com fotos.",
  },
  {
    title: "Gamificação",
    description:
      "Recordes (PRs), conquistas e ofensiva (streak) que viram hábito.",
  },
  {
    title: "Chat com aluno e equipe",
    description: "Tempo real, resposta em grupo e avisos de novas mensagens.",
  },
  {
    title: "Pagamentos integrados",
    description:
      "PIX, cartão e mensalidade recorrente. Inadimplência trava treino/dieta sozinha.",
  },
  {
    title: "Indique um amigo",
    description:
      "Seus alunos indicam clientes pelo app e você recebe o contato pronto.",
  },
  {
    title: "Personal e Nutri juntos",
    description: "Atenda sozinho ou em equipe — treino e dieta no mesmo app.",
  },
];

// <section id="more"> — RECURSOS. Green title + grid.
export function MoreSection() {
  return (
    <section id="more">
      <h3>Recursos</h3>
      <p className="subtitle">Tudo que o seu acompanhamento precisa.</p>
      <p className="apoio">
        Da prescrição à execução, da anamnese à evolução. Pensado para o dia a
        dia de quem treina e de quem orienta.
      </p>
      <ul>
        {recursos.map((r) => (
          <li key={r.title}>
            <Placeholder label="" />
            <div>
              <h4>{r.title}</h4>
              <p>{r.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
