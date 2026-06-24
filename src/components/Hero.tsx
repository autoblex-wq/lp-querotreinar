import { Placeholder } from "@/components/Placeholder";

// <header> — hero. Wordmark "Quero Treinar" rendered as gradient text via CSS.
export function Hero() {
  return (
    <header>
      <h1>Quero Treinar</h1>
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
        <Placeholder
          label="imagem do app (telas do produto)"
          style={{ width: "100%", maxWidth: 1000, aspectRatio: "16 / 9", margin: "0 auto" }}
        />
      </div>
    </header>
  );
}
