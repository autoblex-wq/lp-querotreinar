// <header> — hero. Brand logo (transparent PNG) over the gym background.
export function Hero() {
  return (
    <header>
      <h1>
        <img src="/images/logo-quero-treinar.webp" alt="Quero Treinar" />
      </h1>
      <h2>Saúde manda em tudo.</h2>
      <p>
        O app de treino e dieta com a sua marca. Do primeiro treino ao
        pagamento — rápido, bonito e fácil de usar. Para Personal Trainers e
        Nutricionistas.
      </p>
      <div className="actions">
        <a
          className="btn btn-primary"
          href="https://wa.me/5547999995954?text=Ol%C3%A1!%20Quero%20solicitar%20um%20teste%20gratuito%20do%20app%20Quero%20Treinar."
          target="_blank"
          rel="noopener noreferrer"
        >
          Começar teste grátis
        </a>
        <a className="btn btn-secondary" href="#more">
          Ver recursos
        </a>
      </div>
      <div className="screenshots">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/hero-app-mobile.webp" />
          <img
            src="/images/hero-app-desktop.webp"
            alt="App Quero Treinar rodando em desktop e celular"
          />
        </picture>
      </div>
    </header>
  );
}
