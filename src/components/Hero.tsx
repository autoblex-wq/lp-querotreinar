// <header> — hero. Brand logo (transparent PNG) over the gym background.
export function Hero() {
  return (
    <header>
      <h1>
        <img src="/images/logo-quero-treinar.png" alt="Quero Treinar" />
      </h1>
      <h2>Saúde manda em tudo.</h2>
      <p>
        O app de treino e dieta com a sua marca. Do primeiro treino ao
        pagamento — rápido, bonito e fácil de usar. Para Personal Trainers e
        Nutricionistas.
      </p>
      <div className="actions">
        <a className="btn btn-primary" href="#cta">
          Começar teste grátis
        </a>
        <a className="btn btn-secondary" href="#more">
          Ver recursos
        </a>
      </div>
      <p className="support">
        iPhone, Android e navegador · 7 dias grátis · sem cartão
      </p>
      <div className="screenshots">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/hero-app-mobile.png" />
          <img
            src="/images/hero-app-desktop.png"
            alt="App Quero Treinar rodando em desktop e celular"
          />
        </picture>
      </div>
    </header>
  );
}
