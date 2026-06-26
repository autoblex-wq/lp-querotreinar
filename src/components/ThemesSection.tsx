// <section id="themes"> — MARCA PRÓPRIA. Big video (with audio + play button) on
// top under its title; heading + wizard + copy + CTA below.
export function ThemesSection() {
  return (
    <section id="themes">
      <h2 className="marca-title">Monte seu sistema do seu jeito.</h2>
      <video
        className="colagem"
        controls
        playsInline
        preload="metadata"
        poster="/images/marca-poster.jpg"
        aria-label="Vídeo: monte seu sistema do seu jeito"
      >
        <source src="/videos/marca.mp4" type="video/mp4" />
      </video>
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
