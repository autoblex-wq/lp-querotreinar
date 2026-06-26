// <section id="themes"> — MARCA PRÓPRIA. Big "Configurações de Marca" colagem on
// top (with its own title); the heading + wizard + copy + CTA below it.
export function ThemesSection() {
  return (
    <section id="themes">
      <h2 className="marca-title">Monte seu sistema do seu jeito.</h2>
      <img
        className="colagem"
        src="/images/marca-colagem.png"
        alt="Configurações de marca do aplicativo"
      />
      <div>
        <h3>Não é o nosso app. É o seu.</h3>
        <img
          className="wizard"
          src="/images/marca-wizard.png"
          alt="Personalização de cores e nome da marca"
        />
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
