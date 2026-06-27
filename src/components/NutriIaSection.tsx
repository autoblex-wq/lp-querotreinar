import { PlayableVideo } from "@/components/PlayableVideo";
import { AlunoShot } from "@/components/AlunoShot";

// <section id="nutri-ia"> — two blocks: AI diet import (PDF) + "Como o aluno vê".
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

      <div className="aluno-block">
        <div className="aluno-text">
          <h2 className="ia-title">Como o aluno vê</h2>
          <p className="ia-sub">
            O aplicativo do aluno é intuitivo e facilita o acompanhamento das
            refeições, opções alimentares e substituições disponíveis.
          </p>
          <p className="ia-sub">
            Além de visualizar toda a dieta personalizada por dia, o aluno
            também pode acessar a lista de compras diretamente pelo aplicativo,
            copiar os itens necessários e até editar as compras para deixar tudo
            ainda mais assertivo e adaptado à sua rotina.
          </p>
          <p className="ia-sub">
            Facilidade é o sobrenome. O nome é 100%. 😎
          </p>
        </div>
        <AlunoShot
          src="/images/aluno-ve.png"
          alt="Telas do app do aluno: plano alimentar e lista de compras"
        />
      </div>
    </section>
  );
}
