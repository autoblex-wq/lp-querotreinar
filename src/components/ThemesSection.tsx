import { Placeholder } from "@/components/Placeholder";

// <section id="themes"> — MARCA PRÓPRIA. Centered block + CTA.
export function ThemesSection() {
  return (
    <section id="themes">
      <div>
        <Placeholder label="imagem do app com a sua marca" />
        <h3>Não é o nosso app. É o seu.</h3>
        <p>
          Personalize cores, logo e nome. Seus alunos instalam um app com a sua
          identidade na tela inicial — e abrem direto na sua tela de login. Você
          no centro da relação.
        </p>
        <p className="button">
          <a className="btn btn-primary" href="#cta">
            Quero meu app
          </a>
        </p>
      </div>
    </section>
  );
}
