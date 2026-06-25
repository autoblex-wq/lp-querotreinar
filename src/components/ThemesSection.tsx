// <section id="themes"> — MARCA PRÓPRIA. Text + CTA on top; brand-customization
// shots (wizard above, colagem below) overlaid over the lower area.
export function ThemesSection() {
  return (
    <section id="themes">
      <div>
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
      <div className="marca-shots">
        <img
          className="wizard"
          src="/images/marca-wizard.png"
          alt="Personalização de cores e nome da marca"
        />
        <img
          className="colagem"
          src="/images/marca-colagem.png"
          alt="Configurações de marca do aplicativo"
        />
      </div>
    </section>
  );
}
